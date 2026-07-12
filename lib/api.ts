export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  gramos_pieza: number;
  horas_impresion: number;
  minutos_impresion: number;
  segundos_impresion: number;
  imageUrl?: string;
  images?: { secureUrl: string }[];
  material?: string;
  category?: Category;
  ancho?: number;
  alto?: number;
  profundidad?: number;
}

export interface Category {
  categoryId: string;
  slug: string;
  name: string;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    hasMore: boolean;
  };
}

export async function getProducts(options?: {
  page?: number;
  limit?: number;
  categories?: string[];
  sort?: string;
}): Promise<PaginatedProducts> {
  try {
    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.categories && options.categories.length > 0) params.append('categories', options.categories.join(','));
    if (options?.sort) params.append('sort', options.sort);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    const responseData = await res.json();

    // Check if it's the new paginated structure or old array fallback
    const items = Array.isArray(responseData) ? responseData : responseData.data || [];
    const meta = responseData.meta || { totalItems: items.length, currentPage: 1, itemsPerPage: 100, hasMore: false };

    // Preset material and fallback image for MVP
    const data = items.map((product: Product) => ({
      ...product,
      material: product.material || 'PLA',
      imageUrl: product.images && product.images.length > 0 ? product.images[0].secureUrl : '/placeholder.png'
    }));

    return { data, meta };
  } catch (error) {
    console.error(error);
    return { data: [], meta: { totalItems: 0, currentPage: 1, itemsPerPage: 100, hasMore: false } };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch product');
    const data = await res.json();

    return {
      ...data,
      material: data.material || 'PLA',
      imageUrl: data.images && data.images.length > 0 ? data.images[0].secureUrl : '/placeholder.png'
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { next: { revalidate: 3600 } }); // Categories change less often
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
