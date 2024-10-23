import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: null
  }),
  
  getters: {
    getCategoryOptions: (state) => {
      return [
        { value: -1, label: 'Select Category' },
        ...state.categories.map(category => ({
          value: category.id,
          label: category.categoryName
        }))
      ]
    }
  },
  
  actions: {
    async fetchCategories() {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch('http://localhost:8080/api/categories/')
        if (!response.ok) throw new Error('Failed to fetch categories')
        this.categories = await response.json()
      } catch (error) {
        console.error('Error fetching categories:', error)
        this.error = 'Failed to load categories'
      } finally {
        this.isLoading = false
      }
    }
  }
})