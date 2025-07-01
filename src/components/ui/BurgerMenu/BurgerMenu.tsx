import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ModalPortal as LoginModalPortal } from '../../modals';

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className={styles.burgerMenuWrapper}>
      {isLoginModalOpen && <LoginModalPortal onClose={closeLoginModal} modalType="login" />}
      <button
        className={open ? styles.burgerActive : styles.burger}
        onClick={handleToggle}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? styles.menuOpen : styles.menu}>
        <ul>
          <li><Link to="/shop" onClick={handleClose}>Catalog</Link></li>
          <li><Link to="/shop/my/favorites" onClick={handleClose}>Favourites</Link></li>
          <li><Link to="/shop/my/cart" onClick={handleClose}>Cart</Link></li>
          <li>
            {user ? (
              <Link to="/shop/my/user-profile" onClick={handleClose}>
                User<br />{user.email}
              </Link>
            ) : (
              <button type="button" onClick={() => { handleClose(); openLoginModal(); }}>
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
      {open && <div className={styles.overlay} onClick={handleClose} />}
    </div>
  );
};

export default BurgerMenu;