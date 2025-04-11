import { useAppSelector } from '../../store/hooks';
import { useFavourites } from '../../hooks/useFavorites';
import s from './Favourites.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';

const Favorites = () => {
  const { favourites } = useFavourites();
  const allProducts = useAppSelector(state => state.dbProducts.products);

  const favouriteProducts = allProducts.filter(product => favourites.includes(Number(product.id)));

  return (
    <main className="main">
      <div className="container">
        <h1>Избранные товары</h1>
        <div className={s.FavouritesWrapper}>{favouriteProducts.length === 0 ? <p className={s.noFavourites}>Нет избранных товаров</p> : favouriteProducts.map(product => <ProductCard key={product.id} product={product} viewType="tiles" />)}</div>
      </div>
    </main>
  );
};

export default Favorites;
