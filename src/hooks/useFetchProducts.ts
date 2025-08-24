// useFetchProducts controls the launch of the fetchProductsFromFirebase

import { useEffect } from 'react';
import { fetchProductsFromFirebase } from '../store/slices/getDbProductsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const useFetchProducts = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.dbProducts);
  
  useEffect(() => {
    // Загружаем продукты только если они еще не загружены
    if (status === 'idle') {
      dispatch(fetchProductsFromFirebase());
    }
  }, [dispatch, status]);
};
