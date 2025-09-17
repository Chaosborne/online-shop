// Хук только для действий авторизации (без подписки на изменения состояния)
import { useState } from 'react';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../store/api/authApi';

export const useAuthActions = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // RTK Query mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await loginMutation({ email, password }).unwrap();
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError(error?.data?.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await registerMutation({ email, password, displayName }).unwrap();
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      // Проверяем, есть ли сессия после регистрации
      if (result.session) {
        setError('Проверьте вашу почту для подтверждения регистрации');
      }
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      setError(error?.data?.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await logoutMutation().unwrap();
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      setError(error?.data?.message || 'Ошибка выхода');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    clearError,
    error,
    isLoading
  };
};
