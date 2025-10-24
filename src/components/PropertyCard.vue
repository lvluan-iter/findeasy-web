<template>
  <section class="mt-12 flex flex-col items-start px-4 md:px-12 lg:px-20 lg:py-12 xl:px-32 py-5">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Properties</h2>
    <div v-if="properties.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="property in props.properties"
        :key="property.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div class="relative">
          <img :src="property.imageUrls[0]" :alt="property.title" class="w-full h-48 object-cover" />
          <div class="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {{ property.type }}
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 h-14">
            {{ property.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3 h-16">
            {{ property.description }}
          </p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-2xl font-bold text-indigo-600">${{ property.price.toLocaleString() }}</span>
            <div class="flex items-center text-gray-500">
              <i class="fas fa-map-marker-alt mr-1" />
              <span class="text-sm">{{ property.location }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
            <div class="bg-indigo-50 rounded-lg p-2">
              <i class="fas fa-bed mb-1" />
              <p>{{ property.bedrooms }} Beds</p>
            </div>
            <div class="bg-indigo-50 rounded-lg p-2">
              <i class="fas fa-bath mb-1" />
              <p>{{ property.bathrooms }} Baths</p>
            </div>
            <div class="bg-indigo-50 rounded-lg p-2">
              <i class="fas fa-ruler-combined mb-1" />
              <p>{{ property.area }} sqft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 mt-8">No properties available at the moment.</div>
  </section>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  properties: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>
