import s  from './Categories.module.scss';
import { useGetCategoriesQuery } from '../../../store/api/supabaseApi';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';

const Categories = () => {
  const { data: categoriesFromStore = [], isLoading, error } = useGetCategoriesQuery();

  // Категории сортируются по order_index при запросе к БД в supabaseApi.ts через params: { order: 'order_index.asc' }
  const CategoryCardsElement = categoriesFromStore.map(cat => (
    <CategoryCard key={cat.id} category={cat} />
  ));

  if (isLoading) {
    return (
      <section className={s.CategoriesSection}>
        <div className="container">
          <h2 className={s.Title}>Категории</h2>
          <p>Загрузка...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={s.CategoriesSection}>
        <div className="container">
          <h2 className={s.Title}>Категории</h2>
          <p>Ошибка загрузки категорий</p>
        </div>
      </section>
    );
  }

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
