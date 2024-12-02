import s from './Categories.module.scss';

const Categories = () => {
  const categoryFiller = <div style={{ width: 244, height: 200, backgroundColor: '#808080' }} />;

  return (
    <section className={s.CategoriesSection}>
      <div className="container">
        <h2 className={s.Title}>Категории</h2>
        <div className={s.Items}>
          {categoryFiller}
          {categoryFiller}
          {categoryFiller}
          {categoryFiller}
          {categoryFiller}
        </div>
      </div>
    </section>
  );
};

export default Categories;
