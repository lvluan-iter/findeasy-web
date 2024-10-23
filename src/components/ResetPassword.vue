<template>
  <div>
    <div class="flex gap-4 items-center my-5 ml-4 md:ml-8 lg:ml-[120px] mt-14">
      <div
        class="text-blue-600 font-medium cursor-pointer inline-block hover:underline"
        @click="$router.go(-1)"
      >
        <i class="fa-solid fa-angle-left" />
        Back
      </div>
      <div class="flex items-center w-px h-5 bg-gray-600" />
      <div class="font-semibold text-lg text-gray-800">
        Forgot Password
      </div>
    </div>

    <hr>
    <div
      class="rounded-lg shadow-lg w-full max-w-md mx-auto my-5 p-5 sm:p-8 lg:p-10 text-center box-border relative animate-bounceIn"
    >
      <img
        src="../assets/forgot-password.png"
        alt="Image"
        class="w-3/4 mb-4 object-contain mx-auto"
      >
      <h2 class="m-0 mb-2 text-gray-800 text-xl md:text-2xl font-semibold animate-fadeIn">
        Password Reset
      </h2>
      <span class="text-gray-600">Fill with your mail to receive instructions on how to reset your
        password.</span>
      <form
        class="mt-5"
        @submit.prevent="handleResetPasswordSubmit"
      >
        <div class="form-group relative mb-5 text-left animate-fade-in-up">
          <label
            :class="{ 'active': newPassword.length > 0 || isFocusedNewPassword }"
            for="new-password"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-base"
          >New
            Password</label>
          <input
            v-model="newPassword"
            class="w-full p-3 border border-gray-300 rounded-lg text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="password"
            required
            @focus="isFocusedNewPassword = true"
            @blur="isFocusedNewPassword = false"
          >
        </div>
        <button
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none rounded-lg text-lg cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:scale-105 active:scale-95"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const newPassword = ref('');
const isFocusedNewPassword = ref(false);
const token = computed(() => route.query.token);

const handleResetPasswordSubmit = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newPassword: newPassword.value,
        token: token.value
      })
    });

    if (!response.ok) {
      window.alert("Error resetting password. Please try again.");
    } else {
      window.alert("Password reset successful! You can now log in with your new password.");
      router.push('/login');
    }
  } catch (error) {
    console.log("Error processing data", error);
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