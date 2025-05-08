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

## 🏗️ Структура проекта
```bash
src/
├── assets/
│   ├── fonts/
│   ├── img/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   └── scss/
│       ├── base.scss
│       ├── mixins.scss
│       ├── reset.scss
│       └── vars.scss
│
├── components/
│   ├── layouts/
│   │   ├── DefaultLayout/
│   │   │   ├── DefaultLayout.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── modals/
│   │   ├── LoginModal/
│   │   │   ├── LoginModal.module.scss
│   │   │   └── LoginModal.tsx
│   │   └── index.ts
│   ├── ProductCard/
│   │   ├── ProductCard.module.scss
│   │   └── ProductCard.tsx
│   ├── ui/
│   └── widgets/
│       ├── SearchSuggestions/
│       │   ├── SearchSuggestions.module.scss
│       │   └── SearchSuggestions.tsx
│       ├── ShopHeader/
│       │   ├── ShopHeader.module.scss
│       │   └── ShopHeader.tsx
│       └── index.ts
│
├── constants/
│   ├── interfaces/
│   │   └── IProduct.ts
│   ├── mocks/
│   │   └── products.ts
│   ├── route.ts
│   └── routes.tsx
│
├── firebase/
│   ├── firebaseApiKey.ts
│   └── firebaseConfig.ts
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
│   ├── Cart/
│   ├── Favorites/
│   ├── Home/
│   ├── Product/
│   ├── Profile/
│   └── Shop/
│
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── cartSlice.ts
│   │   ├── favouritesSlice.ts
│   │   ├── getDbProductsSlice.ts
│   │   ├── productsSlice.ts
│   │   └── userSlice.ts
│   └── store.ts
│
├── tests/
│   └── components/
│
├── types/
│   └── global.d.ts
│
├── utils/
│   └── api.ts
│
├── App.tsx
└── main.tsx
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
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
```

## 🚀 Быстрый старт
```bash
npm install
npm run dev
npm run build
npm run test
```

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

## ❓ Что требует уточнения
```markdown
1. Аутентификация:
   - Поддержка OAuth провайдеров
   - Восстановление пароля

2. Избранное:
   - Синхронизация с сервером
   - Лимит хранимых элементов

3. Оптимизация:
   - Кэширование запросов
   - Пагинация товаров

4. Тестирование:
   - Покрытие хуков тестами
   - E2E сценарии
```
