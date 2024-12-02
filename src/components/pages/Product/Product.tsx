import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../../store/slices/cartSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { getItemQuantity } from '../../../store/slices/cartSlice';

import s from './Product.module.scss';
import { productsMockData } from '../../../constants/mocks/products';

const Product = () => {
  // Get dispatcher and cart data from redux
  const dispatch = useDispatch<AppDispatch>();

  // Check if product exists
  const { productSlug } = useParams<{ productSlug: string }>();

  const product = productsMockData.find(product => {
    const brandSlug = product.itemBrand.toLowerCase().replace(/\s+/g, '-');
    const nameSlug = product.itemName.toLowerCase().replace(/\s+/g, '-');
    const combinedSlug = `${brandSlug}-${nameSlug}`;

    return combinedSlug === productSlug;
  });

  // Get actual item quantity from Cart
  const itemId = product?.id;
  const itemQuantityInCart = useSelector((state: RootState) => {
    if (itemId) {
      return getItemQuantity(state.cart, itemId);
    }
    return 0;
  });
  //

  if (!product) {
    return <p>Товар не найден</p>;
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };
  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(product.id));
  };

  return (
    <main className={s.Card}>
      <div className="container">
        <h1 className={s.Title}>{product.itemBrand + ' ' + product.itemName}</h1>
        <img src={product.itemImg} alt={product.itemName} />
        <p>{product.itemDescription}</p>
        <p>Цена: ${product.itemPrice}</p>
        <button onClick={addToCartHandler}>Добавить в корзину</button>
        <button onClick={removeFromCartHandler}>Удалить из корзины</button>
        <h2>В корзине: {itemQuantityInCart}</h2>
      </div>
    </main>
  );
};

export default Product;
