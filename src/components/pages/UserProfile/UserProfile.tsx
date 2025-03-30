import s from './UserProfile.module.scss';
import { useAuth } from '../../../hooks/useAuth';

const UserProfile = () => {
  const { user, handleLogout } = useAuth();

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
