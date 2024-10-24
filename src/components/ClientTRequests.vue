<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <h1 class="text-xl sm:text-2xl font-bold flex items-center gap-2">
        MY REQUESTS <span class="bg-orange-500 text-white px-2 py-0.5 rounded-full text-sm">{{ totalRequestsCount }}</span>
      </h1>
      <div class="flex items-center">
        <span class="mr-2 text-sm sm:text-base">{{ currentDate }}</span>
        <i class="fas fa-calendar-alt text-[rgb(10,115,192)] mr-3 sm:mr-5" />
      </div>
    </div>
    
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
          <span class="mr-2 text-xs sm:text-sm text-gray-600">Sort by:</span>
          <select 
            v-model="sortBy" 
            class="border p-1 rounded text-xs sm:text-sm bg-white"
          >
            <option value="dateDesc">
              Date (Newest)
            </option>
            <option value="dateAsc">
              Date (Oldest)
            </option>
            <option value="nameAsc">
              Name (A-Z)
            </option>
            <option value="nameDesc">
              Name (Z-A)
            </option>
          </select>
        </div>
      </div>
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
          <p><strong>Name:</strong> {{ request.email }}</p>
          <p><strong>Phone:</strong> {{ request.phoneNumber }}</p>
          <p><strong>Date:</strong> {{ formatDate(request.appointmentDate) }}</p>
          <p><strong>Time:</strong> {{ request.appointmentTime }}</p>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-2 sm:space-y-0">
          <span class="text-xs sm:text-sm text-gray-500">Received: {{ formatDate(request.createdAt) }}</span>
          <div class="flex flex-wrap gap-2">
            <button
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
              class="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition duration-300 flex items-center"
              @click="deleteRequest(request.id)"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reschedule Modal -->
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
import { useRoute } from 'vue-router'

const route = useRoute()
const tourRequests = ref([])
const searchQuery = ref('')
const filterStatus = ref('all')
const showRescheduleModalFlag = ref(false)
const rescheduleDate = ref('')
const rescheduleTime = ref('')
const currentRequest = ref(null)
const currentDate = ref('')
const sortBy = ref('dateDesc')

onMounted(() => {
  currentDate.value = new Date().toLocaleDateString('en-GB')
})

const totalRequestsCount = computed(() => tourRequests.value.length)

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

const email = computed(() => route.query.email);

const fetchTourRequests = async () => {
  if (!email.value) return
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/email/${email.value}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    tourRequests.value = data
  } catch (error) {
    console.error('Error fetching tour requests:', error)
  }
}

const deleteRequest = async (id) => {
  if (confirm('Are you sure you want to delete this request?')) {
    try {
      const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      await fetchTourRequests()
    } catch (error) {
      console.error('Error deleting tour request:', error)
    }
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
      const response = await fetch(`https://roombooking-fa3a.onrender.com/api/tour-requests/${currentRequest.value.id}/date`, {
        method: 'PATCH',
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

watch(email, fetchTourRequests, { immediate: true })

onMounted(fetchTourRequests)
</script>

<style scoped>
/* Add any additional styles here */
</style>