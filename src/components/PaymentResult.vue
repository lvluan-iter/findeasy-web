<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="text-center p-8 bg-white rounded-lg shadow-md">
      <div 
        class="text-5xl mb-4" 
        :class="statusIcon.color"
      >
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
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error', 'system-error'].includes(value)
  }
})

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
}

const statusIcon = computed(() => ({
  icon: statusConfig[props.status].icon,
  color: statusConfig[props.status].color
}))

const title = computed(() => statusConfig[props.status].title)
const message = computed(() => statusConfig[props.status].message)
</script>