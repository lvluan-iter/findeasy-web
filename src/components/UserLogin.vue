<template>
  <div class="flex flex-col items-start px-4 md:px-12 lg:px-20 lg:py-12 xl:px-32 py-5">
    <div
      class="mb-2 text-[#0a73c2] font-medium cursor-pointer hover:underline"
      @click="$router.push('/')"
    >
      <i class="fa-solid fa-angle-left" />
      Quay lại
    </div>

    <hr class="w-full mb-5">

    <div class="flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-16 w-full animate-bounceIn">
      <!-- Image -->
      <div class="w-full md:w-1/2 lg:w-2/5">
        <img
          class="w-full h-auto object-contain"
          src="@/assets/images/login.png"
          alt="login-image"
        >
      </div>

      <!-- Login Form -->
      <form
        id="login"
        method="post"
        class="w-full md:w-1/2 lg:w-2/5"
        @submit.prevent="handleUserSubmit"
      >
        <h2 class="text-[#212529] text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeIn mb-2 text-center">
          Đăng nhập tài khoản của bạn!
        </h2>
        <span class="text-gray-600 block mb-4 text-sm md:text-base text-center">Vui lòng đăng nhập bằng tài khoản của bạn.</span>
                
        <div
          class="my-4 bg-gray-100 text-gray-700 shadow-md px-5 py-3 flex items-center gap-4 rounded-lg text-sm md:text-base cursor-pointer"
        >
          <i class="fa-brands fa-google" />
          Đăng nhập bằng tài khoản Google
        </div>
                
        <span class="text-gray-600 block text-sm md:text-base mb-4 text-center">Chúng tôi sẽ không đăng bất cứ điều gì mà không có sự cho phép của bạn và thông tin của bạn sẽ được giữ kín.</span>
                
        <div class="flex items-center justify-between my-6">
          <div class="h-px bg-gray-300 flex-grow" />
          <span class="mx-4 text-gray-600 text-sm md:text-base">Hoặc</span>
          <div class="h-px bg-gray-300 flex-grow" />
        </div>

        <!-- Username Input -->
        <div class="form-group relative mb-6 text-left animate-fade-in-up">
          <label
            :class="{ 'active': username.length > 0 || isFocusedUsername }"
            for="username"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
          >Tên đăng nhập</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            @focus="isFocusedUsername = true"
            @blur="isFocusedUsername = false"
          >
        </div>

        <!-- Password Input -->
        <div class="form-group relative mb-6 text-left animate-fade-in-up">
          <label
            :class="{ 'active': password.length > 0 || isFocusedPassword }"
            for="password"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
          >Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            @focus="isFocusedPassword = true"
            @blur="isFocusedPassword = false"
          >
        </div>

        <div class="flex items-center justify-center gap-1.5">
          <span class="text-gray-600 text-sm md:text-base">Chưa có tài khoản ?</span>
          
          <a
            href="/register"
            class="text-blue-500 hover:underline text-sm md:text-base"
          >Đăng ký</a>
        </div>
        
        <a
          href="/forgot-password"
          class="block mb-4 text-blue-500 hover:underline text-sm md:text-base text-center"
        >Quên mật khẩu?</a>
                
        <button
          type="submit"
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg text-sm md:text-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          Đăng nhập
        </button>

        <p
          v-if="errorMessage"
          class="text-red-500 mt-4 text-center"
        >
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore'

const router = useRouter();
const userStore = useUserStore()

const username = ref('');
const password = ref('');
const isFocusedUsername = ref(false);
const isFocusedPassword = ref(false);
const errorMessage = ref('');

const handleUserSubmit = async () => {
  try {
    const success = await userStore.login({
      username: username.value,
      password: password.value,
    });

    if (success) {
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectTo);
    } else {
      errorMessage.value = 'Login failed. Please check your credentials and try again.';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.value = 'An unexpected error occurred. Please try again later.';
  }
};
</script>

<style scoped>
.form-group label.active {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #6e8efb;
}
</style>