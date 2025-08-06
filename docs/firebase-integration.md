# Firebase интеграция в проекте Web Store

## 📋 Обзор

Проект использует **Firebase** как backend-as-a-Service для аутентификации пользователей, хранения данных и управления состоянием приложения. Интеграция включает Firebase Authentication и Firestore Database.

## 🔧 Настройка Firebase

### 1. **Конфигурация проекта**

**Файл:** `src/firebase/firebaseConfig.ts`

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseApiKey } from './firebaseApiKey';

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'eco-village-d5d6d.firebaseapp.com',
  projectId: 'eco-village-d5d6d',
  storageBucket: 'eco-village-d5d6d.firebasestorage.app',
  messagingSenderId: '544483561624',
  appId: '1:544483561624:web:d67843478bba766e1180ed',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
```

### 2. **Переменные окружения**

**Файл:** `src/firebase/firebaseApiKey.ts`

```typescript
export const firebaseApiKey = 'your-firebase-api-key';
```

**Важно:** Файл добавлен в `.gitignore` для безопасности.

## 🔐 Firebase Authentication

### **Настройка аутентификации**

**Сервисы:** Email/Password Authentication

**Файл:** `src/hooks/useAuth.ts`

### **Основные функции:**

#### 1. **Регистрация пользователей**
```typescript
const handleRegister = async (email: string, password: string, displayName?: string) => {
  try {
    setError(null);
    setIsLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
  } catch (error) {
    setIsLoading(false);
    handleFirebaseError(error);
  }
};
```

#### 2. **Вход в систему**
```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    setError(null);
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setIsLoading(false);
    handleFirebaseError(error);
  }
};
```

#### 3. **Выход из системы**
```typescript
const handleLogout = async () => {
  try {
    setIsLoading(true);
    await signOut(auth);
  } catch (error) {
    setIsLoading(false);
    handleFirebaseError(error);
  }
};
```

### **Обработка ошибок аутентификации**

```typescript
const handleFirebaseError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('Неверный формат email');
        break;
      case 'auth/email-already-in-use':
        setError('Этот email уже зарегистрирован');
        break;
      case 'auth/weak-password':
        setError('Пароль слишком слабый');
        break;
      case 'auth/invalid-credential':
        setError('Неверный email или пароль');
        break;
      case 'auth/too-many-requests':
        setError('Слишком много попыток входа. Попробуйте позже');
        break;
      case 'auth/user-not-found':
        setError('Пользователь не найден');
        break;
      case 'auth/user-disabled':
        setError('Пользователь заблокирован');
        break;
      default:
        setError('Ошибка входа. Попробуйте позже');
        break;
    }
  } else {
    setError('Произошла непредвиденная ошибка. Попробуйте позже');
  }
};
```

### **Отслеживание состояния аутентификации**

```typescript
useEffect(() => {
  const handleAuthStateChange = async (firebaseUser: User | null) => {
    setIsLoading(false);

    if (firebaseUser) {
      try {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
        };
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error setting user data:', error);
        dispatch(clearUser());
        dispatch(clearFavorites());
      }
    } else {
      dispatch(clearUser());
      dispatch(clearFavorites());
    }
  };

  const unsubscribe = onAuthStateChanged(auth, user => {
    void handleAuthStateChange(user);
  });

  return () => unsubscribe();
}, [dispatch]);
```

## 🔥 Firestore Database

### **Структура данных**

#### 1. **Коллекция Products**
```
products/
├── {productId}/
│   ├── id: string
│   ├── images: string[]
│   ├── itemBrand: string
│   ├── itemCategory: string
│   ├── itemDescription: string
│   ├── itemName: string
│   ├── itemPrice: number
│   ├── itemQuantity: number
│   └── itemTotalPrice: number
```

#### 2. **Коллекция Categories**
```
categories/
├── {categoryId}/
│   ├── icon: string
│   ├── id: string
│   ├── name: string
│   └── order: string
```

#### 3. **Коллекция Favorites (подколлекция)**
```
favourites/
├── {userId}/
│   └── items/
│       └── {productId}/
│           └── value: true
```

### **Операции с данными**

#### 1. **Загрузка товаров**
```typescript
// src/store/slices/getDbProductsSlice.ts
export const fetchProductsFromFirebase = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
  'dbProducts/fetchProductsFromFirebase',
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);

      if (snapshot.empty) {
        console.log('В Firestore нет товаров');
        return [];
      }

      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IProduct[];

      return products;
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
```

#### 2. **Загрузка категорий**
```typescript
// src/store/slices/getDbCategoriesSlice.ts
export const fetchCategoriesFromFirebase = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
  'dbCategories/fetchCategoriesFromFirebase',
  async (_, { rejectWithValue }) => {
    try {
      const categoriesRef = collection(db, 'categories');
      const snapshot = await getDocs(categoriesRef);

      if (snapshot.empty) {
        console.log('В Firestore нет категорий');
        return [];
      }

      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ICategory[];

      return categories;
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
```

### **Управление избранным**

#### 1. **Загрузка избранного**
```typescript
// src/store/slices/favoritesThunk.ts
export const loadFavorites = createAsyncThunk<number[], void, { rejectValue: string }>(
  'favorites/loadFavorites',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.uid;

      if (!userId) {
        return rejectWithValue('User not authenticated');
      }

      const favoritesRef = collection(db, 'favourites', userId, 'items');
      const snapshot = await getDocs(favoritesRef);

      const favorites = snapshot.docs.map(doc => Number(doc.id));
      return favorites;
    } catch (error) {
      console.error('Error loading favorites:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
```

#### 2. **Переключение избранного**
```typescript
export const toggleFavoriteInFirebase = createAsyncThunk<void, { productId: number; isFavorite: boolean }, { rejectValue: string }>(
  'favorites/toggleFavoriteInFirebase',
  async ({ productId, isFavorite }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.uid;

      if (!userId) {
        return rejectWithValue('User not authenticated');
      }

      const favoriteRef = doc(db, 'favourites', userId, 'items', productId.toString());

      if (isFavorite) {
        await setDoc(favoriteRef, { value: true });
      } else {
        await deleteDoc(favoriteRef);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
```

## 🔄 Синхронизация данных

### **Стратегия синхронизации**

#### 1. **Оптимистичные обновления**
```typescript
// В useFavorites.ts
const toggle = async (id: number) => {
  if (!userId) {
    alert('Пользователь не авторизован!');
    return;
  }

  // 1. Обновляем локальное состояние
  dispatch(toggleFavorite(id));

  // 2. Синхронизируем с Firebase
  try {
    await dispatch(
      toggleFavoriteInFirebase({
        productId: id,
        isFavorite: !isFavorite(id),
      })
    ).unwrap();
  } catch (error) {
    console.error('Error synchronisation with Firebase:', error);
    // Откатываем локальное состояние при ошибке
    dispatch(toggleFavorite(id));
  }
};
```

#### 2. **Обработка конфликтов**
```typescript
// Автоматическое восстановление при проблемах с правами
if (err && typeof err === 'string' && 
    err.includes('Missing or insufficient permissions')) {
  console.log('Пользователь не имеет прав доступа. Выполняем logout...');
  signOut(auth).then(() => {
    dispatch(clearUser());
    dispatch(clearFavorites());
  });
}
```

## 🛡️ Безопасность

### **Firebase Security Rules**

#### **Рекомендуемые правила для Firestore:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Публичный доступ к товарам и категориям
    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Избранное только для авторизованных пользователей
    match /favourites/{userId}/items/{productId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### **Валидация данных**

```typescript
// src/store/slices/authSlice.ts
const isValidUserData = (data: unknown): data is UserData => {
  if (!data || typeof data !== 'object') return false;

  const user = data as Record<string, unknown>;

  return typeof user.uid === 'string' && 
         typeof user.email === 'string' && 
         (user.displayName === undefined || typeof user.displayName === 'string');
};
```

## 📊 Мониторинг и отладка

### **Логирование ошибок**

```typescript
// В хуках и слайсах
console.error('Ошибка загрузки товаров:', error);
console.error('Error synchronisation with Firebase:', error);
console.error('Error setting user data:', error);
```

### **Firebase Console**

- **Authentication** — управление пользователями
- **Firestore Database** — просмотр и редактирование данных
- **Analytics** — аналитика использования
- **Performance** — мониторинг производительности

## 🔧 Конфигурация для разработки

### **Локальная разработка**

1. **Создание тестовых данных**
```typescript
// Автоматическая генерация тестовых пользователей
const handleFillData = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const randomName = `User${randomNumber}`;
  const randomEmail = `user${randomNumber}@example.com`;
  const randomPassword = Math.random().toString(36).slice(-8);
  setName(randomName);
  setEmail(randomEmail);
  setPassword(randomPassword);
};
```

2. **Сохранение последнего пользователя**
```typescript
// В localStorage для удобства демонстрации функционала приложения
localStorage.setItem('lastRegisteredUser', JSON.stringify({ email, password }));
```

### **Переменные окружения**

```bash
# .env.local (не коммитится в git)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## 📚 Полезные ссылки

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Redux Toolkit + Firebase](https://redux-toolkit.js.org/usage/usage-with-typescript)

---