<template>
  <div class="relative w-full sm:w-[calc(50%-0.5rem)] md:w-auto">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      class="w-full md:w-56 lg:w-64 h-12 px-4 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
      required
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <label
      :for="id"
      :class="{'transform -translate-y-8 scale-75': modelValue.length > 0 || isFocused}"
      class="absolute left-4 top-3 text-white transition-all duration-300 pointer-events-none"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import {ref} from 'vue';

defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String
});

defineEmits(['update:modelValue']);

const isFocused = ref(false);
</script>
