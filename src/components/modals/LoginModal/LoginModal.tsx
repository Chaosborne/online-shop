import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import s from './LoginModal.module.scss';

const closeImg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
  </svg>
);

interface ModalPortalProps {
  onClose: () => void;
  modalType: ModalType;
}

type ModalType = 'login' | 'register';

const Modal = ({ onClose, modalType }: { onClose: () => void; modalType: ModalType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>(modalType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSwitchToRegister = () => setCurrentModalType('register');
  const handleSwitchToLogin = () => setCurrentModalType('login');

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setError(null); // Сброс ошибки
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      handleSwitchToLogin(); // Переключение на модальное окно входа
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration error:', error);
        setError(error.message); // Устанавливаем ошибку для отображения
      } else {
        console.error('Unexpected error:', error);
        setError('Произошла непредвиденная ошибка. Попробуйте снова.');
      }
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setError(null); // Сброс ошибки перед новой попыткой
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      onClose(); // Закрыть модальное окно при успешном входе
    } catch (error: unknown) {
      console.error('Login error:', error);

      if (typeof error === 'object' && error !== null) {
        const firebaseError = error as { code?: string; message?: string };

        console.log('Firebase error code:', firebaseError.code);
        console.log('Firebase error message:', firebaseError.message);

        switch (firebaseError.code) {
          case 'auth/invalid-email':
            setError('Неверный формат email.');
            break;
          case 'auth/invalid-credential': // Объединенный код для неверного логина/пароля
            setError('Неправильный email или пароль.');
            break;
          case 'auth/too-many-requests':
            setError('Слишком много неудачных попыток входа. Попробуйте позже.');
            break;
          default:
            setError('Ошибка входа. Попробуйте снова.');
            break;
        }
      } else {
        setError('Произошла непредвиденная ошибка. Попробуйте снова.');
      }
    }
  };

  const loginModal = (
    <>
      <div className={s.Overlay}>
        <div className={clsx(s.Content, { [s.Show]: isVisible })}>
          <h3>Войдите</h3>
          <form action="" className={s.LoginForm}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className={s.Error}>{error}</p>}
            <button
              onClick={e => {
                e.preventDefault();
                void handleLogin(e);
              }}
            >
              Войти
            </button>
          </form>
          <div className={s.IfRegistered}>или</div>
          <button className={s.RegisterBtn} onClick={handleSwitchToRegister}>
            Зарегистрируйтесь
          </button>
        </div>
      </div>
      <div className={s.CloseBtn} onClick={onClose}>
        {closeImg}
      </div>
    </>
  );

  const registerModal = (
    <>
      <div className={s.Overlay}>
        <div className={clsx(s.Content, { [s.Show]: isVisible })}>
          <h3>Зарегистрируйтесь</h3>
          <form action="" className={s.LoginForm}>
            <input type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            <button
              onClick={e => {
                e.preventDefault();
                handleRegister(e).catch(err => {
                  console.error('Unexpected error during registration:', err);
                });
              }}
            >
              Зарегистрироваться
            </button>
          </form>
          {error && <p className={s.Error}>{error}</p>}
        </div>
      </div>
      <div className={s.CloseBtn} onClick={onClose}>
        {closeImg}
      </div>
    </>
  );

  return currentModalType === 'login' ? loginModal : registerModal;
};

const ModalPortal = ({ onClose, modalType }: ModalPortalProps) => {
  return ReactDOM.createPortal(<Modal onClose={onClose} modalType={modalType} />, document.getElementById('login-modal-portal') as HTMLElement);
};

export default ModalPortal;
