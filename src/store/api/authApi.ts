import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase, SupabaseUser, SupabaseSession } from '../../supabase/supabaseConfig';

// Типы для авторизации
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthResponse {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  error?: string;
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/`,
    prepareHeaders: (headers) => {
      headers.set('apikey', import.meta.env.VITE_SUPABASE__KEY);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // Вход в систему
    login: builder.mutation<AuthResponse, LoginRequest>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            return { error: { status: 400, data: error.message } };
          }

          return {
            data: {
              user: data.user as SupabaseUser | null,
              session: data.session as SupabaseSession | null,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Регистрация
    register: builder.mutation<AuthResponse, RegisterRequest>({
      queryFn: async ({ email, password, displayName }) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                display_name: displayName,
              },
              emailRedirectTo: undefined, // Отключаем редирект для подтверждения
            },
          });

          if (error) {
            return { error: { status: 400, data: error.message } };
          }


          return {
            data: {
              user: data.user as SupabaseUser | null,
              session: data.session as SupabaseSession | null,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Выход из системы
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            return { error: { status: 400, data: error.message } };
          }

          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Получение текущей сессии
    getSession: builder.query<AuthResponse, void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase.auth.getSession();

          if (error) {
            return { error: { status: 400, data: error.message } };
          }

          return {
            data: {
              user: data.session?.user as SupabaseUser | null || null,
              session: data.session as SupabaseSession | null,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      providesTags: ['Auth'],
    }),

    // Обновление профиля
    updateProfile: builder.mutation<AuthResponse, { displayName: string }>({
      queryFn: async ({ displayName }) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: {
              display_name: displayName,
            },
          });

          if (error) {
            return { error: { status: 400, data: error.message } };
          }

          // Получаем текущую сессию после обновления
          const { data: sessionData } = await supabase.auth.getSession();

          return {
            data: {
              user: data.user as SupabaseUser | null,
              session: sessionData.session as SupabaseSession | null,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetSessionQuery,
  useUpdateProfileMutation,
} = authApi;
