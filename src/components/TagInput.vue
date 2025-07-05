<template>
  <div class="relative group">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <i class="fas fa-tags text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
    </div>
    <div class="flex flex-wrap items-center gap-2 w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus-within:border-blue-500 transition duration-300 bg-transparent">
      <div
        v-for="(tag, index) in tagsArray"
        :key="index"
        class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
      >
        {{ tag }}
        <button
          class="text-xs text-blue-500 hover:text-red-500 transition duration-300"
          @click="removeTag(index)"
        >
          <i class="fas fa-times" />
        </button>
      </div>
      <input
        v-model="inputValue"
        placeholder="Add keywords"
        class="outline-none flex-grow bg-transparent text-sm"
        @keydown.enter.prevent="addTag"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref('');
const tagsArray = ref(props.modelValue.split(',').map(tag => tag.trim()).filter(Boolean));

watch(() => props.modelValue, (newVal) => {
  tagsArray.value = newVal.split(',').map(tag => tag.trim()).filter(Boolean);
});

const addTag = () => {
  const trimmedValue = inputValue.value.trim();
  if (trimmedValue && !tagsArray.value.includes(trimmedValue)) {
    tagsArray.value.push(trimmedValue);
    updateTags();
  }
  inputValue.value = '';
};

const removeTag = (index) => {
  tagsArray.value.splice(index, 1);
  updateTags();
};

const updateTags = () => {
  emit('update:modelValue', tagsArray.value.join(', '));
};
</script>