import s  from './Categories.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import CategoryCard from '../../../components/CategoryCard/CategoryCard';

const Categories = () => {
  const categoriesState = useSelector((state: RootState) => state.dbCategories);
  const categoriesFromStore = categoriesState.categories || [];

  const CategoryCardsElement = categoriesFromStore.map(cat => (
    <CategoryCard key={cat.id} category={cat} />
  ));

  return (
    <section className={s.CategoriesSection}>
      <div className="container">
        <h2 className={s.Title}>Категории</h2>
        <div className={s.Items}>{CategoryCardsElement}</div>
      </div>
    </section>
  );
};

export default Categories;
