<template>
  <transition name="toast">
    <div v-if="visible" class="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div
        :class="[
          'relative min-w-[260px] max-w-[420px] px-4 py-3 rounded-2xl shadow-lg border flex items-center gap-3 text-sm font-medium pointer-events-auto bg-white',
          borderClass,
          textClass
        ]"
      >
        <i :class="['text-lg', iconClass]"></i>
        <div class="flex-1 text-left">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref, watchEffect, computed} from 'vue';

const props = defineProps({
  message: String,
  type: {type: String, default: 'info'},
  duration: {type: Number, default: 4000}
});

const visible = ref(true);

watchEffect(() => {
  if (visible.value) {
    setTimeout(() => (visible.value = false), props.duration);
  }
});

const borderClass = computed(
  () =>
    ({
      success: 'border-green-500/30',
      error: 'border-red-500/30',
      warning: 'border-amber-500/30',
      info: 'border-sky-500/30'
    })[props.type] || 'border-sky-500/30'
);

const textClass = computed(
  () =>
    ({
      success: 'text-green-600',
      error: 'text-red-600',
      warning: 'text-amber-600',
      info: 'text-sky-600'
    })[props.type] || 'text-sky-600'
);

const iconClass = computed(
  () =>
    ({
      success: 'fa-solid fa-circle-check text-green-500',
      error: 'fa-solid fa-circle-xmark text-red-500',
      warning: 'fa-solid fa-triangle-exclamation text-amber-500',
      info: 'fa-solid fa-circle-info text-sky-500'
    })[props.type] || 'fa-solid fa-circle-info text-sky-500'
);
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.96);
}
</style>
