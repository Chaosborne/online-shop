import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/firebaseConfig';
import { useAppDispatch } from '../store/hooks';
import { User } from 'firebase/auth';
import { setUser, clearUser } from '../store/slices/authSlice';
import { loadFavourites } from '../store/slices/favouritesThunk';
import { clearFavorites } from '../store/slices/favoritesSlice';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuthStateChange = async (firebaseUser: User | null) => {
      setIsLoading(false);

      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
        };

        dispatch(setUser(userData));

        try {
          const result = await dispatch(loadFavourites()).unwrap();
          console.log('Избранное загружено:', result);
        } catch (error) {
          console.error('Ошибка загрузки избранного:', error);
          setError('Не удалось загрузить избранное');
        }
      } else {
        dispatch(clearUser());
        dispatch(clearFavorites());
      }
    };

    const unsubscribe = onAuthStateChanged(auth, user => {
      void handleAuthStateChange(user);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      handleFirebaseError(error);
    }
  };

  const handleRegister = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error) {
      setIsLoading(false);
      handleFirebaseError(error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      setIsLoading(false);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      console.error('Firebase error:', error.code, error.message);

      switch (error.code) {
        case 'auth/invalid-email':
          setError('Неверный формат email.');
          break;
        case 'auth/email-already-in-use':
          setError('Этот email уже зарегистрирован.');
          break;
        case 'auth/weak-password':
          setError('Слишком простой пароль.');
          break;
        case 'auth/invalid-credential':
          setError('Неправильный email или пароль.');
          break;
        case 'auth/too-many-requests':
          setError('Слишком много неудачных попыток входа. Попробуйте позже.');
          break;
        default:
          setError('Ошибка входа. Попробуйте снова.');
          break;
      }
    } else {
      console.error('Unexpected error:', error);
      setError('Произошла непредвиденная ошибка. Попробуйте снова.');
    }
  };

  return { error, isLoading, handleLogin, handleRegister, handleLogout };
};
