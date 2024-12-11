// userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/types';

interface CreateUserResponse {
  id: string;
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://109.95.210.44' }),
  endpoints: builder => ({
    createUser: builder.mutation<CreateUserResponse, Partial<User>>({
      query: userData => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
