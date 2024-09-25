import styles from './ProductsSection.module.scss';
import { useState } from 'react';

// ---- to be moved to backend ----
const PRODUCTS = [
  {
    id: 'item1',
    itemCategoty: 'someCategory',
    itemImg: 'img',
    itemBrand: 'Apple',
    itemName: 'Название',
    itemDescription: 'Описание',
    itemPrice: 100,
  },
  {
    id: 'item2',
    itemCategoty: 'someCategory',
    itemImg: 'img 2',
    itemBrand: 'Apple',
    itemName: 'Название 2',
    itemDescription: 'Описание 2',
    itemPrice: 200,
  },
  {
    id: 'item3',
    itemCategoty: 'someCategory',
    itemImg: 'img 3',
    itemBrand: 'Samsung',
    itemName: 'Название 3',
    itemDescription: 'Описание 3',
    itemPrice: 300,
  },
  {
    id: 'item4',
    itemCategoty: 'someCategory',
    itemImg: 'img 4',
    itemBrand: 'Realme',
    itemName: 'Название 4',
    itemDescription: 'Описание 4',
    itemPrice: 400,
  },
];
// ---- end of to be moved to backend ----

const ProductSection = () => {
  const [isTilesView, setIsTilesView] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isAscending, setIsAscending] = useState(true);

  const toggleProductsView = () => setIsTilesView(!isTilesView);
  const togglePriceSort = () => setIsAscending(!isAscending);

  const handleBrandCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      setSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, name]);
    } else {
      setSelectedBrands(prevSelectedBrands => prevSelectedBrands.filter(brand => brand !== name));
    }
  };

  const filteredProducts = PRODUCTS.filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true)).sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));

  const productsList = filteredProducts.map(item => {
    return (
      <div className={styles.card} key={item.id}>
        <div>{item.itemImg}</div>
        <div>{item.itemName}</div>
        <div>{item.itemBrand}</div>
        <div>{item.itemDescription}</div>
        <div>{item.itemPrice}</div>
      </div>
    );
  });

  return (
    <section className={styles['product-section']}>
      <div className="container">
        <div className={styles.store__controls}>
          <div className={styles['price-sort']} onClick={togglePriceSort}>
            Price sort
          </div>
          <div className={styles['list-tile-toggler']} onClick={toggleProductsView}>
            Toggle list/tile
          </div>
        </div>
        <aside className={styles['filter-and-products']}>
          <div className={styles.filter}>
            <div className={styles.filter__title}>Filter</div>
            <form className={styles.filter__form} action="">
              <div className={styles.filter__select}>
                <input type="checkbox" name="apple" id="apple" onChange={handleBrandCheckboxChange} />
                <label htmlFor="apple">Apple</label>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="samsung" id="samsung" onChange={handleBrandCheckboxChange} />
                <label htmlFor="samsung">Samsung</label>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="xiaomi" id="xiaomi" onChange={handleBrandCheckboxChange} />
                <label htmlFor="xiaomi">Xiaomi</label>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="realme" id="realme" onChange={handleBrandCheckboxChange} />
                <label htmlFor="realme">Realme</label>
              </div>
              <div className={styles.filter__select}>
                <input type="checkbox" name="oppo" id="oppo" onChange={handleBrandCheckboxChange} />
                <label htmlFor="oppo">Oppo</label>
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
