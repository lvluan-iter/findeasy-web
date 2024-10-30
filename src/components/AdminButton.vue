<template>
  <div
    v-if="canAccessAdmin"
    class="fixed right-6 bottom-20 z-50 flex flex-col gap-2"
  >
    <router-link
      to="/admin"
      class="admin-float-btn group flex flex-col items-center justify-center bg-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
      @mouseenter="showTooltip"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle
          cx="9"
          cy="7"
          r="4"
        />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      
      <div 
        :class="[
          'tooltip-box',
          { 'show-tooltip': isTooltipVisible || shouldShowPeriodicTooltip }
        ]"
      >
        <div class="relative">
          <div class="bg-gray-800 text-white text-sm py-2 px-3 rounded-lg shadow-xl">
            <p class="whitespace-nowrap font-medium">
              Quản trị viên
            </p>
          </div>
          <div class="absolute -right-[6px] top-1/2 -translate-y-1/2 transform rotate-45 w-3 h-3 bg-gray-800" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()

const isTooltipVisible = ref(false)
const shouldShowPeriodicTooltip = ref(false)
let tooltipTimer = null
let periodicTimer = null

const canAccessAdmin = computed(() => {
  return userStore.user?.roles?.some(role => 
    role.toLowerCase() === 'admin' || role.toLowerCase() === 'owner'
  ) ?? false
})

const showTooltip = () => {
  isTooltipVisible.value = true
  if (tooltipTimer) clearTimeout(tooltipTimer)
  tooltipTimer = setTimeout(() => {
    isTooltipVisible.value = false
  }, 2000)
}

const startPeriodicTooltip = () => {
  periodicTimer = setInterval(() => {
    shouldShowPeriodicTooltip.value = true
    setTimeout(() => {
      shouldShowPeriodicTooltip.value = false
    }, 2000)
  }, 300000)
}

onMounted(() => {
  startPeriodicTooltip()
})

onBeforeUnmount(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  if (periodicTimer) clearInterval(periodicTimer)
})
</script>

<style scoped>
.admin-float-btn {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.admin-float-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px;
}

.tooltip-box {
  position: absolute;
  right: full;
  right: calc(100% + 10px);
  opacity: 0;
  visibility: hidden;
  transform: translateX(10px);
  transition: all 0.3s ease-in-out;
}

.tooltip-box.show-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translateX(10px); }
  20%, 80% { opacity: 1; transform: translateX(0); }
}

.show-periodic {
  animation: fadeInOut 2s ease-in-out;
}
</style>