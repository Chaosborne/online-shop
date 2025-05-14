# Eco Village

## 🛠 Технический стек

- **Фреймворк**: React + TypeScript
- **Сборка**: Vite
- **Стили**: Sass (SCSS modules)
- **Линтинг**: ESLint + Prettier
- **Состояние**: Redux Toolkit
- **Роутинг**: React Router v6
- **БД**: Firebase (Firestore + Realtime Database)
- **Аутентификация**: Firebase Auth
- **Тестирование**: Jest + React Testing Library (опционально)
- **Утилиты**: JSDoc для документации кода

## 🚀 Быстрый старт

```bash
npm install
npm run dev
npm run build
npm run test
```

## 🏗️ Структура проекта

```bash
src/
├── assets/               # Статические ресурсы
│   ├── fonts/            # Шрифты (.gitkeep)
│   ├── img/              # Изображения
│   │   ├── favicon.ico   # Иконка
│   │   └── logo.svg      # Логотип
│   └── scss/             # Глобальные стили
│       ├── base.scss     # Базовые стили
│       ├── mixins.scss   # SCSS-миксины
│       ├── reset.scss    # Сброс стилей
│       └── vars.scss     # Переменные
│
├── components/           # UI-компоненты
│   ├── layouts/          # Макеты страниц
│   │   ├── DefaultLayout # Основной макет
│   │   │   ├── DefaultLayout.tsx
│   │   │   └── index.ts  # Реэкспорт
│   │   └── index.ts
│   ├── modals/           # Модальные окна
│   │   ├── LoginModal/   # Модалка авторизации
│   │   │   ├── LoginModal.module.scss
│   │   │   └── LoginModal.tsx
│   │   └── index.ts
│   ├── ProductCard/      # Карточка товара
│   │   ├── ProductCard.module.scss
│   │   └── ProductCard.tsx
│   ├── ui/              # Базовые компоненты
│   └── widgets/         # Сложные компоненты
│       ├── SearchSuggestions/ # Виджет поиска
│       │   ├── SearchSuggestions.module.scss
│       │   └── SearchSuggestions.tsx
│       ├── ShopHeader/   # Шапка магазина
│       │   ├── ShopHeader.module.scss
│       │   └── ShopHeader.tsx
│       └── index.ts      # Реэкспорт
│
├── constants/           # Конфигурации
│   ├── interfaces/      # Типы
│   │   └── IProduct.ts  # Интерфейс товара
│   ├── mocks/           # Тестовые данные
│   │   └── products.ts  # Моки (legacy)
│   ├── route.ts         # Enum путей
│   └── routes.tsx       # Конфиг маршрутов
│
├── firebase/            # Firebase
│   ├── firebaseApiKey.ts # API ключ
│   └── firebaseConfig.ts # Конфиг
│
├── helpers/             # Вспомогательные функции
│   └── generateProductSlug.ts # Генератор slug для товаров
│
├── helpers/
│   └── generateProductSlug.ts
│
├── hooks/
│   ├── useAuth.ts        # Управление аутентификацией
│   ├── useFavourites.ts  # Работа с избранным
│   └── useFetchProducts.ts # Загрузка товаров
│
├── pages/
│   ├── Cart/             # Страница корзины
│   │   ├── Cart.module.scss
│   │   └── Cart.tsx
│   ├── Favourites/       # Страница избранного
│   │   ├── Favourites.module.scss
│   │   └── Favourites.tsx
│   ├── Home/             # Главная страница
│   │   ├── Home.module.scss
│   │   └── Home.tsx
│   ├── ProductPage/      # Страница товара
│   │   ├── ProductPage.module.scss
│   │   └── ProductPage.tsx
│   ├── Shop/             # Магазин
│   │   ├── Categories/   # Блок категорий
│   │   │   ├── Categories.module.scss
│   │   │   └── Categories.tsx
│   │   ├── Products/     # Список товаров
│   │   │   ├── Products.module.scss
│   │   │   └── Products.tsx
│   │   └── Shop.tsx      # Основной компонент магазина
│   └── index.ts          # Реэкспорт страниц
│
├── store/
│   ├── slices/            # Redux слайсы
│   │   ├── authSlice.ts   # Аутентификация
│   │   ├── cartSlice.ts   # Корзина покупок
│   │   ├── favouritesSlice.ts # Избранное (состояние)
│   │   ├── favouritesThunk.ts # Избранное (асинхронные операции)
│   │   ├── getDbProducts.ts   # Загрузка товаров
│   │   └── searchSlice.ts # Поиск по товарам
│   ├── hooks.ts          # Типизированные redux-хуки
│   └── store.ts          # Конфигурация хранилища
│
├── tests/               # Тесты
│   └── components/      # Тесты компонентов
│
├── types/               # Глобальные типы
│   └── global.d.ts
│
├── utils/               # Утилиты
│   └── api.ts           # API-клиент
│
├── App.tsx              # Корневой компонент
└── main.tsx             # Точка входа
```

