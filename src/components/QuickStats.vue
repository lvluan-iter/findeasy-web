<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
    <div
      v-for="stat in quickStats"
      :key="stat.name"
      class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div class="px-6 py-8">
        <dt class="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {{ stat.name }}
        </dt>
        <dd class="mt-2 text-4xl font-bold text-gray-900">
          {{ stat.value }}
        </dd>
        <p
          class="mt-3 text-sm font-medium flex items-center"
          :class="getChangeClass(stat.change)"
        >
          <span class="flex items-center">
            <i 
              :class="getChangeIcon(stat.change)"
              class="mr-1"
            />
            {{ Math.abs(stat.change) }}%
          </span>
          <span class="text-gray-500 ml-1.5"> vs last month</span>
        </p>
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
const quickStats = ref([])

const fetchQuickStats = async () => {
  if (!user.value) return

  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/quick-stats/${user.value.id}`)
    const data = await response.json()
    quickStats.value = [
      { name: 'Total Properties', value: data.totalProperties, change: data.propertiesGrowth },
      { name: 'Total Requests', value: data.totalRequests, change: data.requestsGrowth },
      { name: 'Total Views', value: data.totalViews, change: data.viewsGrowth },
      { name: 'Total Favorites', value: data.totalFavorites, change: data.favoritesGrowth}
    ]
  } catch (error) {
    console.error('Error fetching quick stats:', error)
  }
}

const getChangeClass = (change) => 
  change >= 0 ? 'text-green-600' : 'text-red-600'

const getChangeIcon = (change) => 
  change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'

watch(user, fetchQuickStats, { immediate: true })

onMounted(fetchQuickStats)
</script>