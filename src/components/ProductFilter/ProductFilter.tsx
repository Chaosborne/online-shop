import s from './ProductFilter.module.scss';

interface ProductFilterProps {
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
}

const ProductFilter = ({ selectedBrands, onBrandChange }: ProductFilterProps) => {
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
    <aside className={s.Filter}>
      <h5 className={s.FilterTitle}>Brands</h5>
      <form className={s.FilterForm} action="">
        {mockBrands.map(brand => (
          <div className={s.FilterSelect} key={brand}>
            <input type="checkbox" name={brand} id={brand} checked={selectedBrands.includes(brand.toLowerCase())} onChange={handleBrandCheckboxChange} />
            <label htmlFor={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</label>
          </div>
        ))}
      </form>
    </aside>
  );
};

export default ProductFilter;
