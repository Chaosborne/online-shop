// useFetchCategories controls the launch of the fetchCategoriesFromFirebase

import { useEffect } from 'react';
import { fetchCategoriesFromFirebase } from '../store/slices/getDbCategoriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const useFetchCategories = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.dbCategories);
  
  useEffect(() => {
    // Загружаем категории только если они еще не загружены
    if (status === 'idle') {
      dispatch(fetchCategoriesFromFirebase());
    }
  }, [dispatch, status]);
};
