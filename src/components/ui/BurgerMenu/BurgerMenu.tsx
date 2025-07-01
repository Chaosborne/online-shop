import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.burgerMenuWrapper}>
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
          <li><Link to="/shop/my/profile" onClick={handleClose}>Profile</Link></li>
        </ul>
      </nav>
      {open && <div className={styles.overlay} onClick={handleClose} />}
    </div>
  );
};

export default BurgerMenu;