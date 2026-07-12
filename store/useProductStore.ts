import { create } from 'zustand';
import { getProducts, getProductById, Product } from '../lib/api';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loadingProducts: boolean;
  loadingSelectedProduct: boolean;
  isLoadingMore: boolean;
  currentPage: number;
  hasMore: boolean;
  currentCategories: string[];
  currentSort: string;
  
  fetchProducts: (options?: { categories?: string[], sort?: string, force?: boolean }) => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  loadingProducts: false,
  loadingSelectedProduct: true,
  isLoadingMore: false,
  currentPage: 1,
  hasMore: false,
  currentCategories: [],
  currentSort: 'Relevancia',

  fetchProducts: async (options) => {
    // Only fetch once if no options provided and already have products (unless forced)
    if (!options && get().products.length > 0) return;
    
    const categories = options?.categories ?? get().currentCategories;
    const sort = options?.sort ?? get().currentSort;
    
    set({ loadingProducts: true, currentCategories: categories, currentSort: sort, currentPage: 1 });
    try {
      const { data, meta } = await getProducts({ page: 1, limit: 6, categories, sort });
      set({ 
        products: data, 
        hasMore: meta.hasMore, 
        loadingProducts: false 
      });
    } catch (error) {
      console.error('Failed to fetch products', error);
      set({ loadingProducts: false });
    }
  },

  loadMoreProducts: async () => {
    const state = get();
    if (!state.hasMore || state.isLoadingMore) return;

    set({ isLoadingMore: true });
    const nextPage = state.currentPage + 1;
    try {
      const { data, meta } = await getProducts({ 
        page: nextPage, 
        limit: 6, 
        categories: state.currentCategories, 
        sort: state.currentSort 
      });
      
      set({ 
        products: [...state.products, ...data],
        currentPage: nextPage,
        hasMore: meta.hasMore,
        isLoadingMore: false 
      });
    } catch (error) {
      console.error('Failed to load more products', error);
      set({ isLoadingMore: false });
    }
  },

  fetchProductById: async (id: string) => {
    const { selectedProduct } = get();
    if (selectedProduct?.productId === id) {
        set({ loadingSelectedProduct: false });
        return;
    }

    set({ loadingSelectedProduct: true, selectedProduct: null });
    
    try {
      const product = await getProductById(id);
      set({ selectedProduct: product, loadingSelectedProduct: false });
    } catch (error) {
      console.error(`Failed to fetch product ${id}`, error);
      set({ selectedProduct: null, loadingSelectedProduct: false });
    }
  }
}));
