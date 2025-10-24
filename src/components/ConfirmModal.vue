<template>
  <Teleport to="body">
    <div v-if="isShow" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/50" @click="close" />

      <div class="relative bg-white rounded-lg shadow-lg w-full max-w-md">
        <div class="p-6 space-y-4">
          <h3 class="text-lg font-medium">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ message }}
          </p>
          <div class="flex justify-end gap-3">
            <button class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" @click="close">
              {{ cancelText }}
            </button>
            <button
              class="px-4 py-2 text-sm text-white rounded-md"
              :class="[type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600']"
              @click="confirm"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {ref} from 'vue';

const isShow = ref(false);
const resolvePromise = ref(null);

defineProps({
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: 'Xác nhận'
  },
  cancelText: {
    type: String,
    default: 'Hủy'
  },
  type: {
    type: String,
    default: 'primary'
  }
});

const confirm = () => {
  isShow.value = false;
  resolvePromise.value?.(true);
};

const close = () => {
  isShow.value = false;
  resolvePromise.value?.(false);
};

const showModal = () => {
  isShow.value = true;
  return new Promise((resolve) => {
    resolvePromise.value = resolve;
  });
};

defineExpose({showModal});
</script>
