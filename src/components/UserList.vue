<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Quản lý người dùng
        </h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Quản lý tài khoản và phân quyền người dùng trong hệ thống
        </p>
      </div>
    </div>
  
    <div class="bg-white dark:bg-slate-800 rounded-lg p-4">
      <div class="flex gap-4 flex-wrap">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Tìm kiếm người dùng..."
            class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                     focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
          >
        </div>
        <div class="w-48">
          <select
            v-model="statusFilter"
            class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                     focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
          >
            <option value="all">
              Tất cả trạng thái
            </option>
            <option value="active">
              Đang hoạt động
            </option>
            <option value="locked">
              Đã khóa
            </option>
          </select>
        </div>
        <div class="w-48">
          <select
            v-model="roleFilter"
            class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                     focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
          >
            <option value="all">
              Tất cả vai trò
            </option>
            <option value="User">
              Người dùng
            </option>
            <option value="Admin">
              Quản trị viên
            </option>
            <option value="Owner">
              Chủ sở hữu
            </option>
          </select>
        </div>
      </div>
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
      v-else-if="users.length === 0" 
      class="text-center py-12 text-slate-500 dark:text-slate-400"
    >
      <i class="fas fa-users text-4xl mb-3" />
      <p>Không tìm thấy người dùng nào</p>
    </div>
  
    <div
      v-else
      class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700">
              <th class="px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Người dùng
              </th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Email
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-200">
                Vai trò
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-200">
                Trạng thái
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-200">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-600">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[rgb(10,115,192)] flex items-center justify-center text-white">
                    {{ user?.fullname?.charAt(0).toUpperCase() || '' }}
                  </div>
                  <div>
                    <span class="font-medium text-slate-800 dark:text-slate-200">
                      {{ user.fullname }}
                    </span>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                      Tham gia: {{ formatDate(user.createdAt) }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 dark:text-slate-400">
                {{ user.email }}
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-center space-x-2">
                  <span
                    v-for="role in getRoleName(user.roles)"
                    :key="role"
                    :class="{
                      'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300': role === 'Owner',
                      'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300': role === 'Admin',
                      'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300': role === 'User'
                    }"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm"
                  >
                    {{ role }}
                  </span>
                </div>
              </td>

              <td class="px-6 py-4">
                <div class="flex justify-center">
                  <span
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300': !user.isLocked,
                      'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300': user.isLocked
                    }"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm"
                  >
                    <i
                      :class="{
                        'fa-lock': user.isLocked,
                        'fa-check': !user.isLocked
                      }"
                      class="fas mr-1 text-xs"
                    />
                    {{ user.isLocked ? 'Đã khóa' : 'Hoạt động' }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 
                             dark:hover:bg-slate-700 rounded-lg transition-colors"
                    @click="openRoleModal(user)"
                  >
                    <i class="fas fa-user-shield" />
                  </button>
                  <button
                    :class="{
                      'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10': !user.isLocked,
                      'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10': user.isLocked
                    }"
                    class="p-2 rounded-lg transition-colors"
                    @click="user.isLocked ? openUnlockModal(user) : openLockModal(user)"
                  >
                    <i
                      :class="{
                        'fa-lock': !user.isLocked,
                        'fa-lock-open': user.isLocked
                      }"
                      class="fas"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <div
      v-if="showRoleModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="showRoleModal = false"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Phân quyền người dùng
        </h3>
          
        <div class="mb-4">
          <p class="text-slate-600 dark:text-slate-400">
            Thay đổi vai trò cho người dùng <span class="font-medium text-slate-800 dark:text-slate-200">{{ selectedUser?.name }}</span>
          </p>
        </div>
  
        <div class="space-y-4">
          <div
            v-for="role in availableRoles"
            :key="role.value"
            class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
            :class="{
              'bg-blue-50 dark:bg-blue-500/10 border-2 border-[rgb(10,115,192)]': newRole === role.value
            }"
            @click="newRole = role.value"
          >
            <div
              :class="{
                'bg-purple-100 text-purple-800': role.value === 'Admin',
                'bg-blue-100 text-blue-800': role.value === 'Owner',
                'bg-green-100 text-green-800': role.value === 'User'
              }"
              class="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <i
                :class="role.icon"
                class="fas"
              />
            </div>
            <div>
              <h4 class="font-medium text-slate-800 dark:text-slate-200">
                {{ role.label }}
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ role.description }}
              </p>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end gap-3 mt-6">
          <button
            class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                     dark:hover:bg-slate-700 rounded-lg transition-colors"
            :disabled="isUpdating"
            @click="showRoleModal = false"
          >
            Hủy bỏ
          </button>
          <button
            class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg
                     hover:bg-[rgb(8,92,154)] transition-colors disabled:opacity-50"
            :disabled="isUpdating || newRole === selectedUser?.role"
            @click="updateUserRole"
          >
            <i
              v-if="isUpdating"
              class="fas fa-spinner fa-spin mr-2"
            />
            Cập nhật vai trò
          </button>
        </div>
      </div>
    </div>
  
    <div
      v-if="showLockModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="showLockModal = false"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Khóa tài khoản người dùng
        </h3>
          
        <div class="mb-4">
          <p class="text-slate-600 dark:text-slate-400">
            Bạn đang khóa tài khoản của người dùng <span class="font-medium text-slate-800 dark:text-slate-200">{{ selectedUser?.name }}</span>
          </p>
        </div>
  
        <form
          class="space-y-4"
          @submit.prevent="lockUser"
        >
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Lý do khóa
            </label>
            <textarea
              v-model="lockReason"
              required
              rows="3"
              placeholder="Nhập lý do khóa tài khoản..."
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                       focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            />
          </div>
            
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Thời hạn khóa (ngày)
            </label>
            <input
              v-model="lockDuration"
              type="number"
              required
              min="1"
              max="365"
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0
                     focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            >
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                     dark:hover:bg-slate-700 rounded-lg transition-colors"
              :disabled="isUpdating"
              @click="showLockModal = false"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                     transition-colors disabled:opacity-50"
              :disabled="isUpdating"
            >
              <i
                v-if="isUpdating"
                class="fas fa-spinner fa-spin mr-2"
              />
              Xác nhận khóa
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showUnlockModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="showUnlockModal = false"
      />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Mở khóa tài khoản
        </h3>
        
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p class="text-slate-600 dark:text-slate-400">
              <span class="font-medium text-slate-800 dark:text-slate-200">{{ selectedUser?.name }}</span>
              bị khóa với lý do:
            </p>
            <p class="mt-2 text-red-500">
              {{ selectedUser?.lockReason }}
            </p>
            <p class="mt-2 text-sm text-slate-500">
              Thời hạn khóa còn: {{ getRemainingLockTime(selectedUser?.lockExpiry) }}
            </p>
          </div>
          
          <p class="text-slate-600 dark:text-slate-400">
            Bạn có chắc chắn muốn mở khóa tài khoản này không?
          </p>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                   dark:hover:bg-slate-700 rounded-lg transition-colors"
            :disabled="isUpdating"
            @click="showUnlockModal = false"
          >
            Hủy bỏ
          </button>
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600
                   transition-colors disabled:opacity-50"
            :disabled="isUpdating"
            @click="unlockUser"
          >
            <i
              v-if="isUpdating"
              class="fas fa-spinner fa-spin mr-2"
            />
            Xác nhận mở khóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_URL = 'https://roombooking-fa3a.onrender.com/api/users'

