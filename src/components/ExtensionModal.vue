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
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
        Bất Động Sản Của Tôi
      </h1>
    </div>
    <hr class="w-full mb-5">

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <div class="relative w-full sm:w-64 md:w-72 lg:w-96">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full border p-2 pr-10 rounded"
        >
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2">🔍</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center">
          <span class="mr-2">Sắp xếp:</span>
          <select 
            v-model="sortBy" 
            class="border p-1 rounded"
          >
            <option value="newest">
              Mới nhất
            </option>
            <option value="oldest">
              Cũ nhất
            </option>
            <option value="price-high-low">
              Giá (Cao-Thấp)
            </option>
            <option value="price-low-high">
              Giá (Thấp-Cao)
            </option>
          </select>
        </div>
        <button 
          class="inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          @click="router.push('/upnew')"
        >
          Đăng Tin
          <i class="fas fa-plus h-4 w-4" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="property in filteredAndSortedProperties" 
        :key="property.id"
        class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-video relative">
          <img 
            :src="property.imageUrls?.[0] || '/api/placeholder/800/400'"
            :alt="property.title"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="p-5 space-y-4">
          <div class="space-y-2">
            <h2 class="text-xl font-medium truncate line-clamp-1">
              {{ property.title }}
            </h2>
            <p class="text-sm text-gray-600 truncate line-clamp-1">
              {{ property.address }}
            </p>
          </div>
          <div class="flex items-center justify-between pt-2 border-t">
            <span class="text-sm text-gray-500">Lượt xem - {{ property.visits }}</span>
            <div class="flex items-center gap-3">
              <button 
                class="p-1 text-gray-400 hover:text-gray-600"
                @click="() => toggleVisibility(property)"
              >
                <i 
                  :class="[ 
                    'fas',
                    property.available ? 'fa-eye-slash' : 'fa-eye',
                    'h-4 w-4'
                  ]"
                />
              </button>
              <button class="p-1 text-gray-400 hover:text-gray-600">
                <i class="fas fa-pen-to-square h-4 w-4" />
              </button>
              <button 
                class="p-1 text-gray-400 hover:text-gray-600"
                @click="() => handleExtend(property)"
              >
                <i class="fas fa-circle-arrow-up h-4 w-4" />
              </button>
              <button class="p-1 text-gray-400 hover:text-gray-600">
                <i class="fas fa-trash h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ConfirmModal
      ref="confirmModal"
      :title="selectedProperty?.available ? 'Ẩn tin đăng' : 'Hiện tin đăng'"
      :message="selectedProperty?.available 
        ? 'Bạn có chắc chắn muốn ẩn tin đăng này không?' 
        : 'Bạn có muốn hiện tin đăng này không?'"
      :confirm-text="selectedProperty?.available ? 'Ẩn tin' : 'Hiện tin'"
    />

    <div
      v-if="showExtensionModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="showExtensionModal = false"
    >
      <div 
        class="bg-white rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all"
        @click.stop
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Gia Hạn Tin Đăng
            </h3>
            <button
              class="text-gray-400 hover:text-gray-500 transition-colors"
              @click="showExtensionModal = false"
            >
              <i class="fas fa-times h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <i class="fas fa-info-circle text-blue-500 mr-2" />
                <span class="font-medium text-blue-800">Thông tin tin đăng</span>
              </div>
              <p class="text-sm text-blue-700">
                {{ selectedProperty?.title }}
              </p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Thời gian gia hạn:</span>
                <span class="font-medium">30 ngày</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Phí gia hạn:</span>
                <span class="font-medium text-green-600">100.000 VND</span>
              </div>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg">
              <div class="flex items-center text-yellow-800">
                <i class="fas fa-exclamation-triangle mr-2" />
                <p class="text-sm">
                  Tin đăng sẽ được gia hạn thêm 30 ngày sau khi thanh toán thành công
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              @click="showExtensionModal = false"
            >
              Hủy
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              :disabled="isLoading"
              @click="confirmExtend"
            >
              <i 
                v-if="isLoading" 
                class="fas fa-circle-notch fa-spin mr-2"
              />
              {{ isLoading ? 'Đang xử lý...' : 'Gia hạn ngay' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import ConfirmModal from './ConfirmModal.vue'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const properties = ref([])
const searchQuery = ref('')
const currentDate = ref('')
const sortBy = ref('newest')
const confirmModal = ref(null)
const selectedProperty = ref(null)

const showExtensionModal = ref(false)
const isLoading = ref(false)

onMounted(() => {
  currentDate.value = new Date().toLocaleDateString('en-GB')
})

const fetchMyProperties = async () => {
  if (!user.value) return
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/user/${user.value.id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    properties.value = data
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
}

const filteredAndSortedProperties = computed(() => {
  let filtered = properties.value
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = properties.value.filter(property => 
      property.title.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query)
    )
  }

  return [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'price-high-low':
        return b.price - a.price
      case 'price-low-high':
        return a.price - b.price
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      default:
        return 0
    }
  })
})

const toggleVisibility = async (property) => {
  selectedProperty.value = property
  const confirmed = await confirmModal.value.showModal()
  if (confirmed) {
    try {
      const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/${property.id}/toggle-visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        window.location.reload()
        const message = property.available ? 'Tin đăng đã được hiển thị!' : 'Tin đăng đã bị ẩn!'
        toast.success(message) 
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.')
    }
  }
  selectedProperty.value = null
}

const handleExtend = (property) => {
  selectedProperty.value = property
  showExtensionModal.value = true
}

const confirmExtend = async () => {
  if (!selectedProperty.value) return
  
  try {
    isLoading.value = true
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/${selectedProperty.value.id}/extend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to extend property')
    }

    const data = await response.json()
    
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl
    }

  } catch (error) {
    console.error('Error extending property:', error)
    toast.error('Có lỗi xảy ra khi gia hạn tin đăng. Vui lòng thử lại.')
  } finally {
    isLoading.value = false
    showExtensionModal.value = false
    selectedProperty.value = null
  }
}

watch(user, fetchMyProperties, { immediate: true })

onMounted(fetchMyProperties)
</script>

<style scoped>
.rounded-full {
  border-radius: 9999px;
}

.property-card {
  height: 280px;
}
</style>