import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearUser } from '../store/slices/authSlice';
import { clearFavorites, setFavorites } from '../store/slices/favoritesSlice';
import { useLogoutMutation } from '../store/api/authApi';
import { useGetFavoritesQuery } from '../store/api/supabaseApi';
import { supabase } from '../supabase/supabaseConfig';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.user?.uid);
  const authLoading = useAppSelector(state => state.auth.isLoading);
  const [logoutMutation] = useLogoutMutation();
  const [isSupabaseAuthenticated, setIsSupabaseAuthenticated] = useState(false);
  
  // Проверяем авторизацию в Supabase
  useEffect(() => {
    const checkSupabaseAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const isAuthenticated = !!session?.user;
        setIsSupabaseAuthenticated(isAuthenticated);
        
        // Принудительно очищаем избранное при смене пользователя
        if (userId && isAuthenticated) {
          dispatch(clearFavorites());
        }
      } catch (error) {
        console.error('Error checking Supabase auth:', error);
        setIsSupabaseAuthenticated(false);
      }
    };
    
    checkSupabaseAuth();
  }, [userId, dispatch]);
  
  // RTK Query для получения избранного из Supabase (только если пользователь авторизован)
  const { data: supabaseFavorites = [], error, isLoading } = useGetFavoritesQuery(userId || '', {
    skip: !userId || authLoading || !isSupabaseAuthenticated
  });


  // Синхронизируем избранное из Supabase с Redux store
  useEffect(() => {
    if (userId && isSupabaseAuthenticated && !isLoading) {
      // supabaseFavorites уже содержит number[] из transformResponse
      dispatch(setFavorites(supabaseFavorites));
    }
  }, [userId, isSupabaseAuthenticated, supabaseFavorites, isLoading, dispatch]);

  // Обработка ошибок Supabase
  useEffect(() => {
    if (error) {
      console.error('Ошибка загрузки избранного из Supabase:', error);
      
      // Если ошибка связана с правами доступа
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error.data as string;
      if (errorData.includes('Missing or insufficient permissions') || errorData.includes('permission denied')) {
        logoutMutation().then(() => {
          dispatch(clearUser());
          dispatch(clearFavorites());
        }).catch(signOutError => {
          console.error('Ошибка при выходе из системы:', signOutError);
        });
      }
      }
    }
  }, [error, logoutMutation, dispatch]);
};
