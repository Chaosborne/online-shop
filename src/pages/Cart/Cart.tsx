import s from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addItemToCart, decrementItemInCart, removeItemFromCart } from '../../store/slices/cartSlice';
import { clearCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { OrderModal } from '../../components/modals';
import { useState } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);


  const cartItems = cart.items.map(item => {
    return (
      <div className={s.CartItem} key={item.id}>
        <ProductCard
          product={item}
          viewType="lines"
          isCart={true}
          onAdd={() => dispatch(addItemToCart(item))}
          onRemoveOne={() => dispatch(decrementItemInCart(item.id))}
          onRemoveAll={() => dispatch(removeItemFromCart(item.id))}
          quantity={item.itemQuantity}
          totalPrice={item.itemTotalPrice}
        />
      </div>
    );
  });

  const hasCartItems = cartItems.length > 0;

  const CartItemsElement = hasCartItems ? cartItems : <div className={s.CartEmptyMsg}><p>Корзина пуста</p><Link className={s.CartEmptyLink} to="/">В каталог</Link></div>;

  const clearTheCart = () => dispatch(clearCart());
  const openOrderModal = () => setIsOrderModalOpen(true);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  return (
    <main className="main">
      <div className="container">
        <div className={s.CartTop}>
          <h1>Корзина</h1>
          {hasCartItems && <button onClick={clearTheCart}>Очистить корзину</button>}
        </div>
        <div className={s.Cart}>
          {CartItemsElement}
          <div className={s.TotalPrice}>
            {hasCartItems && <p className={s.TotalCartQuantity}>Количество товаров: <span className={s.TotalCartQuantityValue}>{cart.totalQuantity}</span></p>}
            {hasCartItems && <p className={s.TotalCartPrice}>Общая сумма: <span className={s.TotalCartPriceValue}>{cart.totalPrice.toLocaleString('ru-RU')} ₽</span></p>}
          </div>
          {hasCartItems && <button className={s.BuyBtn} onClick={openOrderModal}>Оформить заказ</button>}
        </div>
      </div>
      {isOrderModalOpen && <OrderModal onClose={closeOrderModal} />}
    </main>
  );
};

export default Cart;
