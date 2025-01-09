import s from './ShopHeader.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSearchQuery } from '../../../store/slices/searchSlice';
import { ModalPortal as LoginModalPortal } from '../../Modals';
import { IProduct, productsMockData } from '../../../constants/mocks/products';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

const ShopHeader = () => {
  const [matchingItems, setMatchingItems] = useState<IProduct[]>([]);
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

  // this will produce dropdown suggestions
  const searchSuggestionsHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchInput = e.currentTarget.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    if (searchInput === '') {
      setMatchingItems([]);
      return;
    }

    searchInput === '' && setMatchingItems([]);

    setMatchingItems(productsMockData.filter(product => product.itemName.toLowerCase().includes(searchInput.toLowerCase()) || product.itemBrand.toLowerCase().includes(searchInput.toLowerCase())));
  };

  // hide dropdown suggestions when any suggested product clicked
  const hideWhenClick = () => setMatchingItems([]);

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
    console.log(localStorage); // This log is part of the storage and console cleanup functionality. Not to be removed
  };

  // Login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <header className={s.ShopHeader}>
      {isLoginModalOpen && <LoginModalPortal onClose={closeLoginModal} modalType="login" />}
      <div className="container">
        <div className={s.ShopHeaderInner}>
          <Link className={s.Logo} to="/">
            Logo
          </Link>
          <Link to="/shop">Магазин</Link>
          <form className={s.Search} onSubmit={searchSubmitHandler}>
            <input id="app-header__search-input" className={s.SearchInput} type="text" onInput={searchSuggestionsHandler} />
            <SearchSuggestions matchingItems={matchingItems} hideWhenClick={hideWhenClick} suggestionsListRef={suggestionsListRef} />
            <button className={s.SearchBtn} type="submit">
              lens img to be here
            </button>
          </form>
          <nav className={s.AppNav}>
            <ul className={s.AppMenu}>
              <li>
                <button onClick={localStorageAndConsoleClearHandler}>Clear LS & C</button>
              </li>
              <li className={s.Login} onClick={openLoginModal}>
                Войти
              </li>
              <li>
                <Link className={s.Favourites} to="shop/my/Favorites">
                  Избранное
                </Link>
              </li>
              <li>
                <Link className={s.Cart} to="/shop/my/Cart">
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

export default ShopHeader;
