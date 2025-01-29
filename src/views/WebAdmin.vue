<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-900">
    <div
      v-show="isMobileMenuOpen" 
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    />

    <aside
      :class="[
        'fixed top-0 left-0 z-50 h-screen w-64 lg:w-72 transition-transform duration-300',
        'bg-gradient-to-br from-[rgb(10,115,192)] to-[rgb(8,92,154)]',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <img
          src="@/assets/logo.png"
          alt="FindEasy"
          class="h-8"
        >
      </div>

      <nav class="space-y-1 px-3 py-4">
        <router-link
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
            route.path === item.path
              ? 'bg-white/15 text-white shadow-lg shadow-black/10'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          ]"
        >
          <i :class="['fas', item.icon, 'w-5']" />
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-4">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <img
            src="@/assets/avatar.jpg"
            class="w-10 h-10 rounded-lg object-cover"
          >
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-white truncate">
              Lê Văn Luân
            </h3>
            <p class="text-xs text-white/70">
              Admin
            </p>
          </div>
          <button 
            class="p-1.5 rounded-lg hover:bg-white/10"
            @click="router.push('/')"
          >
            <i class="fas fa-sign-out-alt text-white/70" />
          </button>
        </div>
      </div>
    </aside>

    <div
      :class="[
        'lg:ml-72 transition-all duration-300',
        'min-h-screen flex flex-col'
      ]"
    >
      <header class="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between h-16 px-4 lg:px-6">
          <div class="flex items-center gap-4">
            <button 
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 lg:hidden"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <i class="fas fa-bars text-slate-600 dark:text-slate-300" />
            </button>
            <h1 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {{ currentPage }}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative hidden lg:block">
              <input 
                type="text"
                placeholder="Tìm kiếm..."
                class="w-72 pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border-0 
                       focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100
                       placeholder-slate-500 dark:placeholder-slate-400"
              >
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div class="flex items-center gap-2">
              <button class="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <i class="fas fa-bell text-slate-600 dark:text-slate-300" />
                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button 
                class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                @click="toggleDarkMode"
              >
                <i
                  :class="[
                    'fas',
                    isDarkMode ? 'fa-sun' : 'fa-moon',
                    'text-slate-600 dark:text-slate-300'
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 lg:p-6">
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)

const navigation = [
  {
    name: 'Tổng quan',
    path: '/admin/adashboard',
    icon: 'fa-chart-pie'
  },
  {
    name: 'Quản lý danh mục',
    path: '/admin/categories',
    icon: 'fa-th-large'
  },
  {
    name: 'Quản lý địa điểm',
    path: '/admin/location',
    icon: 'fa-map-marker-alt'
  },
  {
    name: 'Quản lý tiện ích',
    path: '/admin/amenities',
    icon: 'fa-concierge-bell'
  },
  {
    name: 'Quản lý người dùng',
    path: '/admin/users',
    icon: 'fa-users'
  },
  {
    name: 'Quản lý tin đăng',
    path: '/admin/properties',
    icon: 'fa-home'
  },
  {
    name: 'Báo cáo & Thống kê',
    path: '/admin/reports',
    icon: 'fa-chart-line'
  },
  {
    name: 'Cài đặt hệ thống',
    path: '/admin/settings',
    icon: 'fa-cog'
  }
]

const currentPage = computed(() => {
  return navigation.find(item => item.path === route.path)?.name || 'Dashboard'
})

const initDarkMode = () => {
  const darkModeStored = localStorage.getItem('darkMode')
  
  if (darkModeStored !== null) {
    isDarkMode.value = darkModeStored === 'true'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  document.documentElement.classList.toggle('dark')
}

onMounted(() => {
  initDarkMode()
})
</script>