## ⚙️ Конфигурация

### Firebase

```typescript
// firebase/firebaseConfig.ts
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp);
```

### Страницы

```typescript
// pages/Shop/Shop.tsx
/**
 * Основной компонент магазина
 * @description Объединяет категории и список товаров
 */
const Shop = () => {
  return (
    <div className={styles.shop}>
      <Categories />
      <Products />
    </div>
  );
};

// pages/ProductPage/ProductPage.tsx
/**
 * Страница товара
 * @param {string} slug - URL-идентификатор товара
 */
const ProductPage = ({ slug }: { slug: string }) => {
  // Логика загрузки товара по slug
};
```

### Кастомные хуки

```typescript
// hooks/useAuth.ts
/**
 * Управление аутентификацией пользователя
 * @returns {Object} Объект с методами авторизации и состоянием ошибки
 */
export const useAuth = () => {
  // Реализация хука...
  return { error, handleLogin, handleRegister, handleLogout };
};

// hooks/useFavourites.ts
/**
 * Управление избранными товарами
 * @returns {Object} { favourites, isFavourite, toggle }
 */
export const useFavourites = () => {
  // Реализация хука...
  return { favourites, isFavourite, toggle };
};

// hooks/useFetchProducts.ts
/**
 * Загрузка товаров из Firebase
 * @description Автоматически запускается при монтировании компонента
 */
export const useFetchProducts = () => {
  // Реализация хука...
};
```

### Redux Store

```typescript
// store/store.ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
    products: productsReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Типизированные хуки
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```

### Слайсы

```typescript
// store/slices/authSlice.ts
/**
 * Управление состоянием аутентификации
 * @features:
 * - Хранение данных пользователя
 * - Обработка статуса авторизации
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {...},
    clearUser: (state) => {...}
  }
});

// store/slices/favouritesSlice.ts
/**
 * Управление избранными товарами
 * @features:
 * - Локальное хранилище ID товаров
 * - Синхронизация с Firebase
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: { items: [] as string[] },
  reducers: {...}
});

// store/slices/favouritesThunk.ts
/**
 * Асинхронные операции с избранным
 * @methods:
 * - syncFavouritesWithServer - синхронизация с БД
 * - toggleFavourite - переключение состояния
 */
export const toggleFavourite = createAsyncThunk(...);
```

### 🎣 Хуки Redux

```typescript
// store/hooks.ts
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Кастомный хук для работы с избранным
 * @returns { favourites, isFavourite, toggle }
 */
export const useFavourites = () => {
  const favourites = useAppSelector(state => state.favourites.items);
  const dispatch = useAppDispatch();

  return {
    favourites,
    isFavourite: (id: string) => favourites.includes(id),
    toggle: (id: string) => dispatch(toggleFavourite(id)),
  };
};
```

### Типизированные хуки

```typescript
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Типизированная версия useDispatch
 * @returns {AppDispatch} Диспетчер с правильными типами
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Типизированная версия useSelector
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### Правила использования

1. Всегда используйте `useAppDispatch` вместо стандартного `useDispatch`
2. Всегда используйте `useAppSelector` вместо стандартного `useSelector`
3. Не создавайте дублирующие обертки - используйте существующие хуки

#### Пример использования

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Component = () => {
  const data = useAppSelector(state => state.some.data); // Автодополнение типов
  const dispatch = useAppDispatch(); // Типизированный dispatch

  return <div>{data}</div>;
};

```

#### Кастомные хуки хранилища

```typescript
// store/hooks.ts
/**
 * Хук для работы с избранным
 * @returns {Object} { favourites, isFavourite, toggle }
 */
export const useFavourites = () => {
  const favourites = useAppSelector(state => state.favourites.items);
  const dispatch = useAppDispatch();

  return {
    favourites,
    isFavourite: (id: string) => favourites.includes(id),
    toggle: (id: string) => dispatch(toggleFavourite(id)),
  };
};
```

### Преимущества

- ✅ Полная типобезопасность при работе с Redux
- ✅ Автодополнение для стейта и действий
- ✅ Единая точка управления логикой хранилища
- ✅ Соблюдение DRY-принципа

## 📚 Документация кода

```markdown
- JSDoc для ключевых функций и хуков
- Описание параметров и возвращаемых значений
- Примеры использования в комментариях
```

## 🛡️ Безопасность

```markdown
- Ключи Firebase в .gitignore
- Валидация данных на клиенте
- Обработка ошибок аутентификации
```
