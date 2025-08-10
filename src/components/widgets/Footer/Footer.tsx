import s from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.Footer}>
      <div className="container">
        <div className={s.FooterContent}>
          <div className={s.FooterSection}>
            <h3 className={s.FooterTitle}>Онлайн-магазин</h3>
            <p className={s.FooterDescription}>
              Демо e-commerce проект
            </p>
          </div>

          {/* Технологии */}
          <div className={s.FooterSection}>
            <h4 className={s.FooterSubtitle}>Технологии</h4>
            <div className={s.TechStack}>
              <div className={s.TechCategory}>
                <span className={s.TechLabel}>Frontend:</span>
                <span className={s.TechItems}>React, TypeScript, Redux Toolkit</span>
              </div>
              <div className={s.TechCategory}>
                <span className={s.TechLabel}>Стили:</span>
                <span className={s.TechItems}>SCSS Modules, CSS Grid, Flexbox</span>
              </div>
              <div className={s.TechCategory}>
                <span className={s.TechLabel}>Backend:</span>
                <span className={s.TechItems}>Firebase, Firestore, Authentication</span>
              </div>
              <div className={s.TechCategory}>
                <span className={s.TechLabel}>Сборка:</span>
                <span className={s.TechItems}>Vite, ESLint, Prettier</span>
              </div>
            </div>
          </div>

          {/* Функциональность */}
          <div className={s.FooterSection}>
            <h4 className={s.FooterSubtitle}>Функциональность</h4>
            <ul className={s.FeaturesList}>
              <li>Каталог товаров с фильтрацией</li>
              <li>Корзина покупок</li>
              <li>Избранные товары</li>
              <li>Поиск по товарам</li>
              <li>Аутентификация пользователей</li>
              <li>Адаптивный дизайн</li>
            </ul>
          </div>

        {/* Контакты */}
          <div className={s.FooterSection}>
            <h4 className={s.FooterSubtitle}>Контакты</h4>
            <div className={s.Contacts}>
              <div className={s.ContactItem}>
                <span className={s.ContactLabel}>GitHub:</span>
                <a 
                  href="https://github.com/Chaosborne" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={s.ContactLink}
                >
                  github.com/Chaosborne
                </a>
              </div>
              <div className={s.ContactItem}>
                <span className={s.ContactLabel}>Website:</span>
                <a 
                  href="https://himmelen.ru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={s.ContactLink}
                >
                  himmelen.ru
                </a>
              </div>
              <div className={s.ContactItem}>
                <span className={s.ContactLabel}>Telegram:</span>
                <a 
                  href="https://t.me/Himmelenbot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={s.ContactLink}
                >
                  Oleg
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className={s.FooterBottom}>
          <div className={s.Copyright}>
            © {currentYear} Онлайн-магазин
          </div>
          <div className={s.FooterLinks}>
            <a 
              href="https://github.com/Chaosborne/online-shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className={s.FooterLink}
            >
              Исходный код и документация
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;