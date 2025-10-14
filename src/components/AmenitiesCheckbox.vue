<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <div
      v-for="feature in features"
      :key="feature.id"
      class="flex items-center"
    >
      <input
        :id="'feature-' + feature.id"
        v-model="selectedFeatures"
        :value="feature"
        type="checkbox"
        class="hidden"
      >
      <label
        :for="'feature-' + feature.id"
        class="flex items-center cursor-pointer"
      >
        <span
          class="w-5 h-5 inline-block mr-2 rounded border border-gray-300 flex-shrink-0 transition-colors duration-200 ease-in-out relative"
          :class="{ 'bg-blue-500 border-blue-500': isSelected(feature) }"
        >
          <i
            :class="{ 'fas fa-check text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2': isSelected(feature) }"
          />
        </span>
        <span class="text-sm text-gray-700">{{ feature.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, getCurrentInstance } from 'vue';
import { Endpoint } from '@/constants/Endpoint';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);
const { proxy } = getCurrentInstance();

const features = ref([]);
const selectedFeatures = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const isSelected = (feature) => selectedFeatures.value.some(f => f.id === feature.id);

const fetchAmenities = async () => {
  try {
    const response = await proxy.$http.get(Endpoint.getAmenities);
    if (response.success) {
      features.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch amenities:', error);
  }
};

onMounted(fetchAmenities);

watch(selectedFeatures, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>