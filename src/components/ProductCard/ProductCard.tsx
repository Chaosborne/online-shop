import clsx from 'clsx';
import s from './ProductCard.module.scss';
import { IProduct } from '../../constants/interfaces/IProduct';
import { useFavorites } from '../../hooks/useFavorites';
import generateProductSlug from '../../helpers/generateProductSlug';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';
import { CartIcon } from '../../assets/img/CartIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BinIcon } from '../../assets/img/BinIcon';

// ProductCard — базовый компонент карточки товара для каталога и корзины.
// Если потребуется больше вариантов карточек, общую часть (изображение, название, цена и т.д.)
// можно вынести в отдельный компонент (например, ProductInfo)

// Extend IProduct only for this component
interface Props {
  product: IProduct;
  viewType: 'tiles' | 'lines';
  isCart?: boolean;
  onAdd?: () => void;
  onRemoveOne?: () => void;
  onRemoveAll?: () => void;
  quantity?: number;
  totalPrice?: number;
}

const ProductCard = ({ product, viewType, isCart = false, onAdd, onRemoveOne, onRemoveAll, quantity, totalPrice }: Props) => {
  const { id, images, itemName, itemBrand, itemDescription, itemPrice } = product;

  const { isFavorite, toggle } = useFavorites();
  const productSlug = generateProductSlug(itemBrand, itemName);

  const dispatch = useDispatch<AppDispatch>();

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };

  const isProductIncart = useSelector((state: RootState) => state.cart.items.some(item => item.id === id));

  return (
    <div className={clsx(s.ProductCard, s[viewType])}>
      <img className={s.CardImg} src={`/productsImages/${images[0]}`} alt={itemName} />

      <div className={s.CardInfo}>
        <Link to={`/product/${productSlug}`} key={id}>
          {itemDescription} {itemBrand} {itemName}
        </Link>

        <div className={s.PriceFavorites}>
          <span className={s.Price}>{itemPrice.toLocaleString('ru-RU')} ₽</span>
          {!isCart && (
            <div className={s.ProductcardBtns}>
              <button className={s.FavoriteBtn} onClick={() => void toggle(Number(id))}>
                {isFavorite(Number(id)) ? '♥' : '♡'}
              </button>
              <button className={clsx(s.AddToCartBtn, isProductIncart && s.AddedButton)} onClick={addToCartHandler}>
                <CartIcon className={clsx(s.AddToCartBtnIcon, isProductIncart && s.AddedIcon)} />
              </button>
            </div>
          )}
          {isCart && (
            <div className={s.CartControls}>
              <div className={s.ItemQuantity}>
                <button className={s.ItemQuantityBtn} onClick={onRemoveOne}>
                  -
                </button>
                <span className={s.ItemQuantityDigit}>{quantity}</span>
                <button className={s.ItemQuantityBtn} onClick={onAdd}>
                  +
                </button>
                <button className={s.removeItemFromCartBtn} onClick={onRemoveAll}>
                  <BinIcon />
                </button>
              </div>
              <div className={s.CardSum}>{typeof totalPrice === 'number' && totalPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
