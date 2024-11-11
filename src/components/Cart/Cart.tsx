import styles from './Cart.module.scss';

const CartItems = (
  <div className={styles.cart__items}>
    {/* map() */}
    <div className={styles['cart__item-name']}>Brand Model</div>
    <div className={styles[`cart__item-price`]}>15000 руб.</div>
    <div className={`${styles.flex} ${styles[`cart__item-quantity`]}`}>
      <div className={styles[`cart__item-quantity`]}>2 шт.</div>
      <div>+</div>
      <div>-</div>
    </div>
    <div className={styles.cart__sum}>30000 руб.</div>
  </div>
);

const Cart = () => {
  return (
    <main className="main">
      <div className="container">
        <h1>Корзина</h1>
        <div className={styles.cart}>
          {CartItems}
          <div className={styles[`cart__total-price`]}>Total price</div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
