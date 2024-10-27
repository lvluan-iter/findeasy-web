import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    compareList: []
  }),
  getters: {
    isInCompareList: (state) => (id) => state.compareList.some(p => p.id === id)
  },
  actions: {
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
    }
  }
})