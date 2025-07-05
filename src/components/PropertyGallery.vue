<template>
  <div class="py-[60px] bg-[#212529]">
    <div class="mb-14 px-4 sm:px-6 md:px-8 lg:px-[120px]">
      <div class="inline-block px-[30px] py-[10px] bg-white rounded-full text-[rgb(10,115,192)] mb-2.5">
        <span>Property Gallery</span>
      </div>
      <p class="font-bold text-[calc(1.375rem+1.5vw)] text-white m-0 mb-2">
        See Our Property Gallery
      </p>
      <span class="text-white">Our guests always enjoy unique stays around the world.<br>
        Tag @FindEasy on Instagram for a chance to be featured!</span>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 items-center px-3">
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        class="relative rounded-xl overflow-hidden cursor-pointer"
        :class="getImageClass(index)"
        @click="openLightbox(index)"
      >
        <img
          :src="image.url"
          class="w-full h-full object-cover"
          :alt="`Gallery image ${index + 1}`"
        >
        <div
          v-if="index === 5 && imageCount > 6"
          class="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-2xl"
        >
          +{{ imageCount - 6 }} Images
        </div>
      </div>
    </div>
    
    <!-- Lightbox -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
    >
      <button
        class="absolute top-4 right-4 text-white text-4xl"
        @click="closeLightbox"
      >
        &times;
      </button>
      <button
        class="absolute left-4 text-white text-4xl"
        @click="prevImage"
      >
        <i class="fa-solid fa-angles-left" />
      </button>
      <button
        class="absolute right-4 text-white text-4xl"
        @click="nextImage"
      >
        <i class="fa-solid fa-angles-right" />
      </button>
      <img
        :src="currentLightboxImage"
        class="max-w-full max-h-full object-contain"
        :alt="`Full size gallery image ${currentImageIndex + 1}`"
      >
      <div class="absolute bottom-4 left-0 right-0 text-center text-white">
        {{ currentImageIndex + 1 }} / {{ imageCount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

const lightboxOpen = ref(false);
const currentImageIndex = ref(0);

const displayedImages = computed(() => {
  return props.images.slice(0, 6).map(url => ({ url }));
});

const imageCount = computed(() => {
  return props.images.length;
});

const currentLightboxImage = computed(() => {
  return props.images[currentImageIndex.value];
});

const getImageClass = (index) => {
  return index % 2 === 0 ? 'h-[260px]' : 'h-[160px]';
};

const openLightbox = (index) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
};

const closeLightbox = () => {
  lightboxOpen.value = false;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % imageCount.value;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + imageCount.value) % imageCount.value;
};
</script>