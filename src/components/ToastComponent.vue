<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] min-w-[250px] px-4 py-3 rounded-2xl shadow-lg text-white text-center font-semibold',
        typeClass
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import {ref, watchEffect, computed} from 'vue';

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const visible = ref(true);

watchEffect(() => {
  if (visible.value) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
});

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-blue-500';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
