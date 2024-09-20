import styles from './Header.module.scss';

const Header = () => {
  const searchSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('searchSubmitHandler works');
  };

  return (
    <header className={styles['app-header']}>
      <div className="container">
        <div className={styles['app-header__inner']}>
          <div className={styles['app-header__logo']}>App header logo</div>
          <form className={styles['app-header__search']} onSubmit={searchSubmitHandler}>
            <input id="app-header__search-input" className={styles['app-header__search-input']} type="text" />
            <button className={styles['app-header__search-btn']} type="submit">
              lens img to be here
            </button>
          </form>
          <nav className={styles['app-nav']}>
            <ul className={styles['app-menu']}>
              <li>
                <a className={styles['app-menu__login']} href="#">
                  Войти
                </a>
              </li>
              <li>
                <a className={styles['app-menu__favourites']} href="#">
                  Избранное
                </a>
              </li>
              <li>
                <a className={styles['app-menu__cart']} href="#">
                  Корзина
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
