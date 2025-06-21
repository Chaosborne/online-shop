import clsx from 'clsx';
import s from './Products.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProductCard from '../../../components/ProductCard/ProductCard';

const Products = () => {
  const mockBrands = ['apple', 'samsung', 'xiaomi', 'realme', 'oppo', 'HP'];
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const searchInput = searchQuery.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

  const [isTilesView, setIsTilesView] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const toggleProductsView = () => setIsTilesView(!isTilesView);
  const togglePriceSort = () => setIsAscending(!isAscending);

  const handleBrandCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedBrands(prev => [...prev, name.toLowerCase()]);
    } else {
      setSelectedBrands(prev => prev.filter(brand => brand !== name.toLowerCase()));
    }
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтров
  };

  // Фильтрация и сортировка товаров
  const filteredProducts = productsFromStore
    .filter(product => {
      if (searchInput) {
        return product.itemBrand.toLowerCase().includes(searchInput.toLowerCase()) || product.itemName.toLowerCase().includes(searchInput.toLowerCase());
      }
      return true;
    })
    .filter(product => (selectedBrands.length > 0 ? selectedBrands.includes(product.itemBrand.toLowerCase()) : true))
    .sort((a, b) => (isAscending ? a.itemPrice - b.itemPrice : b.itemPrice - a.itemPrice));

  // Пагинация
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const productsList = currentProducts.map(item => <ProductCard key={item.id} product={item} viewType={isTilesView ? 'tiles' : 'lines'} />);

  const productsListElement = <div className={clsx(s.Products, isTilesView ? s.Tiles : s.Lines)}>{productsList}</div>;

  const paginationElement = (
    <div className={s.Pagination}>
      <button onClick={() => paginate(1)}>{'<<'}</button>
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? s.Active : ''}>
          {number}
        </button>
      ))}

      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        {'>'}
      </button>
      <button onClick={() => paginate(totalPages)}>{'>>'}</button>
    </div>
  );

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

        <div className={s.MainContent}>
          <aside className={s.Filter}>
            <h5 className={s.FilterTitle}>Brands</h5>
            <form className={s.FilterForm} action="">
              {mockBrands.map(brand => (
                <div className={s.FilterSelect} key={brand}>
                  <input type="checkbox" name={brand} id={brand} onChange={handleBrandCheckboxChange} />
                  <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label>
                </div>
              ))}
            </form>
          </aside>

          <div className={s.ProductsContainer}>
            {productsListElement}
            {totalPages > 1 && paginationElement}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
