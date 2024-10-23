<template>
  <div class="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 class="text-3xl font-bold text-white">
              {{ resultCount }} <span class="text-blue-400">Luxurious Homes</span>
            </h2>
            <p class="text-sm text-gray-300 mt-1">
              Refined selection for "{{ searchTerm }}"
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div class="relative">
              <select
                v-model="localSortBy"
                class="appearance-none bg-gray-700 border border-gray-600 rounded-md pl-10 pr-10 py-2 text-sm font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                @change="emit('sort-change', localSortBy)"
              >
                <option
                  disabled
                  value=""
                >
                  Sort by
                </option>
                <option value="relevance">
                  Relevance
                </option>
                <option value="popularity">
                  Popularity
                </option>
                <option value="price-high-low">
                  Price: High to Low
                </option>
                <option value="price-low-high">
                  Price: Low to High
                </option>
                <option value="newest">
                  Newest
                </option>
                <option value="bedrooms">
                  Bedrooms
                </option>
                <option value="bathrooms">
                  Bathrooms
                </option>
                <option value="area">
                  Area
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              </div>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <button
              class="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              @click="emit('toggle-map-view')"
            >
              <svg
                v-if="isMapView"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {{ isMapView ? 'List View' : 'Map View' }}
            </button>
            <button
              class="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              @click="$emit('toggle-save-search')"
            >
              <svg
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Save Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  searchTerm: {
    type: String,
    required: true
  },
  resultCount: {
    type: Number,
    required: true
  },
  sortBy: {
    type: String,
    default: 'relevance'
  },
  isMapView: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['sort-change', 'toggle-map-view', 'toggle-save-search']);

const localSortBy = ref(props.sortBy);

watch(() => props.sortBy, (newValue) => {
  localSortBy.value = newValue;
});
</script>