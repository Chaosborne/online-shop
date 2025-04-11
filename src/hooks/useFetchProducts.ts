// useFetchProducts controls the launch of the fetchProductsFromFirebase

import { useEffect } from 'react';
import { fetchProductsFromFirebase } from '../store/slices/getDbProductsSlice';
import { useAppDispatch } from '../store/hooks';

export const useFetchProducts = () => {
  const dispatch = useAppDispatch(); // useAppDispatch - это название нашей обертки из ../store/hooks, которое мы ей там дали
  useEffect(() => {
    void dispatch(fetchProductsFromFirebase());
  }, [dispatch]);
};
