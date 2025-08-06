import s from './CategoryCard.module.scss';
import { ICategory } from '../../constants/interfaces/ICategory';
import { Link } from 'react-router-dom';

interface Props {
  category: ICategory;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link className={s.CategoryItem} to={`/categories/${category.id}`}>
      {category.icon} {category.name}
    </Link>
  );
};

export default CategoryCard;
