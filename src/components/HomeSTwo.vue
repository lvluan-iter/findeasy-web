<template>
  <div class="px-4 sm:px-6 md:px-12 lg:px-[120px]">
    <div class="text-center mb-8 md:mb-[50px]">
      <div class="inline-block p-2 px-4 sm:p-2.5 sm:px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2">
        <span>Nhà Môi Giới</span>
      </div>
      <h1 class="font-bold text-[calc(1.25rem+1.2vw)] sm:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-4 sm:mb-5">
        Gặp Gỡ Nhà Môi Giới Hàng Đầu
      </h1>
      <span class="text-[#707070] block">
        Những nhà môi giới giàu kinh nghiệm của chúng tôi luôn sẵn sàng giúp bạn tìm hiểu và điều hướng thị trường bất
        động sản. Dù bạn đang tìm mua, bán, hay thuê, các chuyên gia của chúng tôi cung cấp sự tư vấn chuyên sâu và dịch
        vụ cá nhân hóa, đảm bảo đáp ứng nhu cầu của bạn. Kết nối với những chuyên gia uy tín và đạt được mục tiêu bất
        động sản của bạn một cách tự tin.
      </span>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="bg-blue-50 rounded-full p-6 mb-6 animate-pulse">
        <svg class="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Đang tải dữ liệu...</h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Vui lòng đợi trong giây lát trong khi chúng tôi tải thông tin nhà môi giới.
      </p>
    </div>

    <div v-else-if="users.length === 0" class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="bg-gray-100 rounded-full p-6 mb-6">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có nhà môi giới nào</h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Hiện tại chưa có nhà môi giới nào đăng ký trên hệ thống. Vui lòng quay lại sau.
      </p>
    </div>

    <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
        @click="linktoUser(user.id)"
      >
        <div>
          <div class="border border-[#0a73c0] p-[4px] rounded-full inline-block">
            <div class="avatar w-[158px] h-[158px] rounded-full overflow-hidden">
              <img class="w-full h-full object-cover" :src="user.avatar" alt="User avatar" />
            </div>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold text-[#212529] mb-2">
            {{ user.fullname }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {Endpoint} from '@/constants/Endpoint';
import {getCurrentInstance} from 'vue';

const router = useRouter();
const users = ref([]);
const isLoading = ref(true);
const {proxy} = getCurrentInstance();

async function fetchUsers() {
  try {
    isLoading.value = true;
    const res = await proxy.$http.get(Endpoint.getUsers);
    users.value = res.result;
  } catch (err) {
    console.error('Failed to fetch users:', err);
  } finally {
    isLoading.value = false;
  }
}

function linktoUser(id) {
  router.push(`/user-property/${id}`);
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
