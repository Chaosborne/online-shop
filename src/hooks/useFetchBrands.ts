import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBrands } from '../store/slices/brandsSlice';

export const useFetchBrands = () => {
  const dispatch = useAppDispatch();
  const { brands, status, error } = useAppSelector((state) => state.brands);

  useEffect(() => {
    // Загружаем бренды только если они еще не загружены
    if (status === 'idle') {
      dispatch(fetchBrands());
    }
  }, [dispatch, status]);

  return { brands, loading: status === 'loading', error };
}; 