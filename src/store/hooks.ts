import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Типизированная обертка над useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Типизированная обертка над useAppSelector
