import s from './ShopHeader.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSearchQuery } from '../../../store/slices/searchSlice';
import { ModalPortal as LoginModalPortal } from '../../modals';
import { IProduct } from '../../../constants/interfaces/IProduct';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

// Imports for Firebase Authentification
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

const ShopHeader = () => {
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  const [matchingItems, setMatchingItems] = useState<IProduct[]>([]);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Стейт для отслеживания пользователя

  // отслеживаем состояние пользователя
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        // Приводим данные пользователя Firebase к интерфейсу User
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
        };
        setUser(user); // Устанавливаем пользователя в стейт
      } else {
        setUser(null); // Если пользователь не залогинен, очищаем данные
      }
    });

    return () => unsubscribe(); // Очистка подписки при размонтировании компонента
  }, []);

  // Функция выхода из системы
  const handleLogout = async () => {
    try {
      await signOut(auth); // Выход из Firebase
      setUser(null); // Очистка стейта
      console.log('User logged out:', user); // Логирование данных пользователя после выхода
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Обработчик клика для кнопки "Выйти"
  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void handleLogout();
  };

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

  // Чистильщик local storage и console
  const localStorageAndConsoleClearHandler = () => {
    localStorage.clear();
    console.clear();
    console.log(localStorage);
  };

  //
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
                <button className={s.clearBtn} onClick={localStorageAndConsoleClearHandler}>
                  Clear LS & C
                </button>
              </li>
              <li>
                {user ? (
                  <button className={s.Login} onClick={handleLogoutClick}>
                    Выйти
                  </button>
                ) : (
                  <button className={s.Login} onClick={openLoginModal}>
                    Войти
                  </button>
                )}
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
