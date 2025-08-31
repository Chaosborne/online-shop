# Online Shop - Интернет-магазин

## 🛍️ О проекте

**Online Shop** — интернет-магазин, построенный на React с TypeScript, с аутентификацией, управлением состоянием и интеграцией с Firebase.

## 🛠 Технологический стек

- **Frontend**: React 18 + TypeScript
- **Сборка**: Vite
- **Стили**: Sass (CSS Modules)
- **Условные стили**: CLSX
- **Управление состоянием**: Redux Toolkit
- **Роутинг**: React Router v6
- **Backend**: Firebase (Auth + Firestore)
- **Линтинг**: ESLint + Prettier

## ✨ Основные возможности

- 🛒 **Каталог товаров** с фильтрацией и поиском
- 🛍️ **Корзина покупок** с управлением количеством
- ❤️ **Избранное** с синхронизацией в облаке
- 👤 **Аутентификация** пользователей
- 📱 **Адаптивный дизайн** для всех устройств

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Линтинг кода
npm run lint
```

## 📁 Структура проекта

```
src/
├── components/     # React компоненты
├── pages/         # Страницы приложения
├── store/         # Redux store и слайсы
├── hooks/         # Кастомные хуки
├── firebase/      # Конфигурация Firebase
├── assets/        # Статические ресурсы
├── constants/     # Константы и типы
└── helpers/       # Вспомогательные функции
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firebase настройка

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Включите Authentication (Email/Password)
3. Создайте Firestore Database
4. Скопируйте конфигурацию в переменные окружения
