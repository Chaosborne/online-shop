import clsx from 'clsx';
import s from './ProductCard.module.scss';
import { IProduct } from '../../constants/interfaces/IProduct';
import { useFavourites } from '../../hooks/useFavorites';
import generateProductSlug from '../../helpers/generateProductSlug';
import { Link } from 'react-router-dom';

// Extend IProduct only for this component
interface Props {
  product: IProduct;
  viewType: 'tiles' | 'lines';
}

const ProductCard = ({ product, viewType }: Props) => {
  const { id, images, itemName, itemBrand, itemDescription, itemPrice } = product;
  const { isFavourite, toggle } = useFavourites();
  const productSlug = generateProductSlug(itemBrand, itemName);

  return (
    <div className={clsx(s.ProductCard, s[viewType])}>
      <img className={s.CardImg} src={`/public/productsImages/${images[0]}`} alt={itemName} />

      <Link to={`/shop/product/${productSlug}`} key={id}>
        {itemDescription} {itemBrand} {itemName}
      </Link>

      <div className={s.PriceFavourite}>
        <span>{`${itemPrice} ₽`}</span>
        <button className={s.FavouriteBtn} onClick={() => void toggle(Number(id))}>
          {isFavourite(Number(id)) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
