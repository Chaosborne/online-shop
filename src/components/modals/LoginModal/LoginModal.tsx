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
  const { handleLogin, handleRegister, clearError, error } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isVisible, setIsVisible] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>(modalType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  const handleSwitchToRegister = () => {
    setCurrentModalType('register');
    setEmail('');
    clearError();
  };

  const handleFillData = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomName = `User${randomNumber}`;
    const randomEmail = `user${randomNumber}@example.com`;
    const randomPassword = Math.random().toString(36).slice(-8);
    setName(randomName);
    setEmail(randomEmail);
    setPassword(randomPassword);
  }

  // Подставляем последние зарегистрированные данные в форму авторизации
  const handleFillLastUser = () => {
    const lastUser = localStorage.getItem('lastRegisteredUser');
    if (lastUser) {
      const { email, password } = JSON.parse(lastUser);
      setEmail(email);
      setPassword(password);
    } else {
      setEmail('Сначала зарегистрируйтесь');
      setPassword('');
    }
  };

  // Проверяем, есть ли последний зарегистрированный пользователь в localStorage
  const hasLastUser = Boolean(localStorage.getItem('lastRegisteredUser'));

  const loginModal = (
    <>
      <div className={s.Overlay}>
        <div className={clsx(s.Content, { [s.Show]: isVisible })}>
          <h3>Войти</h3>
          {hasLastUser ? (
            <p className={s.Disclaimer}>Нажмите Заполнить, чтобы использовать данные, случайно сгенерированные при регистрации</p>
          ) : (
            <p className={s.Hint}>Нажмите <b>Зарегистрироваться</b>, чтобы создать тестового пользователя</p>
          )}
          <button className={s.FillBtn} onClick={handleFillLastUser}>Заполнить*</button>
          <form className={s.LoginForm}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} readOnly />
            <input className={password ? s.PasswordInput : undefined} type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} readOnly />
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
          <p className={s.Disclaimer}><b>*</b>Этот сайт не обрабатывает реальные персональные данные. Поля закрыты для ввода</p>
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
          <p className={s.Hint}>Нажмите Заполнить, чтобы использовать случайно сгенерированные данные</p>
          <button className={s.FillBtn} onClick={handleFillData}>Заполнить*</button>
          <form className={s.LoginForm}>
            <input type="text" placeholder="Имя" value={name} readOnly />
            <input type="email" placeholder="Email" value={email} readOnly />
            <input className={password ? s.PasswordInput : undefined} type="password" placeholder="Пароль" value={password} readOnly />
            {error && <p className={s.Error}>{error}</p>}
            <button
              className={s.EnterBtn}
              onClick={e => {
                e.preventDefault();
                void handleRegister(email, password).then(() => {
                  // Сохраняем данные последнего зарегистрированного пользователя в localStorage
                  localStorage.setItem('lastRegisteredUser', JSON.stringify({ email, password }));
                });
              }}
            >
              Зарегистрироваться
            </button>
          </form>
          <p className={s.Disclaimer}><b>*</b>Этот сайт не обрабатывает реальные персональные данные. Поля закрыты для ввода</p>
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
