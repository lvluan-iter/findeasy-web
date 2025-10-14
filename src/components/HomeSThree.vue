<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px]">
    <div class="text-center mb-[50px]">
      <div class="inline-block p-2.5 px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2.5">
        <span>Bất Động Sản Nổi Bật</span>
      </div>
      <h1 class="font-bold text-[calc(1.25rem+1.2vw)] sm:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-4 sm:mb-5">
        Khám Phá Bất Động Sản Hàng Đầu
      </h1>
      <span class="description-text text-sm sm:text-base">
        Tìm kiếm những bất động sản tốt nhất đang có trên thị trường. 
        Từ những ngôi nhà sang trọng đến các không gian thương mại đắc địa, danh sách nổi bật của chúng tôi mang đến cơ hội tuyệt vời cho người mua và nhà đầu tư. 
        Duyệt qua những lựa chọn hàng đầu và tìm kiếm bất động sản lý tưởng của bạn ngay hôm nay.
      </span>
    </div>

    <div 
      v-if="loading" 
      class="flex flex-col items-center justify-center py-12"
    >
      <div class="bg-blue-50 rounded-full p-6 mb-6 animate-pulse">
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Đang tải danh sách bất động sản...
      </h3>
      <p class="text-gray-500 max-w-md text-center">
        Vui lòng đợi trong giây lát trong khi chúng tôi tải những bất động sản nổi bật nhất.
      </p>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div class="aspect-video bg-gray-200 animate-pulse" />
          <div class="p-5 space-y-4">
            <div class="space-y-2">
              <div class="h-6 bg-gray-200 rounded animate-pulse" />
              <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
            <div class="pt-2 border-t">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12"
    >
      <div class="bg-red-50 rounded-full p-6 mb-6">
        <svg
          class="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Đã có lỗi xảy ra
      </h3>
      <p class="text-gray-500 max-w-md text-center mb-6">
        Không thể tải danh sách bất động sản. Vui lòng thử lại sau.
      </p>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="fetchProperties()"
      >
        Thử lại
      </button>
    </div>

    <div 
      v-else-if="properties.length === 0" 
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div class="bg-gray-100 rounded-full p-6 mb-6">
        <svg
          class="w-16 h-16 text-gray-400"
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
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Chưa có bất động sản nào
      </h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Hiện tại chưa có bất động sản nổi bật nào. Vui lòng quay lại sau.
      </p>
    </div>

    <template v-else>
      <AvaibleProperty 
        :properties="properties"
        :current-page="currentPage"
        :total-pages="totalPages"
        :show-pagination="true"
        :loading="loading"
        @change-page="handlePageChange"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { Endpoint } from '@/constants/Endpoint';
import AvaibleProperty from './AvaibleProperty.vue';

const { proxy } = getCurrentInstance();
const properties = ref([]);
const totalPages = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const loading = ref(false);
const error = ref(null);

const fetchProperties = async (page = currentPage.value) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await proxy.$http.get(
      `${Endpoint.getAvailableProperties}?page=${page}&size=${pageSize.value}`
    );
    if (response.success) {
      properties.value = response.data.content;
      totalPages.value = response.data.totalPages;
      currentPage.value = page;
    } else {
      throw new Error(`Failed to fetch properties`);
    }
  } catch (err) {
    console.error('Error fetching properties:', err);
    error.value = err.message;
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500); 
  }
};

const handlePageChange = (newPage) => {
  fetchProperties(newPage);
};

onMounted(() => {
  fetchProperties();
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>