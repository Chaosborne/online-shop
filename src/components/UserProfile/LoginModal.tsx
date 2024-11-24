import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './LoginModal.module.scss';

const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log('login');
};

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className={styles['modal-login__overlay']}>
        <div className={`${styles['modal-login__content']} ${isVisible ? styles['show'] : ''}`}>
          <h3>Войдите</h3>
          <form action="" className={styles['modal__login-form']}>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Пароль" />
            <button onClick={onLogin}>Войти</button>
          </form>
          <p className={styles['modal-login__if-registered']}>или</p>
          <p className={styles['modal-login__log-in']}>Зарегистрируйтесь</p>
        </div>
      </div>
      <div className={styles['modal-login__close-btn']} onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
        </svg>
      </div>
    </>
  );
};

const LoginModalPortal = ({ onClose }: { onClose: () => void }) => {
  return ReactDOM.createPortal(<LoginModal onClose={onClose} />, document.getElementById('login-modal-portal') as HTMLElement);
};

export default LoginModalPortal;
