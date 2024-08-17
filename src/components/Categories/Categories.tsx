import styles from './Categories.module.scss';

const Categories = () => {
    const categoryFiller = (<div style={{width: 244, height: 200, backgroundColor: '#808080'}} />);

    return (
        <section className={styles.categories}>
        <div className="container">
            <h2 className={styles.categories__title}>Категории</h2>
            <div className={styles.categories__items}>
            {categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}
            </div>
        </div>
        </section>
    )
}

export default Categories;