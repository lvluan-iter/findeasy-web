<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <div class="flex flex-wrap items-center gap-4">
      <button
        class="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2 transition duration-300"
        @click="$router.go(-1)"
      >
        <i class="fas fa-angle-left" />
        <span>Quay lại</span>
      </button>
      <div class="hidden sm:block w-px h-6 bg-gray-300" />
      <h1 class="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800">
        Yêu Cầu Xem Nhà 
        <div 
          v-if="pendingRequestsCount > 0"
          class="bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-sm"
        >
          {{ pendingRequestsCount }}
        </div>
      </h1>
    </div>
    <hr class="w-full mb-5">
    
    <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
      <div class="relative w-full sm:w-64 md:w-72 lg:w-96">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full border p-2 pr-10 rounded text-sm sm:text-base"
        >
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2">🔍</span>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in ['all', 'pending', 'confirmed', 'completed']"
            :key="status"
            :class="[
              'px-2 sm:px-3 py-1 rounded transition duration-300 text-xs sm:text-sm uppercase tracking-wide font-semibold',
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
            @click="filterStatus = status"
          >
            {{ status }}
          </button>
        </div>
        <div class="flex items-center">
          <span class="mr-2 text-xs sm:text-sm text-gray-600">Sắp xếp:</span>
          <select 
            v-model="sortBy" 
            class="border p-1 rounded text-xs sm:text-sm bg-white"
          >
            <option value="dateDesc">
              Mới nhất
            </option>
            <option value="dateAsc">
              Cũ nhất
            </option>
            <option value="nameAsc">
              Tên (A-Z)
            </option>
            <option value="nameDesc">
              Tên (Z-A)
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Đang tải dữ liệu...
      </h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Vui lòng đợi trong giây lát trong khi chúng tôi tải thông tin yêu cầu xem nhà của bạn.
      </p>
    </div>

    <div 
      v-else-if="tourRequests.length === 0" 
      class="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div class="bg-gray-100 rounded-full p-6 mb-6">
        <svg
          class="w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
        Chưa có yêu cầu xem nhà nào
      </h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Khi có người đặt lịch xem nhà, yêu cầu sẽ xuất hiện ở đây. Bạn có thể quản lý và phản hồi các yêu cầu một cách dễ dàng.
      </p>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        @click="refreshData"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Làm mới
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      <div
        v-for="request in filteredRequests"
        :key="request.id"
        class="bg-white rounded-lg shadow-md p-4 sm:p-6 relative"
      >
        <span
          :class="[
            'absolute top-0 right-0 px-3 py-1 text-xs font-semibold rounded-[0_8px_0_8px] shadow-sm transition-all duration-300',
            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
            request.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
            request.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            request.status === 'completed' ? 'bg-purple-100 text-purple-800' :
            'bg-blue-100 text-blue-800'
          ]"
        >
          {{ request.status }}
        </span>
        <div class="flex items-center mb-4">
          <div class="w-20 h-14 sm:w-24 sm:h-16 bg-gray-200 rounded-md mr-3 sm:mr-4 flex-shrink-0">
            <img 
              :src="request.url"
              alt="Image" 
              class="w-full h-full object-cover rounded-md"
            >
          </div>
          <h2 class="text-base sm:text-lg font-semibold line-clamp-2">
            {{ request.title }}
          </h2>
        </div>
        <div class="space-y-1 sm:space-y-2 text-sm sm:text-base">
          <p><strong>Tên:</strong> {{ request.email }}</p>
          <p><strong>Số điện thoại:</strong> {{ request.phoneNumber }}</p>
          <p><strong>Ngày:</strong> {{ formatDate(request.appointmentDate) }}</p>
          <p><strong>Giờ:</strong> {{ request.appointmentTime }}</p>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-2 sm:space-y-0">
          <span class="text-xs sm:text-sm text-gray-500">Received: {{ formatDate(request.createdAt) }}</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-if="request.status === 'pending'"
              class="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition duration-300 flex items-center"
              @click="updateStatus(request.id, 'confirmed')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Confirm
            </button>
            <button
              v-if="request.status === 'pending'"
              class="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition duration-300 flex items-center"
              @click="updateStatus(request.id, 'cancelled')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Decline
            </button>
            <button
              v-if="request.status === 'confirmed'"
              class="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition duration-300 flex items-center"
              @click="showRescheduleModal(request)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Reschedule
            </button>
            <button
              v-if="request.status === 'confirmed'"
              class="bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition duration-300 flex items-center"
              @click="updateStatus(request.id, 'completed')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showRescheduleModalFlag"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Reschedule Tour Request
        </h3>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="newDate"
          >
            New Date
          </label>
          <input 
            id="newDate" 
            v-model="rescheduleDate" 
            type="date" 
            class="shadow-sm border rounded w-full py-2 px-3 text-gray-700 text-sm sm:text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="newTime"
          >
            New Time
          </label>
          <input 
            id="newTime" 
            v-model="rescheduleTime" 
            type="time" 
            class="shadow-sm border rounded w-full py-2 px-3 text-gray-700 text-sm sm:text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="flex justify-end space-x-2">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base focus:outline-none focus:shadow-outline transition duration-300"
            @click="submitReschedule"
          >
            Confirm Reschedule
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-sm sm:text-base focus:outline-none focus:shadow-outline transition duration-300"
            @click="closeRescheduleModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const tourRequests = ref([])
