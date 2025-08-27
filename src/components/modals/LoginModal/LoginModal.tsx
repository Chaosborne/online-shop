import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import s from './LoginModal.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CloseBtn } from '../../../assets/img/CloseBtn';

const disclaimerParagraphs = [
  'Данный сайт не осуществляет обработку реальных персональных данных. Все поля заполняются случайно сгенерированной информацией в демонстрационных целях и заблокированы для ручного ввода',
  'В соответствии с Федеральным законом 152 - ФЗ "О персональных данных", сайт не является информационной системой персональных данных (ИСПДн), поскольку не производит сбор, хранение или обработку реальных данных пользователей'
];

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
    <div className={s.Overlay}>
      <div className={clsx(s.Content, { [s.Show]: isVisible })}>
        <div className={s.CloseBtn} onClick={onClose}>
          <CloseBtn />
        </div>
        <h3>Войти</h3>
        {hasLastUser ? (
          <p className={s.Hint}>Нажмите <b>Заполнить</b>, чтобы использовать данные, сгенерированные при регистрации</p>
        ) : (
          <p className={s.Hint}>Нажмите <b>Зарегистрироваться</b>, чтобы создать тестового пользователя</p>
        )}
        <button className={clsx(s.FillBtn, hasLastUser ? undefined : s.Disabled)} onClick={handleFillLastUser}>Заполнить</button>
        <form className={s.LoginForm}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} readOnly />
          <input className={password ? s.PasswordInput : undefined} type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} readOnly />
          {error && <p className={s.Error}>{error}</p>}
          <button
            className={clsx(s.EnterBtn, hasLastUser ? undefined : s.Disabled)}
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
        <div className={s.DisclaimerBlock}>
          {disclaimerParagraphs.map((text, idx) => (
            <p className={s.Disclaimer} key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const registerModal = (
    <div className={s.Overlay}>
      <div className={clsx(s.Content, { [s.Show]: isVisible })}>
        <div className={s.CloseBtn} onClick={onClose}>
          <CloseBtn />
        </div>
        <h3>Регистрация</h3>
        <p className={s.Hint}>Нажмите <b>Заполнить</b>, чтобы использовать случайно сгенерированные данные</p>
        <button className={s.FillBtn} onClick={handleFillData}>Заполнить</button>
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
        <div className={s.DisclaimerBlock}>
          {disclaimerParagraphs.map((text, idx) => (
            <p className={s.Disclaimer} key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );

  return currentModalType === 'login' ? loginModal : registerModal;
};

const LoginModalPortal = ({ onClose, modalType }: ModalPortalProps) => {
  return ReactDOM.createPortal(<Modal onClose={onClose} modalType={modalType} />, document.getElementById('login-modal-portal') as HTMLElement);
};

export default LoginModalPortal;
