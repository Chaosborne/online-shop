import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import s from './LoginModal.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
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
  const { handleLogin, handleRegister, error } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isVisible, setIsVisible] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>(modalType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Закрываем модальное окно при успешном входе
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  const handleSwitchToRegister = () => {
    setCurrentModalType('register');
    // Генерируем случайные значения
    const randomName = `User${Math.floor(Math.random() * 10000)}`;
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;
    const randomPassword = Math.random().toString(36).slice(-8);
    setName(randomName);
    setEmail(randomEmail);
    setPassword(randomPassword);
  };

  const loginModal = (
    <>
      <div className={s.Overlay}>
        <div className={clsx(s.Content, { [s.Show]: isVisible })}>
          <h3>Войти</h3>
          <form className={s.LoginForm}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className={s.Error}>{error}</p>}
            <button
              className={s.EnterBtn}
              onClick={e => {
                e.preventDefault();
                void handleLogin(email, password);
              }}
            >
              Войти
            </button>
          </form>
          <div className={s.IfRegistered}>или</div>
          <button className={s.RegisterBtn} onClick={handleSwitchToRegister}>
            Зарегистрироваться
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
          <h3>Регистрация</h3>
          <form className={s.LoginForm}>
            <input type="text" placeholder="Имя" value={name} readOnly />
            <input type="email" placeholder="Email" value={email} readOnly />
            <input type="password" placeholder="Пароль" value={password} readOnly />
            {error && <p className={s.Error}>{error}</p>}
            <button
              className={s.EnterBtn}
              onClick={e => {
                e.preventDefault();
                void handleRegister(email, password);
              }}
            >
              Зарегистрироваться
            </button>
          </form>
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
