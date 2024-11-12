import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const CartItems = cart.items.map(item => {
    return (
      <div className={styles.cart__items} key={item.id}>
        <div className={styles['cart__item-name']}>{item.itemName}</div>
        <div className={styles[`cart__item-price`]}>{item.itemPrice}</div>
        <div className={`${styles.flex} ${styles[`cart__item-quantity`]}`}>
          <div className={styles[`cart__item-quantity`]}>{item.itemQuantity}</div>
          <button onClick={() => dispatch(addItemToCart(item))}>+</button>
          <button onClick={() => dispatch(removeItemFromCart(item.id))}>-</button>
        </div>
        <div className={styles.cart__sum}>{item.itemTotalPrice}</div>
      </div>
    );
  });

  return (
    <main className="main">
      <div className="container">
        <h1>Корзина</h1>
        <div className={styles.cart}>
          {CartItems}
          <div className={styles[`cart__total-price`]}>
            <p>Количество товаров: {cart.totalQuantity}</p>
            <p>Общая сумма: {cart.totalPrice}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
