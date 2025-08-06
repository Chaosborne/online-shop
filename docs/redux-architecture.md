# Архитектура Redux в проекте Web Store

## 📋 Обзор

Проект использует **Redux Toolkit** для управления состоянием приложения. Архитектура построена на принципах централизованного состояния с четким разделением ответственности между слайсами.

## 🏗️ Структура Store

### Основные компоненты:

```typescript
// src/store/store.ts
export interface RootState {
  cart: CartState;
  search: SearchState;
  dbProducts: dbProductsState;
  dbCategories: dbCategoriesState;
  favorites: FavoritesState;
  auth: AuthState;
}
```

## 📦 Слайсы (Slices)

### 1. **Cart Slice** — Корзина покупок

**Файл:** `src/store/slices/cartSlice.ts`

**Состояние:**
```typescript
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

interface CartItem extends IProduct {
  itemQuantity: number;
  itemTotalPrice: number;
}
```

**Действия:**
- `addItemToCart` — добавление товара в корзину
- `decrementItemInCart` — уменьшение количества товара
- `removeItemFromCart` — удаление товара из корзины
- `clearCart` — очистка корзины

**Логика:**
- Автоматический пересчет общей стоимости
- Управление количеством товаров
- Синхронизация с localStorage

### 2. **Auth Slice** — Аутентификация

**Файл:** `src/store/slices/authSlice.ts`

**Состояние:**
```typescript
interface AuthState {
  user: UserData | null;
  isLoading: boolean;
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
}
```

**Действия:**
- `setUser` — установка данных пользователя
- `clearUser` — очистка данных пользователя

**Особенности:**
- Интеграция с Firebase Authentication
- Валидация данных пользователя
- Автоматическая очистка при logout

### 3. **Favorites Slice** — Избранное

**Файл:** `src/store/slices/favoritesSlice.ts`

**Состояние:**
```typescript
interface FavoritesState {
  items: number[]; // ID избранных товаров
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoaded: boolean;
  error: string | null;
}
```

**Действия:**
- `toggleFavorite` — переключение избранного
- `setFavorites` — установка списка избранного
- `clearFavorites` — очистка избранного

**Интеграция с Firebase:**
- Синхронизация с Firestore
- Обработка ошибок доступа
- Автоматическая очистка при logout

### 4. **Search Slice** — Поиск

**Файл:** `src/store/slices/searchSlice.ts`

**Состояние:**
```typescript
interface SearchState {
  searchQuery: string;
}
```

**Действия:**
- `setSearchQuery` — установка поискового запроса

**Функциональность:**
- Глобальный поиск по товарам
- Фильтрация по брендам и названиям
- Очистка спецсимволов

### 5. **DB Products Slice** — Товары из базы данных

**Файл:** `src/store/slices/getDbProductsSlice.ts`

**Состояние:**
```typescript
interface dbProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}
```

**Async Thunks:**
- `fetchProductsFromFirebase` — загрузка товаров из Firestore

**Особенности:**
- Загрузка данных из Firebase
- Обработка ошибок сети
- Кэширование загруженных данных

### 6. **DB Categories Slice** — Категории

**Файл:** `src/store/slices/getDbCategoriesSlice.ts`

**Состояние:**
```typescript
interface dbCategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}
```

**Async Thunks:**
- `fetchCategoriesFromFirebase` — загрузка категорий из Firestore

## 🔄 Async Thunks

### Favorites Thunk

**Файл:** `src/store/slices/favoritesThunk.ts`

**Функции:**
- `loadFavorites` — загрузка избранного из Firestore
- `toggleFavoriteInFirebase` — синхронизация с Firebase

**Структура данных в Firestore:**
```
favourites/{userId}/items/{productId} = { value: true }
```

## 🎯 Хуки (Hooks)

### 1. **useAppDispatch & useAppSelector**

**Файл:** `src/store/hooks.ts`

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Преимущества:**
- Типизированные хуки
- Автодополнение в IDE
- Безопасность типов

### 2. **Кастомные хуки**

**useAuth** — управление аутентификацией
**useFavorites** — управление избранным
**useFetchProducts** — загрузка товаров
**useFetchCategories** — загрузка категорий
**useFetchFavorites** — загрузка избранного
**useAppReady** — проверка готовности приложения

## 🔧 Конфигурация Store

```typescript
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    dbProducts: dbProductsReducer,
    dbCategories: dbCategoriesReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});
```

## 📊 Жизненный цикл данных

### 1. **Инициализация приложения**
```typescript
// App.tsx
useFetchCategories();
useFetchProducts();
useFetchFavorites();
```

### 2. **Загрузка данных**
1. Запрос к Firebase
2. Обработка ответа
3. Обновление состояния
4. Уведомление компонентов

### 3. **Пользовательские действия**
1. Диспатч действия
2. Обновление состояния
3. Синхронизация с Firebase (если необходимо)
4. Обновление UI

## 🛡️ Обработка ошибок

### Firebase ошибки
```typescript
// В useAuth.ts
switch (error.code) {
  case 'auth/invalid-email':
    setError('Неверный формат email');
  case 'auth/weak-password':
    setError('Пароль слишком слабый');
  // ...
}
```

### Сетевые ошибки
```typescript
// В слайсах
.addCase(fetchProductsFromFirebase.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || 'Failed to fetch products';
});
```

## 🔄 Синхронизация с Firebase

### Автоматическая синхронизация
- Избранное синхронизируется с Firestore
- Аутентификация через Firebase Auth
- Данные товаров загружаются из Firestore

### Обработка конфликтов
- Локальное состояние обновляется мгновенно
- Firebase операции выполняются асинхронно
- При ошибке локальное состояние откатывается

## 📈 Производительность

### Оптимизация:
- **Кэширование** — данные кэшируются в Redux store

## 🎯 Лучшие практики

### 1. **Структура слайсов**
- Четкое разделение ответственности

### 2. **Обработка асинхронности**
- Использование createAsyncThunk

### 3. **Типизация**
- Строгая типизация всех интерфейсов
- Типизированные хуки