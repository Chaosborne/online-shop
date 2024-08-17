import styles from './ProductsSection.module.scss';
import { useState } from 'react';

const ProductSection = () => {
    const [isTilesView, setIsTilesView] = useState(true);
    const toggleProductsView = () => setIsTilesView(!isTilesView);

    return (
        <section className={styles['product-section']}>
            <div className="container">
                <div className={styles.store__controls}>
                <div className={styles['price-sort']}>Price sort</div>
                <div className={styles['list-tile-toggler']} onClick={toggleProductsView}>Toggle list/tile</div>
                </div>
                <aside className={styles['filter-and-products']}>
                <div className={styles.filter}>
                    <div className={styles.filter__title}>Filter</div>
                    <form className={styles.filter__form} action="" >
                    <div className={styles.filter__select}>
                        <input type="checkbox" name="apple" id="apple"  />
                        <a href="#">Apple</a>
                    </div>
                    <div className={styles.filter__select}>
                        <input type="checkbox" name="samsung" id="samsung"  />
                        <a href="#">Samsung</a>
                    </div>
                    <div className={styles.filter__select}>
                        <input type="checkbox" name="xiaomi" id="xiaomi"  />
                        <a href="#">Xiaomi</a>
                    </div>
                    <div className={styles.filter__select}>
                        <input type="checkbox" name="realme" id="realme"  />
                        <a href="#">Realme</a>
                    </div>
                    <div className={styles.filter__select}>
                        <input type="checkbox" name="oppo" id="oppo"  />
                        <a href="#">Oppo</a>
                    </div>
                    </form>
                </div>
                <div className={`${isTilesView ? styles['products-tiles'] : styles['products-lines']}`}>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                </div>
                </aside>
            </div>
        </section>
    )
}

export default ProductSection;