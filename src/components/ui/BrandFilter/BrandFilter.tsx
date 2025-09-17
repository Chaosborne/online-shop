import s from './BrandFilter.module.scss';
import clsx from 'clsx';
import { IProduct } from '../../../constants/interfaces/IProduct';
import { useMemo } from 'react';
import { ISupabaseBrand } from '../../../constants/interfaces/ISupabaseProduct';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetBrandsQuery, useGetCategoriesQuery } from '../../../store/api/supabaseApi';

interface BrandFilterProps {
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

const BrandFilter = ({ selectedBrands, onBrandChange, isFilterShow, toggleFilterShow }: BrandFilterProps) => {
  // Получаем товары из Supabase API
  const { data: productsFromStore = [] } = useGetProductsQuery();

  // Получаем категории для маппинга ID -> название
  const { data: categories = [] } = useGetCategoriesQuery();

  // Получаем текущую категорию из URL
  const { categoryId } = useParams();

  // Получаем товары из текущей категории или все товары
  const productsFromCategory = useMemo(() => {
    if (!categoryId) return productsFromStore;
    
    // Находим название категории по ID
    const currentCategory = categories.find(cat => cat.id === categoryId);
    const categoryName = currentCategory?.name;
    
    return categoryName 
      ? productsFromStore.filter(product => product.categories.name === categoryName)
      : productsFromStore;
  }, [categoryId, productsFromStore, categories]);

  // Получаем бренды из Supabase API
  const { data: brandsFromDB = [] } = useGetBrandsQuery();

  // Функция вычисляет количество товаров для бренда
  const getBrandCounts = (products: IProduct[]): Record<string, number> => {
    return products.reduce((accumulator, product) => {
      const brand = product.brands.brand_name;
      accumulator[brand] = (accumulator[brand] || 0) + 1;
      return accumulator;
    }, {} as Record<string, number>);
  };

  // Функция создает саммари бренда
  const createBrandSummary = (brand: ISupabaseBrand, brandCounts: Record<string, number>): BrandSummary => {
    const count = brandCounts[brand.brand_name] || 0;
    return {
      name: brand.brand_name,
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

    const brandCounts = getBrandCounts(productsFromCategory);
    const brandsWithSummary = brandsFromDB.map(brand => createBrandSummary(brand, brandCounts));

    const visibleBrands = categoryId ? brandsWithSummary.filter(brand => brand.isActive) : brandsWithSummary;
    return sortBrands(visibleBrands);
  }, [brandsFromDB, productsFromCategory]);

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

export default BrandFilter;
