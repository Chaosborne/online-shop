import s from './ShopHeader.module.scss';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSearchQuery } from '../../../store/slices/searchSlice';
import { ModalPortal as LoginModalPortal } from '../../modals';
import { IProduct } from '../../../constants/interfaces/IProduct';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { useAuth } from '../../../hooks/useAuth';

const ShopHeader = () => {
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  const [matchingItems, setMatchingItems] = useState<IProduct[]>([]);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Используем хук useAuth
  const user = useAuth();

  // Работа со строкой поиска
  const searchSuggestionsHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const searchInput = e.currentTarget.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();

    if (searchInput === '') {
      setMatchingItems([]);
      return;
    }

    setMatchingItems(productsFromStore.filter(product => product.itemName.toLowerCase().includes(searchInput.toLowerCase()) || product.itemBrand.toLowerCase().includes(searchInput.toLowerCase())));
  };

  const hideWhenClick = () => setMatchingItems([]);

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.querySelector('#app-header__search-input') as HTMLInputElement;
    const searchQuery = searchInput.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '').trim();
    dispatch(setSearchQuery(searchQuery));
  };

  const localStorageAndConsoleClearHandler = () => {
    localStorage.clear();
    console.clear();
    console.log(localStorage);
  };

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
              <svg width="15.000946" height="15.000000" viewBox="0 0 20.0009 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.57 16C10.57 19.18 4.98 18.3 2.02 14.65C-0.83 11.12 -0.65 6.04 2.44 2.82C5.65 -0.51 10.68 -0.95 14.33 1.78C15.64 2.76 16.61 4 17.25 5.5C17.89 7.02 18.08 8.59 17.86 10.22C17.64 11.83 17 13.27 15.94 14.62C16.03 14.67 16.12 14.71 16.19 14.78C17.34 15.93 18.49 17.08 19.64 18.23C19.92 18.5 20.05 18.82 19.97 19.2C19.81 19.96 18.91 20.25 18.32 19.73C18.05 19.49 17.8 19.22 17.54 18.96C16.6 18.01 15.65 17.06 14.7 16.12C14.66 16.08 14.62 16.05 14.57 16ZM15.96 8.98C15.97 5.12 12.85 2 8.98 2C5.12 1.99 2 5.09 1.99 8.94C1.97 12.81 5.08 15.94 8.96 15.96C12.81 15.98 15.95 12.85 15.96 8.98Z"
                  fill="#FFFFFF"
                  fillOpacity="1.000000"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </form>
          <nav className={s.AppNav}>
            <ul className={s.AppMenu}>
              <li>
                <Link className={s.Favourites} to="shop/my/favorites">
                  Избранное
                </Link>
              </li>
              <li>
                <Link className={s.Cart} to="/shop/my/cart">
                  Корзина <span>{cart.totalQuantity}</span>
                </Link>
              </li>
              <li>
                {user ? (
                  <Link className={s.ToAccount} to="/shop/my/user-profile">
                    Пользователь
                    <br />
                    {user.email}
                  </Link>
                ) : (
                  <button className={s.Login} onClick={openLoginModal}>
                    Войти
                  </button>
                )}
              </li>

              <li>
                <button className={s.clearBtn} onClick={localStorageAndConsoleClearHandler}>
                  Clear LS & C
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
