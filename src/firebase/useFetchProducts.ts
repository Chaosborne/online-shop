// useFetchProducts controls the launch of the fetchProductsFromFirebase

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsFromFirebase } from '../store/slices/getDbProductsSlice';
import { AppDispatch } from '../store/store';

export const useFetchProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(fetchProductsFromFirebase());
  }, [dispatch]);
};
