import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
        };
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const handleRegister = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      console.log('User registered:', userCredential.user);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // Обработка ошибок Firebase
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

  return { error, handleLogin, handleRegister, handleLogout };
};
