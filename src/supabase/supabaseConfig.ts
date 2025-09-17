import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Создаем Supabase клиент
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Автоматически обновлять сессию
    autoRefreshToken: true,
    // Сохранять сессию в localStorage
    persistSession: true,
    // Отслеживать изменения авторизации
    detectSessionInUrl: true,
  },
});

// Типы для авторизации (совместимые с Supabase)
export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: {
    display_name?: string;
  };
  app_metadata?: any;
  aud?: string;
  created_at?: string;
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
}
