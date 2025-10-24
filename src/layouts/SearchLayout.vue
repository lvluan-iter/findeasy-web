<template>
  <div>
    <SearchComponent @search-results="properties = $event" @search-term="searchTerm = $event" />
    <SearchResultsHeader
      :search-term="searchTerm"
      :result-count="properties.length"
      :sort-by="sortBy"
      :is-map-view="isMapView"
      @sort-change="handleSortChange"
      @toggle-map-view="toggleMapView"
      @toggle-save-search="toggleSaveSearch"
    />
    <AvaibleProperty v-if="!isMapView" :initial-properties="sortedProperties" />
    <section v-else class="h-[75vh]">
      <MapView :properties="sortedProperties" />
    </section>
  </div>
</template>

<script setup>
import {ref, computed, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';
import SearchComponent from '@/components/SearchComponent.vue';
import AvaibleProperty from '@/components/AvaibleProperty.vue';
import SearchResultsHeader from '@/components/SearchResultsHeader.vue';
import MapView from '@/components/MapView.vue';

const properties = ref([]);
const searchTerm = ref('All Properties');
const sortBy = ref('relevance');
const isMapView = ref(false);
const {proxy} = getCurrentInstance();

const handleSortChange = async (newSortBy) => {
  sortBy.value = newSortBy;
  if (properties.value.length > 100) {
    try {
      const response = await proxy.$http.post(`${Endpoint.searchProperties}?sort=${newSortBy}`, {});
      if (response.succeeded) {
        properties.value = response.result;
      } else {
        throw new Error(response.errors.join(', '));
      }
    } catch (error) {
      console.error('Error sorting properties:', error);
    }
  }
};

const toggleMapView = () => {
  isMapView.value = !isMapView.value;
};

const toggleSaveSearch = () => {
  console.log('Toggle save search');
};

const sortedProperties = computed(() => {
  if (properties.value.length <= 100) {
    return [...properties.value].sort((a, b) => {
      switch (sortBy.value) {
        case 'popularity':
          return b.visits - a.visits;
        case 'price-high-low':
          return b.price - a.price;
        case 'price-low-high':
          return a.price - b.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'bedrooms':
          return b.bedrooms - a.bedrooms;
        case 'bathrooms':
          return b.bathrooms - a.bathrooms;
        case 'area':
          return b.area - a.area;
        default:
          return 0;
      }
    });
  }
  return properties.value;
});
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
