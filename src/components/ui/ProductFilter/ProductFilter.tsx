import s from './ProductFilter.module.scss';
import clsx from 'clsx';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { IProduct } from '../../../constants/interfaces/IProduct';
import { useMemo } from 'react';
import { useFetchBrands } from '../../../hooks/useFetchBrands';
import { Brand } from '../../../store/slices/brandsSlice';

interface ProductFilterProps {
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  isFilterShow: boolean;
  toggleFilterShow: () => void;
}

interface BrandSummary {
  name: string;
  count: number;
  isActive: boolean;
}

const ProductFilter = ({ selectedBrands, onBrandChange, isFilterShow, toggleFilterShow }: ProductFilterProps) => {
  // Получаем товары из store
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  // Получаем бренды из Firestore
  const { brands: brandsFromDB } = useFetchBrands();

  // Функция вычисляет количество товаров для бренда
  const getBrandCounts = (products: IProduct[]): Record<string, number> => {
    return products.reduce((accumulator, product) => {
      const brand = product.itemBrand;
      accumulator[brand] = (accumulator[brand] || 0) + 1;
      return accumulator;
    }, {} as Record<string, number>);
  };

  // Функция создает саммари бренда
  const createBrandSummary = (brand: Brand, brandCounts: Record<string, number>): BrandSummary => {
    const count = brandCounts[brand.brandName] || 0;
    return {
      name: brand.brandName,
      count,
      isActive: brand.available && count > 0
    };
  };

  const sortBrands = (brands: BrandSummary[]): BrandSummary[] => {
    return brands.sort((a, b) => a.isActive && !b.isActive ? -1 : 1);
  };

  // Получаем все доступные бренды (активные и неактивные)
  const allBrands = useMemo(() => {
    if (brandsFromDB.length === 0) return [];

    const brandCounts = getBrandCounts(productsFromStore);
    const brandsWithSummary = brandsFromDB.map(brand => createBrandSummary(brand, brandCounts));

    return sortBrands(brandsWithSummary);
  }, [brandsFromDB, productsFromStore]);

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
      <form className={s.FilterForm}>
        {allBrands.map(brand => (
          <div className={clsx(s.FilterSelect, !brand.isActive && s.FilterSelectInactive)}
            key={brand.name}
          >
            <input
              type="checkbox"
              name={brand.name}
              id={brand.name}
              checked={selectedBrands.includes(brand.name.toLowerCase())}
              onChange={handleBrandCheckboxChange}
              disabled={!brand.isActive}
            />
            <label htmlFor={brand.name}>
              <span className={clsx(s.FilterBrand, !brand.isActive && s.FilterBrandInactive)}>
                {brand.name}
              </span>
            </label>
            <span className={clsx(s.FilterCount, !brand.isActive && s.FilterCountInactive)}>
              {brand.count}
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
