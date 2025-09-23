import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IProductWithRelations,
  ISupabaseBrand,
  ISupabaseCategory
} from '../../constants/interfaces/ISupabaseProduct';
import { supabase } from '../../supabase/supabaseConfig';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi', // имя слайса в store, это имя ключа в state, которое мы выбрали сами

  // baseQuery выполняет запросы, описание которых возвращают эндпоинты
  baseQuery: fetchBaseQuery({
    baseUrl: `${supabaseUrl}/rest/v1/`,
    prepareHeaders: async (headers) => {
      headers.set('apikey', supabaseKey);
      headers.set('Content-Type', 'application/json');
      headers.set('Prefer', 'return=representation');
      
      // Получаем токен пользователя для авторизованных запросов
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers.set('Authorization', `Bearer ${session.access_token}`);
        } else {
          headers.set('Authorization', `Bearer ${supabaseKey}`);
        }
      } catch (error) {
        console.error('Error getting session token:', error);
        headers.set('Authorization', `Bearer ${supabaseKey}`);
      }
      
      return headers;
    },
  }),

  tagTypes: ['Product', 'Brand', 'Category', 'Favorite'],

  endpoints: (builder) => ({
    // Товары с JOIN запросами
    // Экспортируем как useGetProductsQuery
    // RTK Query берет название query из endpoints и создает useGetProductsQuery. use + G + etProducts + Query
    getProducts: builder.query<IProductWithRelations[], void>({
      query: () => ({
        url: 'products',
        params: {
          select: '*,brands(*),categories(*)',
        },
      }),
      providesTags: ['Product'],
    }),

    // Получить товар по ID
    getProduct: builder.query<IProductWithRelations, string>({
      query: (id) => ({
        url: `products`,
        params: {
          select: '*,brands(*),categories(*)',
          id: `eq.${id}`,
        },
      }),
      transformResponse: (response: IProductWithRelations[]) => {
        if (response.length === 0) {
          throw new Error('Product not found');
        }
        return response[0];
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    // Бренды
    getBrands: builder.query<ISupabaseBrand[], void>({
      query: () => 'brands',
      providesTags: ['Brand'],
    }),

    // Категории (с сортировкой по order_index)
    getCategories: builder.query<ISupabaseCategory[], void>({
      query: () => ({
        url: 'categories',
        params: {
          order: 'order_index.asc',
        },
      }),
      providesTags: ['Category'],
    }),

    // Избранное - получить список ID товаров для пользователя
    getFavorites: builder.query<number[], string>({
      query: (userId) => ({
        url: 'favorites',
        params: {
          select: 'product_id',
          user_id: `eq.${userId}`,
        },
      }),
      transformResponse: (response: { product_id: string }[]) =>
        response.map(item => Number(item.product_id)),
      providesTags: ['Favorite'],
    }),

    // Добавить в избранное
    addToFavorites: builder.mutation<void, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: 'favorites',
        method: 'POST',
        body: {
          user_id: userId,
          product_id: productId,
        },
      }),
      invalidatesTags: ['Favorite'],
    }),

    // Удалить из избранного
    removeFromFavorites: builder.mutation<void, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: 'favorites',
        method: 'DELETE',
        params: {
          user_id: `eq.${userId}`,
          product_id: `eq.${productId}`,
        },
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = supabaseApi;
