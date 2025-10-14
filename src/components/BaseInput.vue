<template>
  <div class="form-group relative mb-6 text-left animate-fade-in-up">
    <label
      :for="id"
      :class="{active: modelValue?.length > 0 || isFocused}"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue';

defineProps({
  id: String,
  // eslint-disable-next-line vue/require-default-prop
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  // eslint-disable-next-line vue/require-default-prop
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/require-default-prop
  modelValue: String
});

defineEmits(['update:modelValue']);

const isFocused = ref(false);
</script>

<style scoped>
.form-group label.active {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #6e8efb;
}
</style>
