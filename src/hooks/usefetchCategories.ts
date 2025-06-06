// useFetchCategories controls the launch of the fetchCategoriesFromFirebase

import { useEffect } from 'react';
import { fetchCategoriesFromFirebase } from '../store/slices/getDbCategoriesSlice';
import { useAppDispatch } from '../store/hooks';

export const useFetchCategories = () => {
  const dispatch = useAppDispatch(); // useAppDispatch - это название нашей обертки из ../store/hooks, которое мы ей там дали
  useEffect(() => {
    void dispatch(fetchCategoriesFromFirebase());
  }, [dispatch]);
};
