import s from './UserProfile.module.scss';
import { useAuthState } from '../../hooks/useAuthState';
import { useAuthActions } from '../../hooks/useAuthActions';

const UserProfile = () => {
  const { user } = useAuthState();
  const { handleLogout } = useAuthActions();

  return (
    <main className="main">
      <div className="container">
        <h1 className={s.Title}>Личный кабинет</h1>

        {user && (
          <button onClick={() => void handleLogout()}>Выйти</button>
        )}

        {!user && (
          <h3>Вы не авторизованы</h3>
        )}
      </div>
    </main>
  )
};

export default UserProfile;
