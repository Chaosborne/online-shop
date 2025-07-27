import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice';
import { AppDispatch, RootState } from '../../store/store';
import { getItemQuantity } from '../../store/slices/cartSlice';
import generateProductSlug from '../../helpers/generateProductSlug';

import s from './ProductPage.module.scss';
// import { productsMockData } from '../../../constants/mocks/products'; // Пока оставляю, источник может быть не окончательный

const Product = () => {
  // Get products from store (previously got from Firestore)
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  const dispatch = useDispatch<AppDispatch>();

  // Check if product exists
  const { productSlug } = useParams<{ productSlug: string }>();

  // const product = productsMockData.find(product => {
  const product = productsFromStore.find(product => {
    const productSlugFromData = generateProductSlug(product.itemBrand, product.itemName);
    return productSlugFromData === productSlug;
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
        <h1 className={s.Title}>{`${product.itemBrand} ${product.itemName}`}</h1>
        <img src={`/productsImages/${product.images[0]}`} alt={product.itemName} />
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
