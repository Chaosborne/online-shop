import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <header>
      <div className="header-menu">
        <div className="container">
          <div className="header-menu__inner">
            <h1>Это главная страница</h1>
            <Link to={'/shop'}>Перейти в магазин</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
