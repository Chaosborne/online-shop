import s from './ProductFilter.module.scss';
import clsx from 'clsx';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface ProductFilterProps {
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  isFilterShow: boolean;
  toggleFilterShow: () => void;
}

const ProductFilter = ({ selectedBrands, onBrandChange, isFilterShow, toggleFilterShow }: ProductFilterProps) => {
  const mockBrands = ['apple', 'samsung', 'xiaomi', 'realme', 'oppo', 'HP'];
  // mockBrands contains brand names that don't exist in the database to demonstrate interface behavior with missing names

  const handleBrandCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      onBrandChange([...selectedBrands, name.toLowerCase()]);
    } else {
      onBrandChange(selectedBrands.filter(brand => brand !== name.toLowerCase()));
    }
  };

  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  return (
    <aside className={clsx(s.Filter, isFilterShow && s.FilterShow)}>
      <h5 className={s.FilterTitle}>Бренды</h5>
      <form className={s.FilterForm} action="">
        {mockBrands.map(brand => (
          <div className={s.FilterSelect} key={brand}>
            <input
              type="checkbox"
              name={brand}
              id={brand}
              checked={selectedBrands.includes(brand.toLowerCase())}
              onChange={handleBrandCheckboxChange}
            />
            <label htmlFor={brand}>
              <span className={s.FilterBrand}> {`${brand.charAt(0).toUpperCase() + brand.slice(1)} `}</span>
            </label>
            <span className={s.FilterCount}>
              {`${productsFromStore.filter(product => product.itemBrand.toLowerCase() === brand.toLowerCase()).length}`}
            </span>
          </div>
        ))}
      </form>
      <button className={s.FilterClose} onClick={toggleFilterShow}>
        Ok
      </button>
    </aside>
  );
};

export default ProductFilter;
