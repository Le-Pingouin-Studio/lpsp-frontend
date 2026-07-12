import { create } from 'zustand';
import { getCategories, Category } from '../lib/api';

interface CategoryState {
  categories: Category[];
  loadingCategories: boolean;
  categoriesFetched: boolean;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loadingCategories: true, // Init as true for the first time
  categoriesFetched: false,

  fetchCategories: async () => {
    if (get().categoriesFetched) return;
    set({ loadingCategories: true });
    try {
      const categories = await getCategories();
      set({ categories, categoriesFetched: true, loadingCategories: false });
    } catch (error) {
      console.error('Failed to fetch categories', error);
      set({ loadingCategories: false, categoriesFetched: true }); // Avoid refetching on error loops
    }
  },
}));