const searchQuery = ref('')
const filterStatus = ref('all')
const showRescheduleModalFlag = ref(false)
const rescheduleDate = ref('')
const rescheduleTime = ref('')
const currentRequest = ref(null)
const currentDate = ref('')
const sortBy = ref('dateDesc')
const isLoading = ref(false)

onMounted(() => {
  currentDate.value = new Date().toLocaleDateString('en-GB')
})

const refreshData = () => {
  fetchTourRequests()
}

const pendingRequestsCount = computed(() => {
  return tourRequests.value.filter(request => request.status === 'pending').length
})

const filteredRequests = computed(() => {
  let filtered = tourRequests.value.filter(request =>
    (request.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     request.email.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
    (filterStatus.value === 'all' || request.status === filterStatus.value)
  )

  switch (sortBy.value) {
    case 'dateDesc':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'dateAsc':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'nameAsc':
      filtered.sort((a, b) => a.email.localeCompare(b.email))
      break
    case 'nameDesc':
      filtered.sort((a, b) => b.email.localeCompare(a.email))
      break
  }

  return filtered
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const fetchTourRequests = async () => {
  if (!user.value) return
  isLoading.value = true
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/user/${user.value.id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    tourRequests.value = data
  } catch (error) {
    console.error('Error fetching tour requests:', error)
  } finally {
    isLoading.value = false 
  }
}

const updateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatus),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    await fetchTourRequests()
  } catch (error) {
    console.error('Error updating tour request status:', error)
  }
}

const showRescheduleModal = (request) => {
  currentRequest.value = request
  rescheduleDate.value = request.appointmentDate
  rescheduleTime.value = request.appointmentTime
  showRescheduleModalFlag.value = true
}

const closeRescheduleModal = () => {
  showRescheduleModalFlag.value = false
  currentRequest.value = null
  rescheduleDate.value = ''
  rescheduleTime.value = ''
}

const submitReschedule = async () => {
  if (currentRequest.value) {
    try {
      const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/${currentRequest.value.id}/reschedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentDate: rescheduleDate.value,
          appointmentTime: rescheduleTime.value
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      await fetchTourRequests()
      closeRescheduleModal()
    } catch (error) {
      console.error('Error rescheduling tour request:', error)
    }
  }
}

watch(user, fetchTourRequests, { immediate: true })

onMounted(fetchTourRequests)
</script>