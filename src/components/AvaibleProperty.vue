<template>
  <div class="container mx-auto px-4 py-6">
    <div class="space-y-4">
      <div
        v-for="property in properties"
        :key="property.id"
        class="property bg-white rounded-lg overflow-hidden cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-300"
      >
        <div class="flex flex-col md:flex-row">
          <!-- Image section -->
          <div class="md:w-2/5 relative">
            <img
              class="w-full h-64 md:h-full object-cover"
              :src="property.imageUrls[0]"
              :alt="property.title"
            >
            <div class="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs uppercase">
              {{ property.type }}
            </div>
          </div>
          
          <!-- Info section -->
          <div class="md:w-3/5 p-4 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ property.title }}
                </h3>
                <div class="text-2xl font-bold text-blue-600">
                  ${{ (property.price / 1000000).toFixed(2) }}M<span class="text-sm text-gray-500 font-normal">/tháng</span>
                </div>
              </div>
              <div class="flex items-center text-gray-600 mb-2 text-sm">
                <i class="fas fa-map-marker-alt text-red-500 mr-2" />
                <span>{{ property.address }}</span>
              </div>
              <p class="text-gray-600 mb-3 text-sm line-clamp-2">
                {{ property.description }}
              </p>
              <div class="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-3">
                <div class="flex items-center">
                  <i class="fas fa-bed text-blue-500 mr-3" />
                  <span>{{ property.bedrooms }} giường</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-bath text-blue-500 mr-3" />
                  <span>{{ property.bathrooms }} nhà tắm</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-vector-square text-blue-500 mr-3" />
                  <span>{{ property.area }} m²</span>
                </div>
              </div>
              <!-- Tính năng nổi bật -->
              <div class="mb-3">
                <h4 class="text-sm font-semibold text-gray-700 mb-1">
                  Tính năng nổi bật:
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="amenity in property.amenities.slice(0,5)"
                    :key="amenity.id"
                    class="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center transition duration-300 hover:bg-blue-100"
                  >
                    <i
                      :class="amenity.icon"
                      class="mr-1"
                    />
                    {{ amenity.name }}
                  </span>
                  <span
                    v-if="property.amenities.length > 5"
                    class="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center transition duration-300 hover:bg-blue-100"
                  >
                    +{{ property.amenities.length - 5 }} more
                  </span>
                </div>
              </div>
              <!-- Thông tin khu vực -->
              <div
                v-if="property.nearbyPlaces && property.nearbyPlaces.length > 0"
                class="mb-3"
              >
                <h4 class="text-sm font-semibold text-gray-700 mb-1">
                  Khu vực lân cận:
                </h4>
                <ul class="text-xs text-gray-600 list-none pl-4">
                  <li
                    v-for="place in property.nearbyPlaces"
                    :key="place.id"
                  >
                    <i class="fas fa-map-pin text-red-500 mr-2" />
                    {{ place.name }} (cách {{ place.distance }} {{ place.unit }})
                  </li>
                </ul>
              </div>
              <div
                v-else
                class="mb-3"
              >
                <h4 class="text-sm font-semibold text-gray-700 mb-1">
                  Khu vực lân cận:
                </h4>
                <p class="text-xs text-gray-600">
                  Không có thông tin về các địa điểm lân cận.
                </p>
              </div>
              <!-- Đánh giá -->
              <div class="flex items-center mb-3">
                <div class="flex items-center mr-2">
                  <i class="fas fa-star text-yellow-400" />
                  <span class="ml-1 text-sm font-semibold">4.5</span>
                </div>
                <span class="text-xs text-gray-500">(12 đánh giá)</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex flex-wrap gap-2">
                <button 
                  class="px-4 py-2 min-w-32 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-300"
                  @click="linktoDetail(property.id)"
                >
                  View Details
                </button>
                <button class="px-4 py-2 min-w-32 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors duration-300">
                  Contact Agent
                </button>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  v-for="action in ['heart', 'share']"
                  :key="action"
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                  @click.stop="handleAction(action, property)"
                >
                  <i :class="getIconClass(action)" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer section with Compare button -->
        <div class="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div class="text-gray-500 text-xs">
            Listed on {{ new Date(property.listedDate).toLocaleDateString() }}
          </div>
          <button
            class="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-300 flex items-center"
            @click.stop="toggleCompare(property)"
          >
            <template v-if="isPropertyInCompare(property)">
              <i class="fa-regular fa-circle-check mr-2" />
              Đã thêm
            </template>
            <template v-else>
              <i class="fas fa-balance-scale mr-2" />
              So sánh
            </template>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div
      v-if="showPagination"
      class="mt-6 flex justify-center"
    >
      <nav
        class="inline-flex rounded-md shadow"
        aria-label="Pagination"
      >
        <button
          :disabled="currentPage === 0"
          class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>
        <button
          v-for="page in displayedPages"
          :key="page"
          :class="[
            'px-3 py-2 border border-gray-300 text-sm font-medium',
            page === currentPage + 1
              ? 'bg-blue-50 border-blue-500 text-blue-600'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          ]"
          @click="changePage(page - 1)"
        >
          {{ page }}
        </button>
        <button
          :disabled="currentPage === totalPages - 1"
          class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { usePropertyStore } from '../stores/propertyStore';

const userStore = useUserStore();
const propertyStore = usePropertyStore();
const router = useRouter();

const props = defineProps({
  properties: {
    type: Array,
    required: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: Number,
    default: 0
  },
  totalPages: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['changePage']);

const displayedPages = computed(() => {
  const range = 2;
  const start = Math.max(1, props.currentPage + 1 - range);
  const end = Math.min(props.totalPages, props.currentPage + 1 + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = (newPage) => {
  emit('changePage', newPage);
};

const linktoDetail = (id) => {
  router.push(`/propertydetail/${id}`);
};

const handleAction = (action, property) => {
  switch (action) {
    case 'heart':
      addToFavorites(property.id);
      break;
    case 'share':
      shareProperty(property);
      break;
  }
};

const getIconClass = (action) => {
  switch (action) {
    case 'heart':
      return 'fas fa-heart text-gray-600';
    case 'share':
      return 'fas fa-share-alt text-gray-600';
  }
};

const shareProperty = (property) => {
  const shareUrl = `${window.location.origin}/propertydetail/${property.id}`;
  if (navigator.share) {
    navigator.share({
      title: property.title,
      text: property.description,
      url: shareUrl
    }).then(() => console.log('Thanks for sharing!')).catch(console.error);
  } else {
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Could not copy text: ', err));
  }
};

const addToFavorites = (propertyId) => {
  const url = `http://localhost:8080/api/users/${userStore.user.id}/favorites/${propertyId}`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(response => response.text().then(text => ({ text, status: response.status })))
    .then(({ text, status }) => {
      const message = status === 200 ? 'Added to favorites!' :
        status === 409 ? `Error: ${text}` :
          status === 404 ? `Resource not found: ${text}` :
            'An error occurred. Please try again later.';
      alert(message);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
};

const toggleCompare = (property) => {
  if (propertyStore.isInCompareList(property.id)) {
    propertyStore.removeFromCompare(property.id);
  } else {
    propertyStore.addToCompare(property);
  }
};

const isPropertyInCompare = (property) => {
  return propertyStore.isInCompareList(property.id);
};
</script>