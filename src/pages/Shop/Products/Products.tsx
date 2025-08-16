import clsx from 'clsx';
import s from './Products.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductFilter from '../../../components/ProductFilter/ProductFilter';
import { TilesIcon } from '../../../assets/img/TilesIcon';
import { LinesIcon } from '../../../assets/img/LinesIcon';
import { PriceSortIcon } from '../../../assets/img/PriceSortIcon';

interface ProductsProps {
  categoryId?: string;
}

const Products = ({ categoryId }: ProductsProps) => {
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

  const handleBrandChange = (brands: string[]) => {
    setSelectedBrands(brands);
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтров
  };

  // Тоггл бокового фильтра мобильный
  const [isFilterShow, setIsFilterShow] = useState(false);
  const toggleFilterShow = () => setIsFilterShow(!isFilterShow);

  // Фильтрация товаров по категории
  const productsFromCategory = categoryId 
    ? productsFromStore.filter(product => product.itemCategory === categoryId)
    : productsFromStore;

  // Фильтрация и сортировка товаров
  const filteredProducts = productsFromCategory
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

  const productsListElement = (
    <div className={clsx(s.Products, isTilesView ? s.Tiles : s.Lines)}>
      {currentProducts.length > 0 ? (
        productsList
      ) : (
        <div className={s.NoProducts}>
          {categoryId && <p>Товары не найдены</p>}
        </div>
      )}
    </div>
  );

  const paginationElement = (
    <div className={s.Pagination}>
      <button onClick={() => paginate(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
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
      <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
        {'>>'}
      </button>
    </div>
  );

  return (
    <section className={s.ProductsSection}>
      <div className="container">
        {categoryId && (
          <p className={s.ProductsCount}>
            Товаров в категории: {productsFromCategory.length}
          </p>
        )}
        <div className={s.StoreControls}>
          <button className={s.FilterToggler} onClick={toggleFilterShow}>
            Фильтр
          </button>
          <div className={s.PriceSort} onClick={togglePriceSort}>
            Цена
            <PriceSortIcon className={s.PriceSortIcon} isAscending={isAscending} />
          </div>
          <div className={s.ListTileToggler} onClick={toggleProductsView}>
            <div className={clsx(s.SliderBackground, isTilesView ? s.TilesMode : s.LinesMode)}></div>
            <LinesIcon className={clsx(s.LinesIcon, isTilesView ? s.FadeIcon : undefined)} />
            <TilesIcon className={clsx(s.TilesIcon, isTilesView ? undefined : s.FadeIcon)} />
          </div>
        </div>

        <div className={s.MainContent}>
          <ProductFilter selectedBrands={selectedBrands} onBrandChange={handleBrandChange} isFilterShow={isFilterShow} toggleFilterShow={toggleFilterShow} />
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
