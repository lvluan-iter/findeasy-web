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
        Những nhà môi giới giàu kinh nghiệm của chúng tôi luôn sẵn sàng giúp bạn tìm hiểu và điều hướng thị trường bất động sản. 
        Dù bạn đang tìm mua, bán, hay thuê, các chuyên gia của chúng tôi cung cấp sự tư vấn chuyên sâu và dịch vụ cá nhân hóa, đảm bảo đáp ứng nhu cầu của bạn. 
        Kết nối với những chuyên gia uy tín và đạt được mục tiêu bất động sản của bạn một cách tự tin.
      </span>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
      <div 
        v-for="user in users" 
        :key="user.id"
        class="flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
        @click="linktoUser(user.id)"
      >
        <div>
          <div class="border border-[#0a73c0] p-[4px] rounded-full inline-block">
            <div class="avatar w-[158px] h-[158px] rounded-full overflow-hidden">
              <img 
                class="w-full h-full object-cover" 
                :src="user.avatar" 
                alt="User avatar"
              >
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const users = ref([])

const fetchUsers = async () => {
  try {
    const response = await fetch('https://roombooking-fa3a.onrender.com/api/users')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

function linktoUser(id) {
  router.push(`/user-property/${id}`)
}

onMounted(() => {
  fetchUsers()
})
</script>
