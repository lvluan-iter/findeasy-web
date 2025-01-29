<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Quản lý tin đăng
        </h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Duyệt và quản lý các tin đăng bất động sản
        </p>
      </div>
    </div>
  
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Tìm kiếm tin đăng..."
        class="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border-0
                 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100 shadow-sm"
      >
    </div>
  
    <div class="border-b border-slate-200 dark:border-slate-700">
      <nav class="flex gap-4">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="px-4 py-2 text-sm font-medium transition-colors relative"
          :class="[
            currentTab === tab.value
              ? 'text-[rgb(10,115,192)] border-b-2 border-[rgb(10,115,192)]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          ]"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
          <span
            v-if="tab.count > 0"
            class="ml-2 px-2 py-0.5 text-xs rounded-full"
            :class="[
              currentTab === tab.value
                ? 'bg-[rgb(10,115,192)] text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>
  
    <div
      v-if="isLoading"
      class="flex items-center justify-center py-12"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(10,115,192)]" />
    </div>
  
    <div 
      v-else-if="error" 
      class="bg-red-50 dark:bg-red-500/10 text-red-500 p-4 rounded-lg text-center"
    >
      {{ error }}
    </div>
  
    <div 
      v-else-if="filteredListings.length === 0" 
      class="text-center py-12 text-slate-500 dark:text-slate-400"
    >
      <i class="fas fa-clipboard-list text-4xl mb-3" />
      <p>Không có tin đăng nào {{ currentTab === 'pending' ? 'chờ duyệt' : '' }}</p>
    </div>
  
    <div
      v-else
      class="overflow-x-auto"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700">
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Tiêu đề
            </th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Người đăng
            </th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Ngày đăng
            </th>
            <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Trạng thái
            </th>
            <th class="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr
            v-for="listing in filteredListings"
            :key="listing.id"
            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  :src="listing.imageUrls[0] || '/api/placeholder/80/60'"
                  :alt="listing.title"
                  class="w-20 h-15 object-cover rounded"
                >
                <div>
                  <h3 class="font-medium text-slate-800 dark:text-slate-200">
                    {{ listing.title }}
                  </h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ listing.address }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                <img
                  :src="listing.user.avatar || '/api/placeholder/32/32'"
                  :alt="listing.user.fullname"
                  class="w-8 h-8 rounded-full"
                >
                <div>
                  <p class="font-medium text-slate-800 dark:text-slate-200">
                    {{ listing.user.fullname }}
                  </p>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ listing.user.email }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <p class="text-slate-600 dark:text-slate-300">
                {{ formatDate(listing.createdAt) }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ formatTime(listing.createdAt) }}
              </p>
            </td>
            <td class="py-3 px-4">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getStatusClass(listing)"
              >
                {{ getStatusText(listing) }}
              </span>
            </td>
            <td class="py-3 px-4">
              <div class="flex justify-end gap-2">
                <button
                  class="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 
                           dark:hover:bg-slate-700 rounded-lg transition-colors"
                  @click="previewListing(listing)"
                >
                  <i class="fas fa-eye" />
                </button>
  
                <template v-if="!listing.approved && !listing.locked">
                  <button
                    class="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 
                             rounded-lg transition-colors"
                    @click="approveListing(listing)"
                  >
                    <i class="fas fa-check" />
                  </button>
                  <button
                    class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 
                             rounded-lg transition-colors"
                    @click="openRejectModal(listing)"
                  >
                    <i class="fas fa-times" />
                  </button>
                </template>
  
                <button
                  v-if="listing.approved"
                  class="p-1.5 rounded-lg transition-colors"
                  :class="[
                    listing.locked
                      ? 'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  ]"
                  @click="listing.locked ? unlockListing(listing) : openLockModal(listing)"
                >
                  <i :class="listing.locked ? 'fas fa-lock' : 'fas fa-lock-open'" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div
      v-if="showLockModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closeLockModal"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Khóa tin đăng
        </h3>
  
        <form @submit.prevent="lockListing">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Lý do khóa
              </label>
              <textarea
                v-model="lockForm.reason"
                required
                rows="3"
                class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                         focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
                placeholder="Nhập lý do khóa tin đăng..."
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Thời hạn khóa (ngày)
              </label>
              <input
                v-model.number="lockForm.duration"
                type="number"
                required
                min="1"
                class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                         focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
              >
            </div>
          </div>
  
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                       dark:hover:bg-slate-700 rounded-lg transition-colors"
              :disabled="isRunning"
              @click="closeLockModal"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg
                       hover:bg-[rgb(8,92,154)] transition-colors disabled:opacity-50"
              :disabled="isRunning"
            >
              <i
                v-if="isRunning"
                class="fas fa-spinner fa-spin mr-2"
              />
              Khóa
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <div
      v-if="showRejectModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closeRejectModal"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Từ chối tin đăng
        </h3>
  
        <form @submit.prevent="rejectListing">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Lý do từ chối
            </label>
            <textarea
              v-model="rejectForm.reason"
              required
              rows="3"
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                       focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
              placeholder="Nhập lý do từ chối tin đăng..."
            />
          </div>
  
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                       dark:hover:bg-slate-700 rounded-lg transition-colors"
              @click="closeRejectModal"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                       transition-colors"
            >
              Xác nhận từ chối
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <div
      v-if="showPreviewModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closePreviewModal"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Chi tiết tin đăng
          </h3>
          <button
            class="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            @click="closePreviewModal"
          >
            <i class="fas fa-times" />
          </button>
        </div>

        <div
          v-if="selectedListing"
          class="space-y-6"
        >
          <div class="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              :src="selectedListing.imageUrls && selectedListing.imageUrls.length > 0 ? selectedListing.imageUrls[currentImageIndex] : '/api/placeholder/800/400'"
              :alt="selectedListing.title"
              class="w-full h-[400px] object-cover"
            >
        
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                v-for="(imageUrl, index) in selectedListing.imageUrls || []"
                :key="index"
                class="w-2 h-2 rounded-full transition-colors"
                :class="index === currentImageIndex ? 'bg-white' : 'bg-white/50'"
                @click="currentImageIndex = index"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Thông tin cơ bản
              </h4>
              <dl class="space-y-2">
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">
                    Giá
                  </dt>
                  <dd class="font-medium text-slate-800 dark:text-slate-200">
                    {{ formatPrice(selectedListing.price) }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">
                    Diện tích
                  </dt>
                  <dd class="font-medium text-slate-800 dark:text-slate-200">
                    {{ selectedListing.area }} m²
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">
                    Loại BĐS
                  </dt>
                  <dd class="font-medium text-slate-800 dark:text-slate-200">
                    {{ selectedListing.type }}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Địa chỉ
              </h4>
              <p class="text-slate-600 dark:text-slate-300">
                {{ selectedListing.address }}
              </p>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Mô tả
            </h4>
            <p class="text-slate-600 dark:text-slate-300 whitespace-pre-line">
              {{ selectedListing.description }}
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Tiện ích
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                v-for="amenity in selectedListing.amenities"
                :key="amenity.id"
                class="flex items-center gap-2 text-slate-600 dark:text-slate-300"
              >
                <i :class="amenity.icon" />
                <span>{{ amenity.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_URL = 'https://roombooking-fa3a.onrender.com/api/properties'

const listings = ref([])
const isLoading = ref(false)
const isRunning = ref(false)
const error = ref(null)
const searchTerm = ref('')
const currentTab = ref('pending')
const currentImageIndex = ref(0)

const showLockModal = ref(false)
const showRejectModal = ref(false)
const showPreviewModal = ref(false)
const selectedListing = ref(null)

const lockForm = ref({
  reason: '',
  duration: 7
})

const rejectForm = ref({
  reason: ''
})

const tabs = computed(() => [
  {
    label: 'Chờ duyệt',
    value: 'pending',
    count: listings.value.filter(l => !l.approved && !l.locked).length
  },
  {
    label: 'Đã duyệt',
    value: 'approved',
    count: listings.value.filter(l => l.approved).length
  }
])

const filteredListings = computed(() => {
  let filtered = listings.value

  if (currentTab.value === 'pending') {
    filtered = filtered.filter(l => !l.approved && !l.locked)
  } else {
    filtered = filtered.filter(l => l.approved)
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(listing => 
      listing.title.toLowerCase().includes(term) ||
      listing.address.toLowerCase().includes(term) ||
      listing.user.name.toLowerCase().includes(term)
    )
  }

  return filtered
})

const fetchListings = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    error.value = null

    const response = await fetch(API_URL)
    if (!response.ok) throw new Error()

    listings.value = await response.json()
    
  } catch (err) {
    error.value = 'Không thể tải danh sách tin đăng'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const approveListing = async (listing) => {
  try {
    const response = await fetch(`${API_URL}/${listing.id}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    if (!response.ok) throw new Error()

    await fetchListings()
  } catch (err) {
    console.error('Error approving listing:', err)
  }
}

const rejectListing = async () => {
  if (!selectedListing.value) return

  try {
    const response = await fetch(`${API_URL}/${selectedListing.value.id}/reject`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ reason: rejectForm.value.reason })
    })

    if (!response.ok) throw new Error()

    await fetchListings()
    closeRejectModal()
  } catch (err) {
    console.error('Error rejecting listing:', err)
  }
}

const lockListing = async () => {
  if (!selectedListing.value) return

  try {
    isRunning.value = true
    const response = await fetch(`${API_URL}/${selectedListing.value.id}/lock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(lockForm.value)
    })

    if (!response.ok) throw new Error()

    await fetchListings()
    closeLockModal()
  } catch (err) {
    console.error('Error locking listing:', err)
  } finally {
    isRunning.value = false
  }
}

const unlockListing = async (listing) => {
  try {
    const response = await fetch(`${API_URL}/${listing.id}/unlock`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    if (!response.ok) throw new Error()

    await fetchListings()
  } catch (err) {
    console.error('Error unlocking listing:', err)
  }
}


const openRejectModal = (listing) => {
  selectedListing.value = listing
  showRejectModal.value = true
  rejectForm.value.reason = ''
}

const closeRejectModal = () => {
  showRejectModal.value = false
  selectedListing.value = null
  rejectForm.value.reason = ''
}

const openLockModal = (listing) => {
  selectedListing.value = listing
  showLockModal.value = true
  lockForm.value = {
    reason: '',
    duration: 7
  }
}

const closeLockModal = () => {
  showLockModal.value = false
  selectedListing.value = null
  lockForm.value = {
    reason: '',
    duration: 7
  }
}

const previewListing = (listing) => {
  selectedListing.value = listing
  currentImageIndex.value = 0
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
  selectedListing.value = null
  currentImageIndex.value = 0
}

const getStatusClass = (listing) => {
  if (listing.locked) {
    return 'bg-orange-50 dark:bg-orange-500/10 text-orange-500'
  }
  if (listing.approved) {
    return 'bg-green-50 dark:bg-green-500/10 text-green-600'
  }
  return 'bg-blue-50 dark:bg-blue-500/10 text-blue-600'
}

const getStatusText = (listing) => {
  if (listing.locked) return 'Đã khóa'
  if (listing.approved) return 'Đã duyệt'
  return 'Chờ duyệt'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('vi-VN')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

onMounted(() => {
  fetchListings()
})
</script>