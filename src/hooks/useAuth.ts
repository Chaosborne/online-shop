import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/firebaseConfig';
import { useAppDispatch } from '../store/hooks';
import { User } from 'firebase/auth';
import { setUser, clearUser, setAuthLoading } from '../store/slices/authSlice';
import { clearFavorites } from '../store/slices/favoritesSlice';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuthStateChange = async (firebaseUser: User | null) => {
      setIsLoading(false);
      dispatch(setAuthLoading(false)); // Устанавливаем isLoading в false в Redux

      if (firebaseUser) {
        // Проверяем, что пользователь действительно существует и имеет права
        try {
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
          };

          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error setting user data:', error);
          // Если есть проблемы с пользователем, очищаем состояние
          dispatch(clearUser());
          dispatch(clearFavorites());
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
      dispatch(setAuthLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleFirebaseError(error);
    }
  };

  const handleRegister = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      dispatch(setAuthLoading(true));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleFirebaseError(error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      dispatch(setAuthLoading(true));
      await signOut(auth);
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      console.error('Firebase error:', error.code, error.message);

      switch (error.code) {
        case 'auth/invalid-email':
          setError('Неверный формат email');
          break;
        case 'auth/email-already-in-use':
          setError('Этот email уже зарегистрирован');
          break;
        case 'auth/weak-password':
          setError('Пароль слишком слабый');
          break;
        case 'auth/invalid-credential':
          setError('Неверный email или пароль');
          break;
        case 'auth/too-many-requests':
          setError('Слишком много попыток входа. Попробуйте позже');
          break;
        case 'auth/user-not-found':
          setError('Пользователь не найден');
          break;
        case 'auth/user-disabled':
          setError('Пользователь заблокирован');
          break;
        default:
          setError('Ошибка входа. Попробуйте позже');
          break;
      }
    } else {
      console.error('Unexpected error:', error);
      setError('Произошла непредвиденная ошибка. Попробуйте позже');
    }
  };

  const clearError = () => setError(null);

  return { error, isLoading, handleLogin, handleRegister, handleLogout, clearError };
};
