import { useAppSelector } from '../../store/hooks';
import { useFavorites } from '../../hooks/useFavorites';
import { useGetProductsQuery } from '../../store/api/supabaseApi';
import s from './Favorites.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { data: allProducts = [], isLoading: productsLoading, error: productsError } = useGetProductsQuery();
  const favoritesState = useAppSelector(state => state.favorites);

  const favoriteProducts = allProducts.filter(product => favorites.includes(Number(product.id)));

  const user = useAppSelector(state => state.auth.user);

  // Если есть ошибка, показываем её
  if (favoritesState.error || productsError) {
    return (
      <main className="main">
        <div className="container">
          <h1>Избранные товары</h1>
          <div className={s.errorMessage}>
            <p>Ошибка загрузки: {favoritesState.error || 'Ошибка загрузки товаров'}</p>
            <p>Попробуйте перезагрузить страницу или войти в систему заново.</p>
          </div>
        </div>
      </main>
    );
  }

  // Показываем загрузку
  if (productsLoading) {
    return (
      <main className="main">
        <div className="container">
          <h1>Избранные товары</h1>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <h1>Избранные товары</h1>
        {user && (
          <div className={s.FavoritesWrapper}>
            {favoriteProducts.length === 0 ? (
              <p className={s.noFavorites}>Нет избранных товаров</p>
            ) : (
              favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} viewType="tiles" />
              ))
            )}
          </div>
        )}
        {!user && (
          <div className={s.noFavorites}>
            <p>Авторизуйтесь для просмотра избранных товаров</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
