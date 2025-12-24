<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <BackHeader title="Đăng nhập" />

    <div class="flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-16 w-full animate-bounceIn">
      <!-- Image -->
      <div class="w-full md:w-1/2 lg:w-2/5">
        <img class="w-full h-auto object-contain" src="@/assets/images/login.png" alt="login-image" />
      </div>

      <!-- Login Form -->
      <form id="login" method="post" class="w-full md:w-1/2 lg:w-2/5" @submit.prevent="handleUserSubmit">
        <h2 class="text-[#212529] text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeIn mb-2 text-center">
          Đăng nhập tài khoản của bạn!
        </h2>
        <span class="text-gray-600 block mb-4 text-sm md:text-base text-center"
          >Vui lòng đăng nhập bằng tài khoản của bạn.</span
        >

        <div
          class="my-4 bg-gray-100 text-gray-700 shadow-md px-5 py-3 flex items-center gap-4 rounded-lg text-sm md:text-base cursor-pointer"
        >
          <i class="fa-brands fa-google" />
          Đăng nhập bằng tài khoản Google
        </div>

        <span class="text-gray-600 block text-sm md:text-base mb-4 text-center"
          >Chúng tôi sẽ không đăng bất cứ điều gì mà không có sự cho phép của bạn và thông tin của bạn sẽ được giữ
          kín.</span
        >

        <div class="flex items-center justify-between my-6">
          <div class="h-px bg-gray-300 flex-grow" />
          <span class="mx-4 text-gray-600 text-sm md:text-base">Hoặc</span>
          <div class="h-px bg-gray-300 flex-grow" />
        </div>

        <BaseInput id="username" v-model="username" label="Tên đăng nhập" required />
        <BaseInput id="password" v-model="password" label="Mật khẩu" type="password" required />

        <div class="flex items-center justify-center gap-1.5">
          <span class="text-gray-600 text-sm md:text-base">Chưa có tài khoản ?</span>

          <a href="/register" class="text-blue-500 hover:underline text-sm md:text-base">Đăng ký</a>
        </div>

        <a href="/forgot-password" class="block mb-4 text-blue-500 hover:underline text-sm md:text-base text-center"
          >Quên mật khẩu?</a
        >

        <SubmitButton :loading="isSubmitting" text="Đăng nhập" loading-text="Đang đăng nhập..." />
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/userStore';
import BackHeader from '@/components/BackHeader.vue';
import BaseInput from '@/components/BaseInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';

const router = useRouter();
const userStore = useUserStore();

const username = ref('');
const password = ref('');
const isSubmitting = ref(false);

const handleUserSubmit = async () => {
  isSubmitting.value = true;
  try {
    const success = await userStore.login({
      username: username.value,
      password: password.value
    });

    if (success) {
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectTo);
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
