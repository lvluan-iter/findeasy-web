<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-show="showButton"
      class="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[rgb(10,115,192)] bg-opacity-20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 z-50"
      aria-label="Cuộn lên đầu trang"
      @click="scrollToTop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const showButton = ref(false);

const checkScroll = () => {
  showButton.value = window.pageYOffset > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>
