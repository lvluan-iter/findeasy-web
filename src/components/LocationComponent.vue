<template>
  <div class="bg-gray-900 p-6 h-[100vh] lg:h-[90vh]">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      <!-- Info Section -->
      <div class="bg-gray-800 p-6 rounded-lg flex flex-col">
        <div class="w-12 h-1 bg-[#0A73C0] mb-4" />
        <h2 class="text-2xl text-white font-bold mb-4">
          Khám Phá
        </h2>
        <p class="text-gray-400 mb-6 text-sm">
          Tìm kiếm nơi an cư lý tưởng hoặc cơ hội đầu tư bất động sản với chúng tôi. 
          Khám phá các thành phố tốt nhất để thuê hoặc mua nhà, đáp ứng mọi nhu cầu sống và kinh doanh của bạn.
        </p>
        <button class="bg-black text-white px-6 py-3 hover:bg-gray-700 transition duration-300 text-sm flex items-center">
          Xem Tất Cả
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div class="mt-auto">
          <img
            src="@/assets/images/map.png"
            alt="Map"
            class="hidden lg:block w-full h-auto opacity-50"
          >
          <div class="flex justify-center mt-4">
            <span class="w-2 h-2 bg-[#0A73C0] rounded-full mx-1" />
            <span class="w-2 h-2 bg-gray-600 rounded-full mx-1" />
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="lg:col-span-3 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <div class="bg-blue-500/10 rounded-full p-6 mb-6 animate-pulse">
          <svg
            class="w-16 h-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          Đang tải dữ liệu...
        </h3>
        <p class="text-gray-400 mb-6 max-w-md">
          Vui lòng đợi trong giây lát trong khi chúng tôi tải thông tin địa điểm.
        </p>
      </div>

      <div
        v-else-if="cities.length === 0"
        class="lg:col-span-3 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <div class="bg-gray-800 rounded-full p-6 mb-6">
          <svg
            class="w-16 h-16 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          Không có dữ liệu thành phố
        </h3>
        <p class="text-gray-400 mb-6 max-w-md">
          Hiện tại chưa có thông tin về các thành phố. Vui lòng thử lại sau.
        </p>
      </div>
      <div
        v-else
        class="lg:col-span-3 h-full relative overflow-hidden"
      >
        <swiper
          :slides-per-view="slidesPerView"
          :space-between="24"
          :loop="true"
          :modules="[Navigation]"
          :navigation="true"
          class="h-full"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <swiper-slide
            v-for="(city, index) in cities"
            :key="index"
            class="h-full"
          >
            <div
              class="relative rounded-lg overflow-hidden h-full transition-all duration-300 no-copy"
              :class="{'opacity-50': !isActiveOrNext(index)}"
            >
              <img
                :src="city.url"
                :alt="city.name"
                class="w-full h-full object-cover"
              >
              <div
                v-if="isActiveOrNext(index)"
                class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"
              />
              <div
                v-if="isActiveOrNext(index)"
                class="absolute bottom-0 left-0 p-6 text-white"
              >
                <span class="bg-[#0A73C0] text-xs px-4 py-2 rounded shadow-[0_0_0_4px_rgba(255,255,255,.2)] mb-3 inline-block">
                  {{ city.count }} PROPERTIES
                </span>
                <h3 class="text-xl font-bold mb-2">
                  {{ city.name }}
                </h3>
                <p class="text-sm mb-2">
                  {{ city.description }}
                </p>
                <div class="w-12 h-[1px] bg-[#0A73C0]" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const cities = ref([]);
const isLoading = ref(true);
const activeIndex = ref(0);
const windowWidth = ref(window.innerWidth);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/location`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    cities.value = await response.json();
  } catch (error) {
    console.error('Error:', error);
    cities.value = [];
  } finally {
    isLoading.value = false;
  }
};

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const isActiveOrNext = (index) => {
  const nextIndex = (activeIndex.value + 1) % cities.value.length;
  return index === activeIndex.value || index === nextIndex;
};

const slidesPerView = computed(() => {
  if (windowWidth.value < 640) return 1;
  if (windowWidth.value < 1024) return 2;
  return 3;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  fetchData();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
}

:deep(.swiper-button-next) {
  right: 10px;
}

:deep(.swiper-button-prev) {
  left: 10px;
}

.swiper-slide {
  transition: opacity 0.3s ease;
}

.no-copy {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
}

.no-copy img {
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>