// Хук для получения состояния авторизации (без подписки на изменения)
import { useAppSelector } from '../store/hooks';

export const useAuthState = () => {
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const error = useAppSelector(state => state.auth.error);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user
  };
};
