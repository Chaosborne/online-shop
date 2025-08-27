import s from './UserProfile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { handleLogout } = useAuth();

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
