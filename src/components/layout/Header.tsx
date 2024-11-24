import styles from './Header.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import generateProductSlug from '../Shop/generateProductSlug';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/slices/searchSlice';
import RegisterModalPortal from '../UserProfile/RegisterModal';

const Header = ({ products }: { products: { id: string; itemCategory: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number; itemQuantity: number }[] }) => {
  const [matchingItems, setMatchingItems] = useState<{ id: string; itemCategory: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number; itemQuantity: number }[]>([]);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

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

  // send Search query to store
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInput = e.currentTarget.querySelector('#app-header__search-input') as HTMLInputElement;
    const searchQuery = searchInput.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    dispatch(setSearchQuery(searchQuery));
  };

  // Clear localStorage and console. Console log result
  const localStorageAndConsoleClearHandler = () => {
    localStorage.clear();
    console.clear();
    console.log(localStorage);
  };

  const matchingItemsElement = matchingItems.length > 0 && (
    <ul className={styles['search__suggestions-list']} ref={suggestionsListRef}>
      {matchingItems.map(item => {
        const productSlug = generateProductSlug(item.itemBrand, item.itemName);
        return (
          <li key={item.id} id={item.id} onClick={hideWhenClick}>
            <Link className={styles['suggestions-li__link']} to={`shop/product/${productSlug}`}>{`${item.itemBrand} ${item.itemName}`}</Link>
          </li>
        );
      })}
    </ul>
  );

  // Login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <header className={styles['app-header']}>
      {isLoginModalOpen && <RegisterModalPortal onClose={closeLoginModal} />}
      <div className="container">
        <div className={styles['app-header__inner']}>
          <Link className={styles['app-header__logo']} to="/">
            Logo
          </Link>
          <Link to="/shop">Магазин</Link>
          <form className={styles['app-header__search']} onSubmit={searchSubmitHandler}>
            <input id="app-header__search-input" className={styles['app-header__search-input']} type="text" onInput={searchSuggestionsHandler} />
            {matchingItemsElement}
            <button className={styles['app-header__search-btn']} type="submit">
              lens img to be here
            </button>
          </form>
          <nav className={styles['app-nav']}>
            <ul className={styles['app-menu']}>
              <li>
                <button onClick={localStorageAndConsoleClearHandler}>Clear LS & C</button>
              </li>
              <li className={styles['app-menu__login']} onClick={openLoginModal}>
                Войти
              </li>
              <li>
                <Link className={styles['app-menu__favourites']} to="shop/my/Favourites">
                  Избранное
                </Link>
              </li>
              <li>
                <Link className={styles['app-menu__cart']} to="/shop/my/Cart">
                  Корзина <span>{cart.totalQuantity}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
