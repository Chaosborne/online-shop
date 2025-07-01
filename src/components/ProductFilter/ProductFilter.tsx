import s from './ProductFilter.module.scss';
import clsx from 'clsx';


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

  return (
    <aside className={clsx(s.Filter, isFilterShow && s.FilterShow)}>
      <h5 className={s.FilterTitle}>Бренды</h5>
      <form className={s.FilterForm} action="">
        {mockBrands.map(brand => (
          <div className={s.FilterSelect} key={brand}>
            <input type="checkbox" name={brand} id={brand} checked={selectedBrands.includes(brand.toLowerCase())} onChange={handleBrandCheckboxChange} />
            <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label>
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
