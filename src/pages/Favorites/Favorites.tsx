import { useAppSelector } from '../../store/hooks';
import { useFavorites } from '../../hooks/useFavorites';
import s from './Favorites.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  const allProducts = useAppSelector(state => state.dbProducts.products);

  const favoriteProducts = allProducts.filter(product => favorites.includes(Number(product.id)));

  return (
    <main className="main">
      <div className="container">
        <h1>Избранные товары</h1>
        <div className={s.FavoritesWrapper}>{favoriteProducts.length === 0 ? <p className={s.noFavorites}>Нет избранных товаров</p> : favoriteProducts.map(product => <ProductCard key={product.id} product={product} viewType="tiles" />)}</div>
      </div>
    </main>
  );
};

export default Favorites;
