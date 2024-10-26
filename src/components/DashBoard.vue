<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="px-4 sm:px-6 md:px-12 lg:px-[120px] py-12">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Xin chào, {{ user?.fullname }}
          </h1>
          <p class="mt-1 text-sm text-gray-600">
            Đây là tổng quan về bất động sản của bạn {{ currentDate }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-xl font-semibold text-gray-700">
            {{ currentTime }}
          </p>
          <p class="text-sm text-gray-500">
            {{ currentDay }}
          </p>
        </div>
      </div>
  
      <QuickStats />
  
      <div class="mb-8">
        <div class="bg-white shadow rounded-lg p-6">
          <PropertyStatsChart />
        </div>     
      </div>
  
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Vị Trí
        </h3>
        <div class="w-full h-48 sm:h-64 md:h-96 lg:h-[32rem]">
          <MapView :properties="properties" />
        </div>
      </div>
  
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Bất động sản của bạn
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
                <th class="relative px-6 py-3">
                  <span class="sr-only">Sửa tin</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="property in properties"
                :key="property.id"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="property.imageUrls[0]"
                        alt=""
                      >
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ property.title }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ property.address }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      property.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
                  >
                    {{ property.available ? 'Hoạt động' : 'Ẩn' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ property.type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ property.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href="#"
                    class="text-blue-600 hover:text-blue-900"
                  >Sửa tin</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Lịch hẹn sắp tới
        </h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày & Giờ
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bất động sản
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="appointment in appointments"
                :key="appointment.id"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ appointment.dateTime }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ appointment.property }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ appointment.client }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ appointment.type }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Hoạt động gần đây
            </h3>
          </div>
          <ul class="divide-y divide-gray-200">
            <li
              v-for="activity in recentActivities"
              :key="activity.id"
              class="px-4 py-4 sm:px-6"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <span
                    class="inline-flex items-center justify-center h-8 w-8 rounded-full"
                    :class="activity.iconBackground"
                  >
                    <i :class="['fas', activity.icon, 'text-white']" />
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ activity.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ activity.time }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Thông báo
            </h3>
          </div>
          <ul class="divide-y divide-gray-200">
            <li
              v-for="notification in notifications"
              :key="notification.id"
              class="px-4 py-4 sm:px-6"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <span
                    class="inline-flex items-center justify-center h-8 w-8 rounded-full"
                    :class="notification.iconBackground"
                  >
                    <i :class="['fas', notification.icon, 'text-white']" />
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ notification.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ notification.description }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Hành động nhanh
        </h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            v-for="action in quickActions" 
            :key="action.name" 
            class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            @click="router.push(action.url)"
          >
            <i :class="['fas', action.icon, 'text-gray-600 text-2xl']" />
            <span class="mt-2 text-sm font-medium text-gray-900">{{ action.name }}</span>
          </button>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Performance Metrics
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-2">
              Average Days on Market
            </h4>
            <p class="text-3xl font-bold text-blue-600">
              32 days
            </p>
          </div>
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-2">
              Closing Rate
            </h4>
            <p class="text-3xl font-bold text-green-600">
              68%
            </p>
          </div>
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-2">
              Customer Satisfaction
            </h4>
            <p class="text-3xl font-bold text-yellow-600">
              4.8/5
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import QuickStats from './QuickStats.vue';
import PropertyStatsChart from './PropertyStatsChart.vue';
import MapView from './MapView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const currentDate = ref('')
const currentTime = ref('')
const currentDay = ref('')
const properties = ref([])

const tableHeaders = ['Bất động sản', 'Trạng thái', 'Loại', 'Giá', '']

const appointments = ref([
  { id: 1, dateTime: '2023-06-10 14:00', property: 'Oceanfront Villa', client: 'Alice Johnson', type: 'Viewing' },
  { id: 2, dateTime: '2023-06-11 10:30', property: 'Downtown Apartment', client: 'Bob Smith', type: 'Inspection' },
])

const recentActivities = ref([
  { id: 1, title: 'New viewing request for Oceanfront Villa', time: '1 hour ago', icon: 'fa-eye', iconBackground: 'bg-blue-500' },
  { id: 2, title: 'Payment received for Downtown Apartment', time: '3 hours ago', icon: 'fa-dollar-sign', iconBackground: 'bg-green-500' },
])

const notifications = ref([
  { id: 1, title: 'New message from potential buyer', description: 'Regarding Oceanfront Villa', icon: 'fa-bell', iconBackground: 'bg-yellow-500' },
  { id: 2, title: 'Maintenance request', description: 'For Downtown Apartment', icon: 'fa-home', iconBackground: 'bg-red-500' },
])

const quickActions = [
  { name: 'Đăng Tin', icon: 'fa-plus-circle', url: '/upnew' },
  { name: 'Quản lý Cuộc Hẹn', icon: 'fa-calendar', url: '/tourrequest' },
  { name: 'Xuất Báo Cáo', icon: 'fa-file-alt' },
  { name: 'Cài Đặt Tài Khoản', icon: 'fa-cog', url: '/profile' },
]

const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  currentDay.value = now.toLocaleDateString('en-US', { weekday: 'long' })
}

const fetchUserProperties = async () => {
  if (!user.value?.id) {
    return
  }
  
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/user/${user.value.id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    properties.value = data
  } catch (err) {
    console.error('Error fetching property stats:', err)
  }
}

watch(user, () => {
  if (user.value?.id) {
    fetchUserProperties()
  }
}, { immediate: true })

onMounted(() => {
  if (user.value?.id) {
    fetchUserProperties()
  }
  updateDateTime()
  setInterval(updateDateTime, 60000) 
})
</script>