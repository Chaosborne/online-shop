import clsx from 'clsx';
import s from './ProductCard.module.scss';
import { IProduct } from '../../constants/interfaces/IProduct';
import { useFavourites } from '../../hooks/useFavorites';
import generateProductSlug from '../../helpers/generateProductSlug';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';
import { CartIcon } from '../../assets/img/CartIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// Extend IProduct only for this component
interface Props {
  product: IProduct;
  viewType: 'tiles' | 'lines';
}

const ProductCard = ({ product, viewType }: Props) => {
  const { id, images, itemName, itemBrand, itemDescription, itemPrice } = product;

  const { isFavourite, toggle } = useFavourites();
  const productSlug = generateProductSlug(itemBrand, itemName);

  const dispatch = useDispatch<AppDispatch>();

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };

  // Track the state of the product in the cart so that it does not fly off during re-rendering
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartContainsProduct = cartItems.some(p => p.id === id);

  return (
    <div className={clsx(s.ProductCard, s[viewType])}>
      <img className={s.CardImg} src={`/productsImages/${images[0]}`} alt={itemName} />

      <div className={s.CardInfo}>
        <Link to={`/shop/product/${productSlug}`} key={id}>
          {itemDescription} {itemBrand} {itemName}
        </Link>

        <div className={s.PriceFavourites}>
          <span className={s.Price}>{`${itemPrice.toLocaleString('ru-RU')} ₽`}</span>
          <div className={s.ProductcardBtns}>
            <button className={s.FavouriteBtn} onClick={() => void toggle(Number(id))}>
              {isFavourite(Number(id)) ? '♥' : '♡'}
            </button>
            <button className={clsx(s.AddtoCartBtn, s[cartContainsProduct ? 'AddedButton' : ''])} onClick={addToCartHandler}>
              <CartIcon className={clsx(s.AddtoCartBtnIcon, s[cartContainsProduct ? 'AddedIcon' : ''])} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
