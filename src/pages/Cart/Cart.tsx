import s from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice';
import { clearCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);


  const cartItems = cart.items.map(item => {
    return (
      <div className={s.CartItem} key={item.id}>
        <ProductCard
          product={item}
          viewType="lines"
          isCart={true}
          onAdd={() => dispatch(addItemToCart(item))}
          onRemove={() => dispatch(removeItemFromCart(item.id))}
          quantity={item.itemQuantity}
          totalPrice={item.itemTotalPrice}
        />
      </div>
    );
  });

  const hasCartItems = cartItems.length > 0;

  const CartItemsElement = hasCartItems ? cartItems : <p className={s.CartEmptyMsg}>Корзина пуста</p>;

  const clearTheCart = () => dispatch(clearCart());

  return (
    <main className="main">
      <div className="container">
        <div className={s.CartTop}>
          <h1>Корзина</h1>
          <button onClick={clearTheCart}>Очистить корзину</button>
        </div>
        <div className={s.Cart}>
          {CartItemsElement}
          <div className={s.TotalPrice}>
            {hasCartItems && <p className={s.TotalCartQuantity}>Количество товаров: <span>{cart.totalQuantity}</span></p>}
            {hasCartItems && <p className={s.TotalCartPrice}>Общая сумма: <span>{cart.totalPrice.toLocaleString('ru-RU')} ₽</span></p>}
          </div>
          {hasCartItems && <button className={s.BuyBtn}>Оформить заказ</button>}
        </div>
      </div>
    </main>
  );
};

export default Cart;
