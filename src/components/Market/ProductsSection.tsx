import styles from './ProductsSection.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import generateProductSlug from './generateProductSlug';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProductSection = ({ products }: { products: { id: string; itemCategory: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number }[] }) => {
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const searchInput = searchQuery.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

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

  // condition searchInput === ''
  let productsListElement;

  if (searchInput === '') {
    const filteredProducts = products.filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true)).sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));

    const productsList = filteredProducts.map(item => {
      const productSlug = generateProductSlug(item.itemBrand, item.itemName);

      return (
        <Link to={`/product/${productSlug}`} className={styles.card} key={item.id}>
          <div>{item.itemImg}</div>
          <div>{item.itemName}</div>
          <div>{item.itemBrand}</div>
          <div>{item.itemDescription}</div>
          <div>{item.itemPrice}</div>
        </Link>
      );
    });

    productsListElement = <div className={`${styles.products} ${isTilesView ? styles['products-tiles'] : styles['products-lines']}`}>{productsList}</div>;
  } else {
    const searchFilteredProducts = products.filter(product => {
      return product.itemBrand.toLowerCase().includes(searchInput.toLowerCase()) || product.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });
    console.log(searchInput);
    console.log(searchFilteredProducts);

    const filteredProducts = searchFilteredProducts.filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true)).sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));

    const productsList = filteredProducts.map(item => {
      const productSlug = generateProductSlug(item.itemBrand, item.itemName);

      return (
        <Link to={`/product/${productSlug}`} className={styles.card} key={item.id}>
          <div>{item.itemImg}</div>
          <div>{item.itemName}</div>
          <div>{item.itemBrand}</div>
          <div>{item.itemDescription}</div>
          <div>{item.itemPrice}</div>
        </Link>
      );
    });

    productsListElement = <div className={`${styles.products} ${isTilesView ? styles['products-tiles'] : styles['products-lines']}`}>{productsList}</div>;
  }

  return (
    <section className={styles['products-section']}>
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
          {productsListElement}
        </aside>
      </div>
    </section>
  );
};

export default ProductSection;
