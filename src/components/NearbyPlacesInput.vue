<template>
  <div class="space-y-4">
    <div v-for="(place, index) in modelValue" :key="index" class="flex items-center space-x-4">
      <div class="flex-grow">
        <input
          v-model="place.name"
          type="text"
          :placeholder="'Place name (e.g., University, Market)'"
          class="block w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
          @input="updateModelValue"
        />
      </div>
      <div class="w-24">
        <input
          v-model.number="place.distance"
          type="number"
          min="0"
          step="0.1"
          :placeholder="'Distance'"
          class="block w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
          @input="updateModelValue"
        />
      </div>
      <div class="w-24">
        <select
          v-model="place.unit"
          class="block w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
          @change="updateModelValue"
        >
          <option value="km">km</option>
          <option value="m">m</option>
        </select>
      </div>
      <button type="button" class="text-red-500 hover:text-red-700 transition duration-300" @click="removePlace(index)">
        <i class="fas fa-trash-alt" />
      </button>
    </div>
    <button
      type="button"
      class="mt-2 px-4 py-2 border border-blue-500 rounded-md text-sm font-medium text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
      @click="addPlace"
    >
      <i class="fas fa-plus mr-2" /> Add Nearby Place
    </button>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const addPlace = () => {
  const updatedPlaces = [...props.modelValue, {name: '', distance: null, unit: 'km'}];
  emit('update:modelValue', updatedPlaces);
};

const removePlace = (index) => {
  const updatedPlaces = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedPlaces);
};

const updateModelValue = () => {
  emit('update:modelValue', props.modelValue);
};
</script>
