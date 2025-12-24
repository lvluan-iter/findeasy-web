<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="text-center p-8 bg-white rounded-lg shadow-md">
      <div v-if="statusIcon" class="text-5xl mb-4" :class="statusIcon.color">
        {{ statusIcon.icon }}
      </div>
      <h1 class="text-2xl font-bold mb-2">
        {{ title }}
      </h1>
      <p class="text-gray-600 mb-4">
        {{ message }}
      </p>
      <router-link
        to="/"
        class="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Quay về trang chủ
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const currentStatus = computed(() => route.query.status || 'error');

const statusConfig = {
  success: {
    icon: '✅',
    color: 'text-green-500',
    title: 'Thanh toán thành công!',
    message: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.'
  },
  error: {
    icon: '❌',
    color: 'text-red-500',
    title: 'Thanh toán thất bại',
    message: 'Rất tiếc, giao dịch của bạn không thành công.'
  },
  'system-error': {
    icon: '❌',
    color: 'text-red-500',
    title: 'Lỗi hệ thống',
    message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
  }
};

const statusIcon = computed(() => {
  const status = currentStatus.value;
  if (!status || !statusConfig[status]) return null;
  return {
    icon: statusConfig[status].icon,
    color: statusConfig[status].color
  };
});

const title = computed(() => {
  const status = currentStatus.value;
  return statusConfig[status]?.title || 'Đã có lỗi xảy ra';
});

const message = computed(() => {
  const status = currentStatus.value;
  return statusConfig[status]?.message || 'Vui lòng thử lại sau';
});
</script>
