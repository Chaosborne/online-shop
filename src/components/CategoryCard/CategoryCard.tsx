import s from './Categorycard.module.scss';
import { ICategory } from '../../constants/interfaces/ICategory';

// Extend ICategory only for this component
interface Props {
  category?: ICategory;
  categoryName: string;
}

const CategoryCard = ({ categoryName }: Props) => {
  return <div className={s.CategoryItem}>{categoryName}</div>;
};

export default CategoryCard;
