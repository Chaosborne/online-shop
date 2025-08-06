import s from './CategoriesPage.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const categoriesState = useSelector((state: RootState) => state.dbCategories);
  const categoriesFromStore = categoriesState.categories || [];
  
  const currentCategory = categoriesFromStore.find(cat => cat.id === categoryId);

  return (
    <main className="main">
      <div className="container">
        <h1>{currentCategory?.name || 'Категория'}</h1>
        <div className={s.CategoriesPage}>
          {currentCategory ? (
            <p>Товары категории: {currentCategory.name}</p>
          ) : (
            <p>Категория не найдена</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;