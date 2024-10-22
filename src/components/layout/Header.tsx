import styles from './Header.module.scss';
import { useState } from 'react';

const Header = ({ products }: { products: { id: string; itemCategoty: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number }[] }) => {
  const [matchingItems, setMatchingItems] = useState<string[]>([]);

  // this will produce dropdown suggestions
  const searchSuggestionsHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchInput = e.currentTarget.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    if (searchInput === '') {
      setMatchingItems([]);
      return;
    }

    const filteredItems = products.filter(product => product.itemName.includes(searchInput) || product.itemBrand.includes(searchInput));

    setMatchingItems(filteredItems.map(item => `${item.itemBrand} ${item.itemName}`));
    console.log(matchingItems);
  };

  // this will return the search result
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInput = e.currentTarget.querySelector('#app-header__search-input') as HTMLInputElement;
    const searchQuery = searchInput.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    console.log(searchQuery);
  };

  return (
    <header className={styles['app-header']}>
      <div className="container">
        <div className={styles['app-header__inner']}>
          <div className={styles['app-header__logo']}>App header logo</div>
          <form className={styles['app-header__search']} onSubmit={searchSubmitHandler}>
            <input id="app-header__search-input" className={styles['app-header__search-input']} type="text" onInput={searchSuggestionsHandler} />
            {matchingItems.length > 0 && (
              <ul className={styles['suggestions-list']}>
                {matchingItems.map((item, index) => (
                  <li key={index} className={styles['suggestions-item']}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
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
