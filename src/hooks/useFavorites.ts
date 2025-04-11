import { useAppDispatch, useAppSelector } from '../store/hooks'; // импортируем типизированные обертки
import { toggleFavourite } from '../store/slices/favoritesSlice';

export const useFavourites = () => {
  const favourites = useAppSelector(state => state.favourites.items);
  const dispatch = useAppDispatch();

  const isFavourite = (id: number) => favourites.includes(id);
  const toggle = (id: number) => dispatch(toggleFavourite(id));

  return { favourites, isFavourite, toggle };
};
