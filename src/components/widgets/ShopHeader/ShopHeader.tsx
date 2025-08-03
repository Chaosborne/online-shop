import s from './ShopHeader.module.scss';
import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSearchQuery } from '../../../store/slices/searchSlice';
import { LoginModalPortal } from '../../modals';
import { IProduct } from '../../../constants/interfaces/IProduct';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { CartIcon } from '../../../assets/img/CartIcon';
import { LensIcon } from '../../../assets/img/LensIcon';
import { ShopLogo } from '../../../assets/img/ShopLogo';
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu';

const ShopHeader = () => {
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  const [matchingItems, setMatchingItems] = useState<IProduct[]>([]);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

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

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <header className={s.ShopHeader}>
      {isLoginModalOpen && <LoginModalPortal onClose={closeLoginModal} modalType="login" />}
      <div className="container">
        <div className={s.ShopHeaderInner}>
          <BurgerMenu />
          <ShopLogo className={s.HeaderLogo} />
          
          <nav className={s.Nav}>
            <ul className={s.NavList}>
              <li>
                <NavLink className={({ isActive }) => (isActive ? s.ActiveLink : s.Link)} end to="/">
                  Каталог
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => (isActive ? s.ActiveLink : s.Link)} to="/my/favorites">
                  Избранное
                </NavLink>
              </li>
            </ul>
          </nav>

          <span className={s.HeaderFunctional}>
            {/* Поиск */}
            <form className={s.Search} onSubmit={searchSubmitHandler}>
              <input id="app-header__search-input" className={s.SearchInput} type="text" onInput={searchSuggestionsHandler} />
              <SearchSuggestions matchingItems={matchingItems} hideWhenClick={hideWhenClick} suggestionsListRef={suggestionsListRef} />
              <button className={s.SearchBtn} type="submit">
                <LensIcon className={s.LensIcon} />
              </button>
            </form>

            <Link className={s.Cart} to="/my/cart">
              <CartIcon className={s.CartIcon} /> <span className={s.CartCount}>{cart.totalQuantity}</span>
            </Link>

            {user ? (
              <Link className={s.User} to="/my/user-profile">
                Пользователь
                <br />
                {user.email}
              </Link>
            ) : (
              <button className={s.User} onClick={openLoginModal}>
                Войти
              </button>
            )}
          </span>
        </div>
        <hr className={s.HeaderHr} />
      </div>
    </header>
  );
};

export default ShopHeader;
