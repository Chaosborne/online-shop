import s from './CategoryCard.module.scss';
import { ICategory } from '../../constants/interfaces/ICategory';
import { Link } from 'react-router-dom';
import { SmartphoneCategoryIcon } from '../../assets/img/SmartphoneCategoryIcon';
import { TabletCategoryIcon } from '../../assets/img/TabletCategoryIcon';
import { OfficeCategoryIcon } from '../../assets/img/OfficeCategoryIcon';

interface Props {
  category: ICategory;
}

const CategoryIcon = ({ icon }: { icon: React.ReactNode }) => {
  switch (icon) {
    case 'smartphone':
      return <SmartphoneCategoryIcon className={s.CategoryIcon} />;
    case 'tablet':
      return <TabletCategoryIcon className={s.CategoryIcon} />;
    case 'office':
      return <OfficeCategoryIcon className={s.CategoryIcon} />;
    default:
      return null;
  }
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link className={s.CategoryItem} to={`/categories/${category.id}`}>
      <CategoryIcon icon={category.icon} /> {category.name}
    </Link>
  );
};

export default CategoryCard;
