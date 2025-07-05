<template>
  <div class="flex flex-col items-start px-4 md:px-12 lg:px-20 lg:py-12 xl:px-32 py-5">
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
        Trang cá nhân
      </h1>
    </div>
    <hr class="w-full mb-5">
    <div class="w-full max-w-4xl mx-auto">
      <div class="bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl rounded-3xl overflow-hidden">
        <div class="relative">
          <div class="absolute inset-0 bg-indigo-100 opacity-50">
            <svg
              class="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 80 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0h80v80H0z"
                fill="#667eea"
                fill-opacity=".1"
              />
              <path
                d="M80 0L0 80M80 80L0 0"
                stroke="#667eea"
                stroke-width="1"
                stroke-opacity=".1"
              />
            </svg>
          </div>
        
          <div class="relative z-10 flex flex-col md:flex-row">
            <!-- Image Section -->
            <div class="w-full md:w-1/3 relative">
              <div class="aspect-square overflow-hidden">
                <img
                  :src="user.avatar"
                  :alt="user.fullname"
                  class="w-full h-full object-cover object-center transform hover:scale-105 transition duration-300"
                >
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h1 class="text-3xl font-bold leading-tight">
                  {{ user.fullname }}
                </h1>
                <p class="text-xl font-medium text-indigo-200">
                  {{ String(user.roles) }}
                </p>
              </div>
            </div>
          
            <!-- Content Section -->
            <div class="w-full md:w-2/3 p-8 flex flex-col justify-between bg-white bg-opacity-90 backdrop-blur-sm">
              <div>
                <p class="text-gray-600 text-lg mb-6 font-light italic">
                  {{ user.description }}
                </p>
              
                <!-- Stats -->
                <div class="grid grid-cols-3 gap-6 mb-8">
                  <div
                    v-for="(stat, index) in stats"
                    :key="index"
                    class="text-center p-4 bg-indigo-50 rounded-xl"
                  >
                    <div class="text-2xl font-bold text-indigo-600">
                      {{ stat.value }}
                    </div>
                    <div class="text-sm text-indigo-400 font-medium">
                      {{ stat.label }}
                    </div>
                  </div>
                </div>
              
                <!-- Action Buttons -->
                <div class="flex space-x-4 mb-8">
                  <button
                    v-for="(action, index) in actions"
                    :key="index"
                    class="flex-1 py-3 px-4 rounded-full text-white text-sm font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :class="action.bgClass"
                  >
                    <i
                      :class="action.icon"
                      class="mr-2"
                    />
                    {{ action.label }}
                  </button>
                </div>
              </div>
            
              <div class="border-t border-gray-200 pt-6">
                <dl class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div
                    v-for="(detail, index) in details"
                    :key="index"
                    class="flex items-center"
                  >
                    <dt class="text-indigo-500 mr-2">
                      <i :class="detail.icon" />
                    </dt>
                    <dd class="text-gray-700 font-medium">
                      {{ detail.value }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  propertyCount: {
    type: Number,
    required: true
  }
});

const stats = computed(() => [
  { label: 'Properties', value: props.propertyCount || '0' },
  { label: 'Client Satisfaction', value: props.user.clientSatisfaction || '0%' },
  { label: 'Years Experience', value: props.user.yearsExperience || '0' },
]);

const actions = [
  { label: 'Chat Me', bgClass: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500', icon: 'fas fa-message' },
  { label: 'Email Me', bgClass: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500', icon: 'fas fa-envelope' },
  { label: 'View Portfolio', bgClass: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500', icon: 'fas fa-briefcase' },
];

const details = computed(() => [
  { label: 'Specialization', value: props.user.specialization || 'Not specified', icon: 'fas fa-star text-lg' },
  { label: 'Location', value: props.user.location || 'Not specified', icon: 'fas fa-map-marker-alt text-lg' },
  { label: 'Languages', value: props.user.languages || 'Not specified', icon: 'fas fa-language text-lg' },
  { label: 'Awards', value: props.user.awards || 'Not specified', icon: 'fas fa-award text-lg' },
]);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}

body, p, div {
  font-family: 'Poppins', sans-serif;
}
</style>