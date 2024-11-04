import styles from './Header.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import generateProductSlug from '../Store/generateProductSlug';

const Header = ({ products }: { products: { id: string; itemCategoty: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number }[] }) => {
  const [matchingItems, setMatchingItems] = useState<{ id: string; itemCategoty: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number }[]>([]);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  // hide dropdown suggestions when click outside them
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsListRef.current && !suggestionsListRef.current.contains(e.target as Node)) {
        setMatchingItems([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // hide dropdown suggestions when any suggested product clicked
  const hideWhenClick = () => setMatchingItems([]);

  // this will produce dropdown suggestions
  const searchSuggestionsHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchInput = e.currentTarget.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    if (searchInput === '') {
      setMatchingItems([]);
      return;
    }

    searchInput === '' && setMatchingItems([]);

    setMatchingItems(products.filter(product => product.itemName.toLowerCase().includes(searchInput.toLowerCase()) || product.itemBrand.toLowerCase().includes(searchInput.toLowerCase())));
  };

  // this will return the search result
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInput = e.currentTarget.querySelector('#app-header__search-input') as HTMLInputElement;
    const searchQuery = searchInput.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    console.log(searchQuery);
  };

  const localStorageAndConsoleClearHandler = () => {
    localStorage.clear();
    console.clear();
    console.log(localStorage);
  };

  return (
    <header className={styles['app-header']}>
      <div className="container">
        <div className={styles['app-header__inner']}>
          <div className={styles['app-header__logo']}>
            <a href="http://localhost:5173/">App header logo</a>
          </div>
          <form className={styles['app-header__search']} onSubmit={searchSubmitHandler}>
            <input id="app-header__search-input" className={styles['app-header__search-input']} type="text" onInput={searchSuggestionsHandler} />
            {matchingItems.length > 0 && (
              <ul className={styles['search__suggestions-list']} ref={suggestionsListRef}>
                {matchingItems.map(item => {
                  const productSlug = generateProductSlug(item.itemBrand, item.itemName);
                  return (
                    <li key={item.id} id={item.id} onClick={hideWhenClick}>
                      <Link className={styles['suggestions-li__link']} to={`/product/${productSlug}`}>{`${item.itemBrand} ${item.itemName}`}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <button className={styles['app-header__search-btn']} type="submit">
              lens img to be here
            </button>
          </form>
          <nav className={styles['app-nav']}>
            <ul className={styles['app-menu']}>
              <li>
                <button onClick={localStorageAndConsoleClearHandler}>Clear LS & C</button>
              </li>
              <li>
                <Link className={styles['app-menu__login']} to={'/my/UserProfile'}>
                  Войти
                </Link>
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