const users = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchTerm = ref('')
const statusFilter = ref('all')
const roleFilter = ref('all')
const showRoleModal = ref(false)
const showLockModal = ref(false)
const showUnlockModal = ref(false)
const selectedUser = ref(null)
const newRole = ref(null)
const lockReason = ref('')
const lockDuration = ref(7)
const isUpdating = ref(false)

const availableRoles = [
  {
    value: 'Owner',
    label: 'Chủ sở hữu',
    icon: 'fa-user-shield',
    description: 'Toàn quyền quản lý hệ thống'
  },
  {
    value: 'Admin',
    label: 'Quản trị viên',
    icon: 'fa-user-gear',
    description: 'Quản lý nội dung và người dùng'
  },
  {
    value: 'User',
    label: 'Người dùng',
    icon: 'fa-user',
    description: 'Sử dụng các tính năng cơ bản'
  }
]

const filteredUsers = computed(() => {
  let result = [...users.value]
  
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )
  }
  
  if (statusFilter.value !== 'all') {
    result = result.filter(user => 
      statusFilter.value === 'locked' ? user.isLocked : !user.isLocked
    )
  }
  
  if (roleFilter.value !== 'all') {
    result = result.filter(user => user.role === roleFilter.value)
  }
  
  return result
})

const fetchUsers = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error()
    
    users.value = await response.json()
  } catch (err) {
    error.value = 'Không thể tải danh sách người dùng'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const openRoleModal = (user) => {
  selectedUser.value = user
  newRole.value = user.role
  showRoleModal.value = true
}

const openLockModal = (user) => {
  selectedUser.value = user
  lockReason.value = ''
  lockDuration.value = 7
  showLockModal.value = true
}

const openUnlockModal = (user) => {
  selectedUser.value = user
  showUnlockModal.value = true
}

const updateUserRole = async () => {
  if (!selectedUser.value || isUpdating.value) return
  
  try {
    isUpdating.value = true
    
    const response = await fetch(`${API_URL}/${selectedUser.value.id}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole.value })
    })
    
    if (!response.ok) throw new Error()
    
    // Cập nhật UI
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value[index].role = newRole.value
    }
    
    showRoleModal.value = false
    selectedUser.value = null
    newRole.value = null
    
  } catch (err) {
    console.error('Error updating user role:', err)
  } finally {
    isUpdating.value = false
  }
}

const lockUser = async () => {
  if (!selectedUser.value || isUpdating.value) return
  
  try {
    isUpdating.value = true
    
    const response = await fetch(`${API_URL}/${selectedUser.value.id}/lock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason: lockReason.value,
        duration: parseInt(lockDuration.value)
      })
    })
    
    if (!response.ok) throw new Error()
    
    // Cập nhật UI
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value[index].isLocked = true
      users.value[index].lockReason = lockReason.value
      users.value[index].lockExpiry = new Date(Date.now() + parseInt(lockDuration.value) * 24 * 60 * 60 * 1000)
    }
    
    showLockModal.value = false
    selectedUser.value = null
    lockReason.value = ''
    lockDuration.value = 7
    
  } catch (err) {
    console.error('Error locking user:', err)
  } finally {
    isUpdating.value = false
  }
}

const unlockUser = async () => {
  if (!selectedUser.value || isUpdating.value) return
  
  try {
    isUpdating.value = true
    
    const response = await fetch(`${API_URL}/${selectedUser.value.id}/unlock`, {
      method: 'POST'
    })
    
    if (!response.ok) throw new Error()
    
    // Cập nhật UI
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value[index].isLocked = false
      users.value[index].lockReason = null
      users.value[index].lockExpiry = null
    }
    
    showUnlockModal.value = false
    selectedUser.value = null
    
  } catch (err) {
    console.error('Error unlocking user:', err)
  } finally {
    isUpdating.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const getRoleName = (role) => {
  const roleObj = availableRoles.find(r => r.value === role)
  return roleObj ? roleObj.label : role
}

const getRemainingLockTime = (expiry) => {
  if (!expiry) return ''
  
  const now = new Date()
  const expiryDate = new Date(expiry)
  const diff = expiryDate - now
  
  if (diff <= 0) return 'Đã hết hạn'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  return `${days} ngày ${hours} giờ`
}

onMounted(() => {
  fetchUsers()
})
</script>