import s from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <header>
      <div className={s.Menu}>
        <div className="container">
          <div className={s.MenuInner}>
            <h1>Это главная страница</h1>
            <Link to="/shop">Перейти в магазин</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
