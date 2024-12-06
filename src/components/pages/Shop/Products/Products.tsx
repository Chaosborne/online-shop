import clsx from 'clsx';
import s from './Products.module.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import generateProductSlug from '../../../../helpers/generateProductSlug';
import { productsMockData } from '../../../../constants/mocks/products';

const Products = () => {
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

  // Filter products under searchInput condition
  let filteredProducts;

  if (searchInput) {
    const searchFilteredProducts = productsMockData.filter(product => {
      return product.itemBrand.toLowerCase().includes(searchInput.toLowerCase()) || product.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });

    filteredProducts = searchFilteredProducts.filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true)).sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));
  } else {
    filteredProducts = productsMockData.filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true)).sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));
  }

  const productsList = filteredProducts.map(item => {
    const productSlug = generateProductSlug(item.itemBrand, item.itemName);
    return (
      <Link to={`/shop/product/${productSlug}`} className={s.Card} key={item.id}>
        <div>{item.itemImg}</div>
        <div>{item.itemName}</div>
        <div>{item.itemBrand}</div>
        <div>{item.itemDescription}</div>
        <div>{item.itemPrice}</div>
      </Link>
    );
  });

  const productsListElement = <div className={clsx(s.Products, isTilesView ? s.Tiles : s.Lines)}>{productsList}</div>;

  return (
    <section className={s.ProductsSection}>
      <div className="container">
        <div className={s.StoreControls}>
          <div className={s.PriceSort} onClick={togglePriceSort}>
            Price sort
          </div>
          <div className={s.ListTileToggler} onClick={toggleProductsView}>
            Toggle list/tile
          </div>
        </div>
        <aside className={s.FilterAndProducts}>
          <div className={s.Filter}>
            <div className={s.FilterTitle}>Filter</div>
            <form className={s.FilterForm} action="">
              <div className={s.FilterSelect}>
                <input type="checkbox" name="apple" id="apple" onChange={handleBrandCheckboxChange} />
                <label htmlFor="apple">Apple</label>
              </div>
              <div className={s.FilterSelect}>
                <input type="checkbox" name="samsung" id="samsung" onChange={handleBrandCheckboxChange} />
                <label htmlFor="samsung">Samsung</label>
              </div>
              <div className={s.FilterSelect}>
                <input type="checkbox" name="xiaomi" id="xiaomi" onChange={handleBrandCheckboxChange} />
                <label htmlFor="xiaomi">Xiaomi</label>
              </div>
              <div className={s.FilterSelect}>
                <input type="checkbox" name="realme" id="realme" onChange={handleBrandCheckboxChange} />
                <label htmlFor="realme">Realme</label>
              </div>
              <div className={s.FilterSelect}>
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

export default Products;
