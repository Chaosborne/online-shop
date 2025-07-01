import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFavorites } from './favoritesThunk';
import { clearUser } from './authSlice';

export interface FavoritesState {
  items: number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoaded: boolean;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  isLoaded: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter(id => id !== productId);
      } else {
        state.items.push(productId);
      }
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.items = action.payload;
    },
    clearFavorites: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavorites.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.isLoaded = true;
      })
      .addCase(loadFavorites.rejected, state => {
        state.status = 'failed';
      })
      .addCase(clearUser, state => {
        state.items = [];
        state.status = 'idle';
        state.isLoaded = false;
      });
  },
});
// После вызова createSlice внутри favoritesSlice Redux Toolkit создает:
// сам редьюсер (который обрабатывает состояние) (напр. toggleFavorite)
// и action creator, который возвращает экшен соответствующего типа (напр. toggleFavorite).
export const { toggleFavorite, setFavorites, clearFavorites } = favoritesSlice.actions;
// Здесь мы экспортируем созданные таким образом action creators
// Когда мы вызовем toggleFavorite(5), под капотом будет Redux будет создан action { type: 'favorites/toggleFavorite', payload: 5 },
// с которым мы уже не взаимодействуем, он сам сделает свою работу
// Т. е., нам достаточно просто вызвать toggleFavorite(5), и Redux Toolkit сам сделает всю работу. Он создаст action и сделаем с ним то, что нужно

// favoritesSlice.actions — это объект, содержащий все action creators, созданные для каждого редьюсера
// Почему используется favoritesSlice.actions, а не favoritesSlice.actionCreators?
// Историческая и общепринятая практика: В Redux и Redux Toolkit давно устоялся термин actions для обозначения всех экшенов, экшен-creator'ов и всего, что связано с обработкой действий в приложении.
// Даже несмотря на то, что технически action creators — это функции, которые создают экшены, в Redux Toolkit всё обобщили под термин actions для удобства.
// Конвенция, а не обязательность: Это больше связано с конвенцией. В Redux Toolkit мы имеем объект с именем actions, в котором находятся action creators. Важно, что в Redux (особенно раньше) actions ассоциировались именно с экшенами, которые обрабатываются редьюсерами, и там уже был своего рода шаблон для actions и action creators.
// Скорость разработки: Когда ты работаешь с createSlice, тебе не нужно беспокоиться об этом различии — просто создаёшь редьюсеры, а Redux Toolkit сам за тебя генерирует нужные action creators, которые удобно помещаются в объект actions. Это упрощает код и избавляет от необходимости разбираться в лишних деталях
export default favoritesSlice.reducer;
// Почему reducers (во множественном) → reducer (в единственном)?
// Потому что:
// reducers: { ... } — это объект с несколькими функциями-обработчиками, который мы передаем в createSlice
// favoritesSlice.reducer — это уже одна скомпонованная функция, созданная Redux Toolkit из всех обработчиков, которую мы экспортируем как основной редьюсер
// То есть reducers — это вход, а reducer — это результат
