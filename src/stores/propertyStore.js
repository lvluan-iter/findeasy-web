import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [],
    totalPages: null,
    compareList: [],
    loading: false,
    error: null,
    currentPage: 0,
    pageSize: 10
  }),
  getters: {
    getPropertyById: (state) => (id) => state.properties.find(p => p.id === id),
    isInCompareList: (state) => (id) => state.compareList.some(p => p.id === id),
    hasNextPage: (state) => state.currentPage < state.totalPages,
    hasPreviousPage: (state) => state.currentPage > 1
  },
  actions: {
    async fetchAvailableProperties(page = this.currentPage) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`http://localhost:8080/api/properties/available?page=${page}&size=${this.pageSize}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        this.properties = data.content
        this.totalPages = data.totalPages
        this.currentPage = page
      } catch (error) {
        console.error('Error fetching properties:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    addToCompare(property) {
      if (this.compareList.length < 3 && !this.isInCompareList(property.id)) {
        this.compareList.push(property)
      }
    },
    removeFromCompare(id) {
      this.compareList = this.compareList.filter(p => p.id !== id)
    },
    clearCompareList() {
      this.compareList = []
    },
    nextPage() {
      if (this.hasNextPage) {
        this.fetchAvailableProperties(this.currentPage + 1)
      }
    },
    previousPage() {
      if (this.hasPreviousPage) {
        this.fetchAvailableProperties(this.currentPage - 1)
      }
    },
    setPageSize(size) {
      this.pageSize = size
      this.fetchAvailableProperties(0)
    }
  }
})