<template>
  <div class="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div v-if="compareList.length > 0" class="space-y-12">
        <!-- Comparison Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Bảng so sánh chi tiết</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-blue-50">
                    <th class="p-3 text-left text-blue-600 font-medium">Tiêu chí</th>
                    <th
                      v-for="property in compareList"
                      :key="property.id"
                      class="p-3 text-left text-blue-600 font-medium"
                    >
                      {{ truncateTitle(property.title) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(group, groupIndex) in featureGroups" :key="groupIndex">
                    <tr class="bg-gray-50">
                      <td colspan="4" class="p-3 font-semibold text-gray-700">
                        {{ group.name }}
                      </td>
                    </tr>
                    <tr
                      v-for="feature in group.features"
                      :key="feature.key"
                      class="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td class="p-3 font-medium text-gray-700 flex items-center">
                        <i :class="[feature.icon, 'mr-2 text-blue-500']" />
                        {{ feature.name }}
                      </td>
                      <td v-for="property in compareList" :key="property.id" class="p-3 text-gray-600">
                        <template v-if="feature.type === 'currency'">
                          {{ formatCurrency(property[feature.key]) }}
                        </template>
                        <template v-else-if="feature.type === 'array'">
                          <div class="flex flex-wrap gap-1">
                            <span
                              v-for="item in formatArray(property[feature.key])"
                              :key="item"
                              class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >{{ item }}</span
                            >
                          </div>
                        </template>
                        <template v-else-if="feature.type === 'rating'">
                          <div class="flex items-center">
                            <span v-for="n in 5" :key="n" class="text-yellow-400 mr-1">
                              <i :class="['fas', n <= property[feature.key] ? 'fa-star' : 'fa-star-o']" />
                            </span>
                            <span class="ml-2">{{ property[feature.key] }}/5</span>
                          </div>
                        </template>
                        <template v-else> {{ property[feature.key] }} {{ feature.unit }} </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 text-xl bg-white p-8 rounded-lg shadow-md">
        <i class="far fa-frown text-4xl text-gray-400 mb-4" />
        <p>Không có bất động sản nào để so sánh</p>
      </div>

      <div class="mt-12 text-center">
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded transition-colors duration-300 hover:bg-blue-700 text-base font-medium inline-flex items-center"
          @click="goBack"
        >
          <i class="fas fa-arrow-left mr-2" />Quay lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePropertyStore} from '@/stores/propertyStore';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';

const router = useRouter();
const propertyStore = usePropertyStore();
const {compareList} = storeToRefs(propertyStore);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
};

const truncateTitle = (title) => {
  return title.length > 20 ? title.substring(0, 20) + '...' : title;
};

const formatArray = (arr) => {
  return arr.slice(0, 3).map((item) => item.name);
};

const goBack = () => {
  router.back();
};

const featureGroups = [
  {
    name: 'Thông tin cơ bản',
    features: [
      {name: 'Giá', key: 'price', type: 'currency', icon: 'fas fa-tag'},
      {name: 'Diện tích', key: 'area', type: 'number', unit: 'm²', icon: 'fas fa-vector-square'},
      {name: 'Phòng ngủ', key: 'bedrooms', type: 'number', icon: 'fas fa-bed'},
      {name: 'Phòng tắm', key: 'bathrooms', type: 'number', icon: 'fas fa-bath'},
      {name: 'Năm xây dựng', key: 'yearBuilt', type: 'number', icon: 'fas fa-calendar-alt'}
    ]
  },
  {
    name: 'Đặc điểm',
    features: [
      {name: 'Tình trạng', key: 'type', type: 'string', icon: 'fas fa-info-circle'},
      {name: 'Tiện nghi', key: 'amenities', type: 'array', icon: 'fas fa-concierge-bell'},
      {name: 'Địa điểm gần đó', key: 'nearbyPlaces', type: 'array', icon: 'fas fa-map-marker-alt'}
    ]
  },
  {
    name: 'Đánh giá',
    features: [{name: 'Xếp hạng', key: 'rating', type: 'rating', icon: 'fas fa-star'}]
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.table-fixed {
  table-layout: fixed;
}

@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
