<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="w-12 h-12 flex items-center justify-center text-2xl bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
          <i class="fas fa-building" />
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Total Properties
          </p>
          <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {{ isLoading || !quickStats[0] ? '-' : quickStats[0].value }}
          </p>
        </div>
      </div>
      <div class="text-sm">
        <span
          v-if="quickStats[0]"
          :class="quickStats[0]?.change >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          <i :class="[quickStats[0].change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down', 'mr-1']" />
          {{ Math.abs(quickStats[0].change) }}%
        </span>
        <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="w-12 h-12 flex items-center justify-center text-2xl bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
          <i class="fas fa-users" />
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Total Requests
          </p>
          <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {{ isLoading || !quickStats[1] ? '-' : quickStats[1].value }}
          </p>
        </div>
      </div>
      <div class="text-sm">
        <span
          v-if="quickStats[1]"
          :class="quickStats[1]?.change >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          <i :class="[quickStats[1].change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down', 'mr-1']" />
          {{ Math.abs(quickStats[1].change) }}%
        </span>
        <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
          <i class="fas fa-eye" />
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Total Views
          </p>
          <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {{ isLoading || !quickStats[2] ? '-' : formatNumber(quickStats[2].value) }}
          </p>
        </div>
      </div>
      <div class="text-sm">
        <span
          v-if="quickStats[2]"
          :class="quickStats[2]?.change >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          <i :class="[quickStats[2].change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down', 'mr-1']" />
          {{ Math.abs(quickStats[2].change) }}%
        </span>
        <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="w-12 h-12 flex items-center justify-center text-2xl bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-400">
          <i class="fas fa-heart" />
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Total Favorites
          </p>
          <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {{ isLoading || !quickStats[3] ? '-' : quickStats[3].value }}
          </p>
        </div>
      </div>
      <div class="text-sm">
        <span
          v-if="quickStats[3]"
          :class="quickStats[3]?.change >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          <i :class="[quickStats[3].change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down', 'mr-1']" />
          {{ Math.abs(quickStats[3].change) }}%
        </span>
        <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isLoading = ref(true)
const quickStats = ref([])

const formatNumber = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value)
}

const fetchQuickStats = async () => {
  if (!user.value) return
  
  isLoading.value = true
  quickStats.value = []
  
  try {
    const response = await fetch(
      `https://roombooking-fa3a.onrender.com/api/properties/quick-stats/${user.value.id}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch quick stats')
    }

    const data = await response.json()
    quickStats.value = [
      { name: 'Total Properties', value: data.totalProperties, change: data.propertiesGrowth },
      { name: 'Total Requests', value: data.totalRequests, change: data.requestsGrowth },
      { name: 'Total Views', value: data.totalViews, change: data.viewsGrowth },
      { name: 'Total Favorites', value: data.totalFavorites, change: data.favoritesGrowth }
    ]
  } catch (error) {
    console.error('Error fetching quick stats:', error)
  } finally {
    isLoading.value = false
  }
}

watch(user, fetchQuickStats, { immediate: true })
onMounted(fetchQuickStats)
</script>