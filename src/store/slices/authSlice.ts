import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    uid: string;
    email: string;
    displayName?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

// Тип для данных пользователя
type UserData = NonNullable<AuthState['user']>;

// Безопасная проверка типа без any
const isValidUserData = (data: unknown): data is UserData => {
  if (!data || typeof data !== 'object') return false;

  const user = data as Record<string, unknown>;

  return typeof user.uid === 'string' && typeof user.email === 'string' && (user.displayName === undefined || typeof user.displayName === 'string');
};

const getInitialUser = (): AuthState['user'] => {
  if (typeof window === 'undefined') return null;

  try {
    const savedUser = localStorage.getItem('ecoShopUser');
    if (!savedUser) return null;

    const parsed: unknown = JSON.parse(savedUser);
    return isValidUserData(parsed) ? parsed : null;
  } catch (error) {
    console.error('Failed to parse user data', error);
    return null;
  }
};

const initialState: AuthState = {
  user: getInitialUser(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('ecoShopUser', JSON.stringify(action.payload));
      }
    },
    clearUser: state => {
      state.user = null;
      localStorage.removeItem('ecoShopUser');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
