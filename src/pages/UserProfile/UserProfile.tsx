import s from './UserProfile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user); // user из Redux
  const { handleLogout } = useAuth(); // только методы из useAuth

  return (
    <main className="main">
      <div className="container">
        <h1>Личный кабинет</h1>
        {user && (
          <button className={s.LogoutBtn} onClick={() => void handleLogout()}>
            Выйти
          </button>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
