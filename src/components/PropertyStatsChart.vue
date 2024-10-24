<template>
  <div class="bg-white shadow rounded-lg p-4 sm:p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">
      Property Details
    </h3>
    <div class="mb-4">
      <label
        for="month-picker"
        class="block text-sm font-medium text-gray-700"
      >Select Month:</label>
      <input 
        id="month-picker"
        v-model="selectedMonth" 
        type="month" 
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>
    <div
      ref="chartContainer" 
      class="chart-container"
    >
      <v-chart
        v-if="!loading && statsData.length > 0"
        class="chart"
        :option="chartOption"
        :autoresize="true"
      />
      <div
        v-else-if="!loading && statsData.length === 0"
        class="flex items-center justify-center h-full"
      >
        <p>No data available for the selected month.</p>
      </div>
      <div
        v-else
        class="flex items-center justify-center h-full"
      >
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const statsData = ref([])
const loading = ref(true)
const error = ref(null)
const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const chartContainer = ref(null)

const fetchData = async () => {
  if (!user.value?.id) {
    error.value = 'User not logged in'
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/stats/${user.value.id}?yearMonth=${selectedMonth.value}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    statsData.value = data
  } catch (err) {
    console.error('Error fetching property stats:', err)
    error.value = 'Failed to fetch data. Please try again.'
  } finally {
    loading.value = false
  }
}

const chartOption = computed(() => ({
  grid: {
    top: '10%',
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: statsData.value.map(item => item.propertyId),
    name: 'Property ID',
    nameLocation: 'middle',
    nameGap: 25,
    axisLabel: {
      rotate: 0,
      interval: 0
    }
  },
  yAxis: {
    type: 'value',
    name: 'Count',
    nameLocation: 'middle',
    nameGap: 40
  },
  series: [
    {
      name: 'Views',
      type: 'bar',
      data: statsData.value.map(item => item.views),
      color: '#8884d8'
    },
    {
      name: 'Likes',
      type: 'bar',
      data: statsData.value.map(item => item.likes),
      color: '#82ca9d'
    },
    {
      name: 'Requests',
      type: 'bar',
      data: statsData.value.map(item => item.requests),
      color: '#ffc658'
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Views', 'Likes', 'Requests'] 
  }
}))

watch([user, selectedMonth], () => {
  if (user.value?.id) {
    fetchData()
  }
}, { immediate: true })

onMounted(() => {
  if (user.value?.id) {
    fetchData()
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 50vh;
  min-height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 640px) {
  .chart-container {
    height: 60vh;
  }
}
</style>