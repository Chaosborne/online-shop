import s from './CategoriesPage.module.scss';
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/api/supabaseApi';
import Products from '../Shop/Products/Products';

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const { data: categoriesFromStore = [], isLoading, error } = useGetCategoriesQuery();
  
  const currentCategory = categoriesFromStore.find(cat => cat.id === categoryId);

  if (isLoading) {
    return (
      <main className="main">
        <div className="container">
          <h1>Категория</h1>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main">
        <div className="container">
          <h1>Категория</h1>
          <p>Ошибка загрузки категорий</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <h1>{currentCategory?.name || 'Категория'}</h1>
        <div className={s.CategoriesPage}>
          {currentCategory ? (
            <Products categoryId={categoryId} />
          ) : (
            <p>Категория не найдена</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;