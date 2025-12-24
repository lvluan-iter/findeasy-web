<template>
  <div>
    <div class="flex flex-wrap items-center gap-4">
      <button
        class="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2 transition duration-300"
        @click="$router.go(-1)"
      >
        <i class="fas fa-angle-left" />
        <span>Quay lại</span>
      </button>
      <div class="hidden sm:block w-px h-6 bg-gray-300" />
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
        {{ title }}
      </h1>
    </div>
    <hr class="w-full mb-5" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>
