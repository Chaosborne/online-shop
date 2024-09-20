import styles from './ProductsSection.module.scss';
import { useState } from 'react';

const PRODUCTS = [
  {
    id: 'item1',
    itemCategoty: 'someCategory',
    itemImg: 'img',
    itemName: 'Название',
    itemDescription: 'Описание',
    itemPrice: 'Цена',
  },
  {
    id: 'item2',
    itemCategoty: 'someCategory',
    itemImg: 'img 2',
    itemName: 'Название 2',
    itemDescription: 'Описание 2',
    itemPrice: 'Цена 2',
  },
  {
    id: 'item3',
    itemCategoty: 'someCategory',
    itemImg: 'img 3',
    itemName: 'Название 3',
    itemDescription: 'Описание 3',
    itemPrice: 'Цена 3',
  },
  {
    id: 'item4',
    itemCategoty: 'someCategory',
    itemImg: 'img 4',
    itemName: 'Название 4',
    itemDescription: 'Описание 4',
    itemPrice: 'Цена 4',
  },
];

const productsList = PRODUCTS.map(item => {
  return (
    <div className={styles.card} key={item.id}>
      <div>{item.itemImg}</div>
      <div>{item.itemName}</div>
      <div>{item.itemDescription}</div>
      <div>{item.itemPrice}</div>
    </div>
  );
});

const ProductSection = () => {
  const [isTilesView, setIsTilesView] = useState(true);
  const toggleProductsView = () => setIsTilesView(!isTilesView);

  return (
    <section className={styles['product-section']}>
      <div className="container">
        <div className={styles.store__controls}>
          <div className={styles['price-sort']}>Price sort</div>
          <div className={styles['list-tile-toggler']} onClick={toggleProductsView}>
            Toggle list/tile
          </div>
        </div>
        <aside className={styles['filter-and-products']}>
          <div className={styles.filter}>
            <div className={styles.filter__title}>Filter</div>
            <form className={styles.filter__form} action="">
              <div className={styles.filter__select}>
                <input type="checkbox" name="apple" id="apple" />
                <a href="#">Apple</a>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="samsung" id="samsung" />
                <a href="#">Samsung</a>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="xiaomi" id="xiaomi" />
                <a href="#">Xiaomi</a>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="realme" id="realme" />
                <a href="#">Realme</a>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="oppo" id="oppo" />
                <a href="#">Oppo</a>
              </div>
            </form>
          </div>
          <div className={`${styles.products} ${isTilesView ? styles['products-tiles'] : styles['products-lines']}`}>{productsList}</div>
        </aside>
      </div>
    </section>
  );
};

export default ProductSection;
