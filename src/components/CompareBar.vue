<template>
  <div
    v-if="compareList.length > 0"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50"
  >
    <div class="container mx-auto px-4 lg:px-[120px] py-2 max-w-full">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div class="flex space-x-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <div
            v-for="property in compareList"
            :key="property.id"
            class="flex-shrink-0 w-40 sm:w-48 bg-gray-100 rounded-lg overflow-hidden"
          >
            <div class="relative">
              <img
                :src="property.imageUrls[0]"
                :alt="property.title"
                class="w-full h-20 sm:h-24 object-cover"
              >
              <button
                class="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                @click="removeFromCompare(property.id)"
              >
                <i class="fas fa-times text-xs sm:text-sm" />
              </button>
            </div>
            <div class="p-2">
              <p class="text-xs sm:text-sm font-medium truncate">
                {{ property.title }}
              </p>
            </div>
          </div>
          <div
            v-if="compareList.length < 3"
            class="flex-shrink-0 w-40 sm:w-48 h-[100px] sm:h-[120px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
          >
            <button 
              class="text-gray-400 hover:text-gray-600" 
            >
              <i class="fas fa-plus text-xl sm:text-2xl" />
              <span class="block text-xs sm:text-sm mt-1">Thêm sản phẩm</span>
            </button>
          </div>
        </div>
        <div class="flex flex-col items-stretch md:items-end space-y-2 mt-4 md:mt-0 w-full md:w-auto">
          <button
            :disabled="compareList.length < 2"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300 w-full md:w-auto text-sm sm:text-base"
            @click="goToComparePage"
          >
            So sánh ngay
          </button>
          <button
            class="text-blue-600 hover:underline text-xs sm:text-sm"
            @click="clearCompareList"
          >
            Xóa tất cả sản phẩm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { usePropertyStore } from '../stores/propertyStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const propertyStore = usePropertyStore();
const { compareList } = storeToRefs(propertyStore);

const removeFromCompare = (propertyId) => {
  propertyStore.removeFromCompare(propertyId);
};

const clearCompareList = () => {
  propertyStore.clearCompareList();
};

const goToComparePage = () => {
  if (compareList.value.length >= 2) {
    const compareIds = compareList.value.map(p => p.id).join(',');
    router.push(`/compare/${compareIds}`);
  }
};
</script>