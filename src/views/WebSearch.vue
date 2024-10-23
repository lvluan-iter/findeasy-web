<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <SearchComponent 
        @search-results="properties = $event"
        @search-term="searchTerm = $event"
      />
      <SearchResultsHeader
        :search-term="searchTerm"
        :result-count="properties.length"
        :sort-by="sortBy"
        :is-map-view="isMapView"
        @sort-change="handleSortChange"
        @toggle-map-view="toggleMapView"
        @toggle-save-search="toggleSaveSearch"
      />
      <AvaibleProperty
        v-if="!isMapView"
        :initial-properties="sortedProperties"
      />
      <section 
        v-else 
        class="h-[75vh]"
      >
        <MapView :properties="sortedProperties" />
      </section>
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import IconHeader from '../components/IconHeader.vue'
import WebFooter from '@/components/WebFooter.vue'
import NavBar from '@/components/NavBar.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import AvaibleProperty from '@/components/AvaibleProperty.vue'
import SearchResultsHeader from '@/components/SearchResultsHeader.vue'
import MapView from '@/components/MapView.vue'

const properties = ref([])
const searchTerm = ref('All Properties')
const sortBy = ref('relevance')
const isMapView = ref(false)

const handleSortChange = async (newSortBy) => {
  sortBy.value = newSortBy
  if (properties.value.length > 100) {
    // Nếu có nhiều hơn 100 kết quả, gọi API để sắp xếp
    try {
      const response = await fetch(`http://localhost:8080/api/properties/search?sort=${newSortBy}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(/* các tham số tìm kiếm hiện tại */)
      })
      if (!response.ok) throw new Error('Sort request failed')
      const data = await response.json()
      properties.value = data.content
    } catch (error) {
      console.error('Error sorting properties:', error)
    }
  }
  // Nếu ít hơn 100 kết quả, sắp xếp sẽ được xử lý bởi sortedProperties computed property
}

const toggleMapView = () => {
  isMapView.value = !isMapView.value
}

const toggleSaveSearch = () => {
  // Implement save search functionality
  console.log('Toggle save search')
}

const sortedProperties = computed(() => {
  if (properties.value.length <= 100) {
    // Sắp xếp ở frontend nếu có ít hơn hoặc bằng 100 kết quả
    return [...properties.value].sort((a, b) => {
      switch (sortBy.value) {
        case 'popularity':
          return b.visits - a.visits
        case 'price-high-low':
          return b.price - a.price
        case 'price-low-high':
          return a.price - b.price
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'bedrooms':
          return b.bedrooms - a.bedrooms
        case 'bathrooms':
          return b.bathrooms - a.bathrooms
        case 'area':
          return b.area - a.area
        default:
          return 0 // 'relevance' sẽ giữ nguyên thứ tự ban đầu
      }
    })
  }
  return properties.value // Nếu nhiều hơn 100 kết quả, sử dụng thứ tự từ backend
})
</script>

<style scoped>
.nav {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 240px);
  z-index: 9999;
}
</style>