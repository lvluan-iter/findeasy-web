<template>
  <div class="bg-white lg:px-[120px] py-5 lg:py-12">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <a class="text-gray-800 hover:text-gray-600 cursor-pointer" @click="$router.push('/')">
          <i class="fas fa-home text-xl" />
        </a>
        <span class="mx-4 text-gray-300">|</span>
        <h1 class="text-xl font-semibold text-gray-800">So sánh bất động sản</h1>
      </div>
    </div>

    <hr class="w-full mb-3" />

    <div class="flex items-center space-x-2 mb-2">
      <span v-for="(property, index) in compareList" :key="property.id" class="font-medium">
        {{ property.title }}
        <span v-if="index !== compareList.length - 1" class="text-gray-400">&</span>
      </span>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="property in compareList"
        :key="property.id"
        class="border rounded-lg overflow-hidden relative flex flex-col"
      >
        <div class="relative h-64">
          <img :src="property.imageUrls[0]" :alt="property.title" class="w-full h-full object-cover" />
          <span class="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded">
            {{ property.type }}
          </span>
          <button
            class="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-100"
            @click="removeFromCompare(property.id)"
          >
            <i class="fas fa-times text-gray-600 text-xs" />
          </button>
        </div>

        <div class="p-4 flex-grow flex flex-col">
          <h2 class="text-base font-semibold mb-2 line-clamp-2 h-12">
            {{ property.title }}
          </h2>
          <div class="text-sm text-gray-600 mb-2 line-clamp-2 h-10">
            <i class="fas fa-map-marker-alt mr-1" />
            {{ property.address }}
          </div>
          <div class="flex items-baseline mb-2">
            <span class="text-red-600 font-bold text-xl">{{ formatCurrency(property.price) }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
            <div class="flex items-center"><i class="fas fa-bed mr-1" /> {{ property.bedrooms }} PN</div>
            <div class="flex items-center"><i class="fas fa-bath mr-1" /> {{ property.bathrooms }} PT</div>
            <div class="flex items-center"><i class="fas fa-vector-square mr-1" /> {{ property.area }} m²</div>
          </div>
          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="amenity in property.amenities.slice(0, 2)"
              :key="amenity.id"
              class="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center"
            >
              <i :class="[amenity.icon, 'mr-1']" />
              {{ amenity.name }}
            </span>
            <span v-if="property.amenities.length > 3" class="text-xs text-gray-500 flex items-center">
              +{{ property.amenities.length - 2 }} khác
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="compareList.length < 3"
        class="border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        @click="addProperty"
      >
        <div class="text-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-plus text-blue-600" />
          </div>
          <span class="text-sm text-gray-600">Thêm sản phẩm</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePropertyStore} from '@/stores/propertyStore';
import {storeToRefs} from 'pinia';

const propertyStore = usePropertyStore();
const {compareList} = storeToRefs(propertyStore);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
};

const removeFromCompare = (propertyId) => {
  propertyStore.removeFromCompare(propertyId);
};

const addProperty = () => {
  // Implement logic to add a new property for comparison
};
</script>
