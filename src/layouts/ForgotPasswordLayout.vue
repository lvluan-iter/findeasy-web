<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <BackHeader title="Quên mật khẩu" />

    <div
      class="rounded-lg shadow-lg w-full max-w-md mx-auto my-5 p-5 sm:p-8 lg:p-10 text-center box-border relative animate-bounceIn"
    >
      <img src="../assets/images/forgot-password.png" alt="Image" class="w-3/4 mb-4 object-contain mx-auto" />
      <h2 class="m-0 mb-2 text-gray-800 text-xl md:text-2xl font-semibold animate-fadeIn">Quên mật khẩu</h2>
      <span class="text-gray-600">Điền email của bạn để nhận hướng dẫn về cách đặt lại mật khẩu.</span>
      <form class="mt-5" @submit.prevent="handleForgotPasswordSubmit">
        <BaseInput id="email" v-model="email" label="Email" type="email" required />
        <SubmitButton :loading="isSubmitting" text="Gửi hướng dẫn" loading-text="Đang gửi..." />
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';
import BackHeader from '@/components/BackHeader.vue';
import BaseInput from '@/components/BaseInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';

const email = ref('');
const isSubmitting = ref(false);
const {proxy} = getCurrentInstance();

const handleForgotPasswordSubmit = async () => {
  isSubmitting.value = true;
  try {
    const response = await proxy.$http.post(Endpoint.forgotPassword, {
      email: email.value
    });

    if (response.success) {
      window.alert('Reset link sent! Please check your email.');
    } else {
      window.alert('Error sending reset link. Please try again.');
    }
  } catch (error) {
    console.log('Error processing data', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
