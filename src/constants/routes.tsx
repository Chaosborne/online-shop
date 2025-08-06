import { RouteEnum } from './route';
import { Cart, Favorites, Product, Shop, UserProfile, CategoriesPage } from '../pages';

export const routes = [
  {
    path: '/',
    element: <Shop />,
  },
  {
    path: `${RouteEnum.PRODUCT}/:productSlug`,
    element: <Product />,
  },
  {
    path: `${RouteEnum.CATEGORIES}/:categoryId`,
    element: <CategoriesPage />,
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
