import { RouteEnum } from './route';
import { ReactNode } from 'react';
import { Cart, Favorites, Home, Product, Shop, UserProfile } from '../pages';

type RoutesProps = {
  path: RouteEnum | string;
  element: ReactNode;
}[];

export const routes: RoutesProps = [
  {
    path: RouteEnum.HOME,
    element: <Home />,
  },
  {
    path: RouteEnum.SHOP,
    element: <Shop />,
  },
  {
    path: `${RouteEnum.PRODUCT}/:productSlug`,
    element: <Product />,
  },
  {
    path: RouteEnum.PROFILE,
    element: <UserProfile />,
  },
  {
    path: RouteEnum.FAVORITES,
    element: <Favorites />,
  },
  {
    path: RouteEnum.CART,
    element: <Cart />,
  },
];
