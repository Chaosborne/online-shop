import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/firebaseConfig';
import { useAppDispatch } from '../store/hooks';
import { User } from 'firebase/auth';
import { setUser, clearUser } from '../store/slices/authSlice';
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
          setError('Invalid email format');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        case 'auth/invalid-credential':
          setError('Incorrect email or password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Try again later');
          break;
        default:
          setError('Login error. Try again');
          break;
      }
    } else {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again');
    }
  };

  return { error, isLoading, handleLogin, handleRegister, handleLogout };
};
