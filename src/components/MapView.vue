<template>
  <div class="map-container w-full h-full relative z-0">
    <l-map
      :zoom="zoom"
      :center="mapCenter"
      class="w-full h-full"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker
        v-for="property in geoProperties"
        :key="property.id"
        :lat-lng="property.latLng"
        :icon="customIcon"
      >
        <l-popup>
          <div class="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] p-2 sm:p-3 md:p-4 rounded-lg bg-white shadow">
            <img
              :src="property.imageUrls[0]"
              alt="Property"
              class="w-full h-24 sm:h-32 md:h-36 object-cover rounded mb-2 sm:mb-2.5"
            >
            <h3 class="text-base sm:text-lg font-bold mb-1 sm:mb-2 md:mb-2.5 text-gray-800">
              {{ property.title }}
            </h3>
            <p class="text-sm sm:text-base font-bold text-green-500 mb-1 sm:mb-2 md:mb-2.5">
              {{ formatPrice(property.price) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 md:mb-2.5">
              {{ property.address }}
            </p>
            <div class="flex justify-between mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm text-gray-700">
              <span class="flex items-center"><i class="fas fa-bed mr-1 sm:mr-1.5" /> {{ property.bedrooms }} beds</span>
              <span class="flex items-center"><i class="fas fa-bath mr-1 sm:mr-1.5" /> {{ property.bathrooms }} baths</span>
              <span class="flex items-center"><i class="fas fa-ruler-combined mr-1 sm:mr-1.5" /> {{ property.area }} m²</span>
            </div>
            
            <a
              :href="'/propertydetail/' + property.id"
              class="inline-block w-full text-center py-1.5 sm:py-2 px-3 sm:px-4 bg-blue-500 hover:bg-blue-600 rounded text-xs sm:text-sm font-bold text-white transition duration-300 ease-in-out"
            >
              View Details
            </a>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import homeIcon from '@/assets/home.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
  properties: {
    type: Array,
    required: true
  },
  initialCenter: {
    type: Array,
    default: () => [10.7769, 106.7009] 
  },
  initialZoom: {
    type: Number,
    default: 13
  }
});

const zoom = ref(props.initialZoom);
const mapCenter = ref(props.initialCenter);
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const geoProperties = ref([]);

const customIcon = computed(() => {
  return L.icon({
    iconUrl: homeIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
});

const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`);
  const data = await response.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

watch(() => props.properties, async (newProperties) => {
  geoProperties.value = [];
  for (const property of newProperties) {
    const latLng = await geocodeAddress(property.address);
    if (latLng) {
      geoProperties.value.push({ ...property, latLng });
    }
  }
  
  if (geoProperties.value.length > 0) {
    mapCenter.value = geoProperties.value[0].latLng;
  }
}, { immediate: true });
</script>