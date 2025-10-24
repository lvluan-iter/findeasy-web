<template>
  <div class="bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 md:px-12 lg:px-[120px] py-12">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center">
        <button
          class="text-blue-600 hover:text-blue-800 flex items-center transition duration-300"
          @click="$router.go(-1)"
        >
          <i class="fas fa-arrow-left mr-2" />
          <span class="font-medium">Back</span>
        </button>
        <div class="ml-4 h-6 w-px bg-blue-200" />
        <h1 class="ml-4 text-3xl font-bold text-gray-800">Find Your Dream Property</h1>
      </div>
      <hr class="w-full mb-5" />

      <div class="text-center mb-2">
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          Discover Luxury Living
        </h2>
        <p class="text-gray-600 text-lg mx-auto">
          Explore our curated selection of premium properties in the world's most desirable locations.
        </p>
      </div>

      <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-100">
        <div class="p-8">
          <div class="flex flex-wrap justify-between items-center mb-8">
            <div class="space-x-3 mb-4 md:mb-0">
              <button
                v-for="tab in ['For Rent', 'For Sale']"
                :key="tab"
                :class="[
                  'px-6 py-2 rounded-full text-sm font-semibold transition duration-300',
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                ]"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>
            <button
              class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition duration-300"
              @click="toggleMoreOptions"
            >
              {{ moreOptionsVisible ? 'Hide' : 'Show' }} options
              <i :class="['fas', moreOptionsVisible ? 'fa-chevron-up' : 'fa-chevron-down', 'ml-2']" />
            </button>
          </div>

          <div class="mb-8">
            <div class="relative group">
              <i
                class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition duration-300"
              />
              <input
                v-model="filters.keyword"
                type="text"
                placeholder="Search by keyword (e.g., modern, riverside, newly renovated)"
                class="w-full pl-12 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="relative group">
              <i
                class="fas fa-map-marker-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition duration-300"
              />
              <input
                v-model="filters.address"
                type="text"
                placeholder="Address, Street, City..."
                class="w-full pl-12 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
              />
            </div>

            <div class="relative group">
              <i
                class="fas fa-home absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition duration-300"
              />
              <select
                v-model="filters.category"
                class="w-full pl-12 pr-4 py-3 text-gray-700 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent appearance-none"
              >
                <option value="">All Property Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="land">Land</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
              />
            </div>

            <div class="relative group">
              <i
                class="fas fa-city absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition duration-300"
              />
              <select
                v-model="filters.location"
                class="w-full pl-12 pr-4 py-3 text-gray-700 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent appearance-none"
              >
                <option value="">All Cities</option>
                <option value="hanoi">Hanoi</option>
                <option value="hochiminh">Ho Chi Minh City</option>
                <option value="danang">Da Nang</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div class="flex items-center gap-4">
                <div class="relative flex-1">
                  <i class="fas fa-dollar-sign absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.minPrice"
                    type="number"
                    placeholder="Min"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
                <div class="relative flex-1">
                  <i class="fas fa-dollar-sign absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.maxPrice"
                    type="number"
                    placeholder="Max"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Area (m²)</label>
              <div class="flex items-center gap-4">
                <div class="relative flex-1">
                  <i class="fas fa-vector-square absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.minArea"
                    type="number"
                    placeholder="Min"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
                <div class="relative flex-1">
                  <i class="fas fa-vector-square absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.maxArea"
                    type="number"
                    placeholder="Max"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-if="moreOptionsVisible" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <i class="fas fa-bed absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.bedrooms"
                    type="number"
                    placeholder="Bedrooms"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
                <div class="relative">
                  <i class="fas fa-bath absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    v-model="filters.bathrooms"
                    type="number"
                    placeholder="Bathrooms"
                    class="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <AmenitiesCheckbox
                v-model:amenities="filters.amenities"
                :initial-amenities="filters.amenities"
                class="rounded-lg border border-blue-200 p-3"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button
              class="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
              @click="search"
            >
              <i class="fas fa-search mr-2" />
              Search Properties
            </button>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="text-red-500 mt-6 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, watch, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';
import AmenitiesCheckbox from './AmenitiesCheckbox.vue';

const emit = defineEmits(['search-results', 'searchTerm']);
const {proxy} = getCurrentInstance();

const activeTab = ref('For Rent');
const moreOptionsVisible = ref(false);
const errorMessage = ref('');

const filters = reactive({
  keyword: '',
  address: '',
  categoryId: null,
  location: '',
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  bedrooms: null,
  bathrooms: null,
  amenities: [],
  isAvailable: true,
  type: 'For Rent'
});

watch(activeTab, (newValue) => {
  filters.type = newValue;
  filters.isAvailable = true;
});

const toggleMoreOptions = () => {
  moreOptionsVisible.value = !moreOptionsVisible.value;
};

const validateInputs = () => {
  if (filters.minPrice && filters.maxPrice && Number(filters.minPrice) > Number(filters.maxPrice)) {
    throw new Error('Minimum price cannot be greater than maximum price');
  }
  if (filters.minArea && filters.maxArea && Number(filters.minArea) > Number(filters.maxArea)) {
    throw new Error('Minimum area cannot be greater than maximum area');
  }
};

const search = async () => {
  try {
    errorMessage.value = '';
    validateInputs();

    const searchData = {...filters};

    Object.keys(searchData).forEach(
      (key) =>
        (searchData[key] === null ||
          searchData[key] === '' ||
          (Array.isArray(searchData[key]) && searchData[key].length === 0)) &&
        delete searchData[key]
    );

    const response = await proxy.$http.post(`${Endpoint.searchProperties}?page=0&size=10`, searchData);

    if (response.succeeded) {
      const data = response.result;
      const payload = data && typeof data === 'object' && 'content' in data ? data.content : data;
      const searchTerm = Object.entries(searchData)
        .map(([key, value]) => `${key}:${value}`)
        .join(', ');
      emit('search-results', payload || []);
      emit('searchTerm', searchTerm);
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Search request failed');
    }
  } catch (error) {
    console.error('Error searching properties:', error);
    errorMessage.value = error.message || 'An error occurred while searching. Please try again.';
  }
};
</script>
