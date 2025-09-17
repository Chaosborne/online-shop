import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setUser, clearUser, setAuthLoading } from '../store/slices/authSlice';
import { clearFavorites } from '../store/slices/favoritesSlice';
import { supabase } from '../supabase/supabaseConfig';
import { SupabaseUser } from '../supabase/supabaseConfig';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../store/api/authApi';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  // RTK Query mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    let lastProcessedUserData: string | null = null;
    let isInitialized = false;

    const handleAuthStateChange = async (supabaseUser: SupabaseUser | null) => {
      // Создаем уникальный ключ для пользователя включая все важные данные
      const currentUserData = supabaseUser ? JSON.stringify({
        id: supabaseUser.id,
        email: supabaseUser.email,
        displayName: supabaseUser.user_metadata?.display_name,
        createdAt: supabaseUser.created_at
      }) : null;
      
      // Проверяем, не обрабатывали ли мы уже эти данные пользователя
      // Но только если это не первая инициализация
      if (isInitialized && currentUserData === lastProcessedUserData) {
        return;
      }
      
      setIsLoading(false);
      dispatch(setAuthLoading(false));

      if (supabaseUser) {
        try {
          const userData = {
            uid: supabaseUser.id,
            email: supabaseUser.email || '',
            displayName: supabaseUser.user_metadata?.display_name || '',
          };

          dispatch(setUser(userData));

          // Обновляем последние обработанные данные
          lastProcessedUserData = currentUserData;
          isInitialized = true;
        } catch (error) {
          console.error('Error setting user data:', error);
          dispatch(clearUser());
          dispatch(clearFavorites());
        }
      } else {
        // Очищаем пользователя только если он был залогинен
        // Проверяем, был ли пользователь в последних обработанных данных
        if (lastProcessedUserData) {
          dispatch(clearUser());
          dispatch(clearFavorites());
        }
        
        // Сбрасываем последние обработанные данные
        lastProcessedUserData = null;
        isInitialized = true;
      }
    };

    // Обработка изменения состояния авторизации (включая инициализацию)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Пропускаем INITIAL_SESSION если пользователь уже инициализирован
      if (event === 'INITIAL_SESSION' && isInitialized) {
        return;
      }
      
      handleAuthStateChange(session?.user || null);
    });

    // Таймаут для инициализации (на случай, если что-то пойдет не так)
    const initTimeout = setTimeout(() => {
      if (!isInitialized) {
        setIsLoading(false);
        dispatch(setAuthLoading(false));
      }
    }, 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(initTimeout);
    };
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      dispatch(setAuthLoading(true));
      
      const result = await loginMutation({ email, password });
      
      if ('error' in result) {
        handleSupabaseError(result.error);
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleSupabaseError(error);
    }
  };

  const handleRegister = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      dispatch(setAuthLoading(true));
      
      const result = await registerMutation({ email, password, displayName });
      
      if ('error' in result) {
        handleSupabaseError(result.error);
      } else {
        // Регистрация успешна
        if (result.data?.session) {
          // Пользователь автоматически вошел в систему
        } else {
          // Требуется подтверждение email
          setError('Проверьте почту для подтверждения регистрации');
        }
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleSupabaseError(error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      dispatch(setAuthLoading(true));
      
      const result = await logoutMutation();
      
      if ('error' in result) {
        handleSupabaseError(result.error);
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
      handleSupabaseError(error);
    }
  };

  const handleSupabaseError = (error: unknown) => {
    console.error('Supabase error:', error);
    
    let errorMessage = 'Произошла непредвиденная ошибка. Попробуйте позже';
    
    if (error && typeof error === 'object' && 'data' in error) {
      const errorData = error.data as string;
      
      if (errorData.includes('Invalid login credentials')) {
        errorMessage = 'Неверный email или пароль';
      } else if (errorData.includes('User already registered')) {
        errorMessage = 'Этот email уже зарегистрирован';
      } else if (errorData.includes('Password should be at least')) {
        errorMessage = 'Пароль слишком слабый';
      } else if (errorData.includes('Invalid email') || errorData.includes('is invalid')) {
        errorMessage = 'Неверный формат email. Используйте валидный email адрес';
      } else if (errorData.includes('Email not confirmed') || errorData.includes('email_not_confirmed')) {
        errorMessage = 'Email не подтвержден. Проверьте почту и перейдите по ссылке подтверждения';
      } else if (errorData.includes('Too many requests')) {
        errorMessage = 'Слишком много попыток входа. Попробуйте позже';
      } else if (errorData.includes('Signup is disabled')) {
        errorMessage = 'Регистрация временно отключена';
      } else {
        errorMessage = errorData;
      }
    }
    
    setError(errorMessage);
  };

  const clearError = () => setError(null);

  return { error, isLoading, handleLogin, handleRegister, handleLogout, clearError };
};
