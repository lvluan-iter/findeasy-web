import {defineStore} from 'pinia';
import http from '@/api/httpClient';
import {Endpoint} from '@/constants/Endpoint';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getCategoryOptions: (state) => {
      return [
        {value: -1, label: 'Select Category'},
        ...state.categories.map((category) => ({
          value: category.id,
          label: category.categoryName
        }))
      ];
    }
  },

  actions: {
    async fetchCategories() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await http.get(Endpoint.getCategories);
        this.categories = response.result;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.error = 'Failed to load categories';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
