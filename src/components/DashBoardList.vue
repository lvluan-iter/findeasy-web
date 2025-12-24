<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Tổng quan hệ thống</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Thống kê và báo cáo tổng quan</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 flex items-center justify-center text-2xl bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"
          >
            <i class="fas fa-building" />
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-500 dark:text-slate-400">Tổng số BĐS</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {{ isLoading ? '-' : stats.totalProperties }}
            </p>
          </div>
        </div>
        <div class="text-sm">
          <span class="text-green-500"> <i class="fas fa-arrow-up mr-1" />+{{ stats.propertiesGrowth }}% </span>
          <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 flex items-center justify-center text-2xl bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400"
          >
            <i class="fas fa-users" />
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-500 dark:text-slate-400">Người dùng mới</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {{ isLoading ? '-' : stats.totalUsers }}
            </p>
          </div>
        </div>
        <div class="text-sm">
          <span class="text-green-500"> <i class="fas fa-arrow-up mr-1" />+{{ stats.usersGrowth }}% </span>
          <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400"
          >
            <i class="fas fa-eye" />
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-500 dark:text-slate-400">Lượt xem</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {{ isLoading ? '-' : formatNumber(stats.totalViews) }}
            </p>
          </div>
        </div>
        <div class="text-sm">
          <span class="text-green-500"> <i class="fas fa-arrow-up mr-1" />+{{ stats.viewsGrowth }}% </span>
          <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 flex items-center justify-center text-2xl bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-400"
          >
            <i class="fas fa-dollar-sign" />
          </div>
          <div class="text-right">
            <p class="text-sm text-slate-500 dark:text-slate-400">Doanh thu</p>
            <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {{ isLoading ? '-' : formatCurrency(stats.totalRevenues) }}
            </p>
          </div>
        </div>
        <div class="text-sm">
          <span class="text-red-500"> <i class="fas fa-arrow-down mr-1" />-{{ stats.revenueGrowth }}% </span>
          <span class="text-slate-500 dark:text-slate-400 ml-1">so với tháng trước</span>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <div class="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">Bất động sản mới đăng</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-sm text-slate-500 dark:text-slate-400">
              <th class="p-4 font-medium">Tên BĐS</th>
              <th class="p-4 font-medium">Loại</th>
              <th class="p-4 font-medium">Giá</th>
              <th class="p-4 font-medium">Trạng thái</th>
              <th class="p-4 font-medium">Ngày đăng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="animate-pulse">
              <td v-for="n in 5" :key="n" class="p-4">
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              </td>
            </tr>
            <tr
              v-for="property in recentProperties"
              v-else
              :key="property.id"
              class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <img :src="property.image" :alt="property.name" class="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p class="font-medium text-slate-800 dark:text-slate-100">
                      {{ property.name }}
                    </p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                      {{ property.location }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="{
                    'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400': property.type === 'Cho thuê',
                    'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400': property.type === 'Bán'
                  }"
                >
                  {{ property.type }}
                </span>
              </td>
              <td class="p-4 font-medium text-slate-800 dark:text-slate-100">
                {{ formatCurrency(property.price) }}
              </td>
              <td class="p-4">
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="{
                    'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400':
                      property.status === 'Đã duyệt',
                    'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400':
                      property.status === 'Chờ duyệt',
                    'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400': property.status === 'Từ chối'
                  }"
                >
                  {{ property.status }}
                </span>
              </td>
              <td class="p-4 text-slate-500 dark:text-slate-400">
                {{ formatDate(property.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';

const {proxy} = getCurrentInstance();

const isLoading = ref(true);
const stats = ref({
  totalProperties: 0,
  propertiesGrowth: 0,
  totalUsers: 0,
  usersGrowth: 0,
  totalViews: 0,
  viewsGrowth: 0,
  totalRevenues: 0,
  revenueGrowth: 0
});

const recentProperties = ref([]);
const recentActivities = ref([]);

const formatNumber = (num) => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const fetchDashboardData = async () => {
  try {
    isLoading.value = true;

    const response = await proxy.$http.get(Endpoint.getAdminQuickStats);

    if (!response.succeeded) {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to fetch dashboard data');
    }

    const data = response.result;
    console.log('API response:', data);

    stats.value = {
      totalProperties: data.totalProperties || 0,
      propertiesGrowth: data.propertiesGrowth || 0,
      totalUsers: data.totalUsers || 0,
      usersGrowth: data.usersGrowth || 0,
      totalViews: data.totalViews || 0,
      viewsGrowth: data.viewsGrowth || 0,
      totalRevenues: data.totalRevenues || 0,
      revenueGrowth: data.revenueGrowth || 0
    };

    if (Array.isArray(data.recentProperties)) {
      recentProperties.value = data.recentProperties;
    }

    if (Array.isArray(data.recentActivities)) {
      recentActivities.value = data.recentActivities;
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>
