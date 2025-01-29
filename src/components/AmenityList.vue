<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Quản lý tiện ích
        </h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Quản lý các tiện ích cơ bản của bất động sản
        </p>
      </div>
      <button
        class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg hover:bg-[rgb(8,92,154)] 
                 transition-colors flex items-center gap-2"
        @click="openModal()"
      >
        <i class="fas fa-plus" />
        Thêm tiện ích
      </button>
    </div>
  
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Tìm kiếm tiện ích..."
        class="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border-0
                 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100 shadow-sm"
      >
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
      v-else-if="amenities.length === 0" 
      class="text-center py-12 text-slate-500 dark:text-slate-400"
    >
      <i class="fas fa-coffee text-4xl mb-3" />
      <p>Chưa có tiện ích nào. Hãy thêm tiện ích mới!</p>
    </div>
  
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div
        v-for="amenity in filteredAmenities"
        :key="amenity.id"
        class="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4
                 flex flex-col items-center group relative"
      >
        <div
          class="w-12 h-12 flex items-center justify-center text-2xl mb-3 
                      bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"
        >
          <i :class="amenity.icon" />
        </div>
  
        <h3 class="text-sm font-medium text-slate-700 dark:text-slate-200 text-center">
          {{ amenity.name }}
        </h3>
  
        <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            class="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 
                     dark:hover:bg-slate-700 rounded-lg transition-colors"
            @click="openModal(amenity)"
          >
            <i class="fas fa-edit" />
          </button>
          <button
            class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 
                     rounded-lg transition-colors"
            @click="confirmDelete(amenity)"
          >
            <i class="fas fa-trash" />
          </button>
        </div>
      </div>
    </div>
  
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {{ editingAmenity ? 'Chỉnh sửa tiện ích' : 'Thêm tiện ích mới' }}
        </h3>
          
        <div 
          v-if="formError" 
          class="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-500 text-sm rounded-lg"
        >
          {{ formError }}
        </div>
  
        <form
          class="space-y-4"
          @submit.prevent="saveAmenity"
        >
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Tên tiện ích
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                       focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            >
          </div>
  
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Icon (Font Awesome)
            </label>
            <div class="relative">
              <input
                v-model="formData.icon"
                type="text"
                required
                placeholder="fas fa-..."
                class="w-full px-4 py-2 pl-10 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                         focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
              >
              <i 
                :class="formData.icon || 'fas fa-icons'"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
  
          <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Preview:
            </p>
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 flex items-center justify-center text-xl
                            bg-white dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400"
              >
                <i :class="formData.icon || 'fas fa-icons'" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {{ formData.name || 'Tên tiện ích' }}
                </p>
              </div>
            </div>
          </div>
  
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Icons phổ biến:
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="icon in commonIcons"
                :key="icon"
                type="button"
                class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 
                         dark:hover:bg-slate-700 rounded-lg transition-colors"
                @click="formData.icon = icon"
              >
                <i :class="icon" />
              </button>
            </div>
          </div>
  
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                       dark:hover:bg-slate-700 rounded-lg transition-colors"
              :disabled="isSaving"
              @click="closeModal"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg
                       hover:bg-[rgb(8,92,154)] transition-colors disabled:opacity-50"
              :disabled="isSaving"
            >
              <i
                v-if="isSaving"
                class="fas fa-spinner fa-spin mr-2"
              />
              {{ editingAmenity ? 'Cập nhật' : 'Thêm mới' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="showDeleteConfirm = false"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Xác nhận xóa
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          Bạn có chắc chắn muốn xóa tiện ích "{{ amenityToDelete?.name }}" không?
        </p>
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                     dark:hover:bg-slate-700 rounded-lg transition-colors"
            :disabled="isDeleting"
            @click="showDeleteConfirm = false"
          >
            Hủy bỏ
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                     transition-colors disabled:opacity-50"
            :disabled="isDeleting"
            @click="deleteAmenity"
          >
            <i
              v-if="isDeleting"
              class="fas fa-spinner fa-spin mr-2"
            />
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const API_URL = 'https://roombooking-fa3a.onrender.com/api/amenities'
  
  const commonIcons = [
    'fas fa-wifi',
    'fas fa-parking',
    'fas fa-swimming-pool',
    'fas fa-dumbbell',
    'fas fa-utensils',
    'fas fa-coffee',
    'fas fa-tv',
    'fas fa-air-conditioner',
    'fas fa-shower',
    'fas fa-bed',
    'fas fa-clock',
    'fas fa-lock',
    'fas fa-elevator',
    'fas fa-camera',
    'fas fa-sun',
    'fas fa-snowflake'
  ]
  
  const amenities = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const isModalOpen = ref(false)
  const showDeleteConfirm = ref(false)
  const editingAmenity = ref(null)
  const amenityToDelete = ref(null)
  const searchTerm = ref('')
  const formData = ref({
    name: '',
    icon: ''
  })
  const formError = ref(null)
  const isSaving = ref(false)
  const isDeleting = ref(false)
  
  const filteredAmenities = computed(() => {
    if (!searchTerm.value) return amenities.value
    
    const term = searchTerm.value.toLowerCase()
    return amenities.value.filter(amenity => 
      amenity.name.toLowerCase().includes(term) ||
      amenity.icon.toLowerCase().includes(term)
    )
  })
  
  const fetchAmenities = async () => {
    if (isLoading.value) return
    
    try {
      isLoading.value = true
      error.value = null
  
      const response = await fetch(`${API_URL}`)
      if (!response.ok) throw new Error()
  
      amenities.value = await response.json()
      
    } catch (err) {
      error.value = 'Không thể tải danh sách tiện ích'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }
  
  const openModal = (amenity = null) => {
    editingAmenity.value = amenity
    formError.value = null
    if (amenity) {
      formData.value = {
        name: amenity.name,
        icon: amenity.icon
      }
    } else {
      formData.value = {
        name: '',
        icon: ''
      }
    }
    isModalOpen.value = true
  }
  
  const closeModal = () => {
    if (!isSaving.value) {
      isModalOpen.value = false
      editingAmenity.value = null
      formData.value = {
        name: '',
        icon: ''
      }
      formError.value = null
    }
  }
  
  const saveAmenity = async () => {
    try {
      isSaving.value = true
      formError.value = null
  
      const method = editingAmenity.value ? 'PUT' : 'POST'
      const url = editingAmenity.value 
        ? `${API_URL}/${editingAmenity.value.id}`
        : API_URL
        
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value)
      })

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi lưu tiện ích')
      }

      isModalOpen.value = false
      await fetchAmenities()
      
      formData.value = {
        name: '',
        icon: ''
      }
      editingAmenity.value = null

    } catch (err) {
      formError.value = 'Không thể lưu tiện ích. Vui lòng thử lại.'
      console.error(err)
    } finally {
      isSaving.value = false
    }
}

  const confirmDelete = (amenity) => {
    amenityToDelete.value = amenity
    showDeleteConfirm.value = true
  }

  const deleteAmenity = async () => {
    if (!amenityToDelete.value) return
    
    isDeleting.value = true
    try {
      const response = await fetch(`${API_URL}/${amenityToDelete.value.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Không thể xóa tiện ích')

      await fetchAmenities()
      showDeleteConfirm.value = false
      amenityToDelete.value = null
    } catch (err) {
      console.error('Error deleting amenity:', err)
    } finally {
      isDeleting.value = false
    }
  }

  onMounted(() => {
    fetchAmenities()
  })
</script>