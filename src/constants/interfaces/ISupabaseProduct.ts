// Новые типы для Supabase с учетом связей

export interface ISupabaseBrand {
  id: number;
  brand_name: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISupabaseCategory {
  id: string;
  name: string;
  icon: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ISupabaseProduct {
  id: string;
  item_images: string[];
  brand_id: number;
  category_id: string;
  item_description: string | null;
  item_name: string;
  item_price: number;
  item_quantity: number;
  item_total_price: number;
  created_at: string;
  updated_at: string;
}

// Типы для JOIN запросов (с связанными данными)
export interface IProductWithRelations extends ISupabaseProduct {
  brands: ISupabaseBrand;
  categories: ISupabaseCategory;
}


// Типы для избранного
export interface ISupabaseFavorite {
  id: number;
  user_id: string;
  product_id: string;
  created_at: string;
}
