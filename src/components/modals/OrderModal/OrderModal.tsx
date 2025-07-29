import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './OrderModal.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearCart } from '../../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

interface OrderModalProps {
  onClose: () => void;
}

const OrderModal = ({ onClose }: OrderModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.displayName || 'Тестовый Пользователь',
    email: user?.email || 'test@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Тестовая, д. 1, кв. 1',
    comment: 'Доставка до подъезда, оплата при получении. Звонить с 9:00 до 18:00.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки заказа // await с промисом, потому что нужно дождаться задержки и после этого выполнить другие функции
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    dispatch(clearCart());
  };

  const handleCloseSuccess = () => {
    onClose();
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        {!isSuccess && <button className={s.closeBtn} onClick={onClose}>×</button>}

        {!isSuccess ? (
          <>
            <h2 className={s.title}>Оформление заказа</h2>
            <div className={s.orderSummary}>
              <h3>Ваш заказ:</h3>
              <p>Товаров: {cart.totalQuantity}</p>
              <p>Сумма: {cart.totalPrice.toLocaleString('ru-RU')} ₽</p>
            </div>

            <div className={s.userInfo}>
              <p className={s.userInfoText}>
                {user ? 'Используются данные созданного тестового профиля' : 'Используются тестовые данные для демонстрации'}
              </p>
            </div>

            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.formGroup}>
                <label htmlFor="name">Имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className={s.readOnlyInput}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className={s.readOnlyInput}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="phone">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  readOnly
                  className={s.readOnlyInput}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="address">Адрес доставки *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  readOnly
                  className={s.readOnlyInput}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="comment">Комментарий к заказу</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={2}
                  readOnly
                  className={s.readOnlyInput}
                />
              </div>

              <button
                type="submit"
                className={s.submitBtn}
                disabled={isSubmitting} // Если инпуты заполняются вручную
              >
                {isSubmitting ? 'Оформляем заказ...' : 'Подтвердить заказ'}
              </button>
            </form>
          </>
        ) : (
          <div className={s.success}>
            <h2>Заказ успешно оформлен! 🎉</h2>
            <p>Номер заказа: #{Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
            <p>Мы свяжемся с вами в ближайшее время для подтверждения заказа</p>
            <button className={s.closeSuccessBtn} onClick={handleCloseSuccess}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal; 