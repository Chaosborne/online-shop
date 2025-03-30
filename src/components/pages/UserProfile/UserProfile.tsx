import s from './UserProfile.module.scss';
import { useAuth, handleLogout } from '../../../hooks/useAuth';

const UserProfile = () => {
  const user = useAuth();

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
