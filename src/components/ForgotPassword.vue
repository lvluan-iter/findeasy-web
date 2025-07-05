<template>
  <div>
    <div class="flex gap-4 items-center my-5 ml-4 md:ml-8 lg:ml-[120px] mt-14">
      <div
        class="text-blue-600 font-medium cursor-pointer inline-block hover:underline"
        @click="$router.go(-1);"
      >
        <i class="fa-solid fa-angle-left" />
        Quay lại
      </div>
      <div class="flex items-center w-px h-5 bg-gray-600" />
      <div class="font-semibold text-lg text-gray-800">
        Quên mật khẩu
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
        Quên mật khẩu
      </h2>
      <span class="text-gray-600">Điền email của bạn để nhận hướng dẫn về cách đặt lại mật khẩu.</span>
      <form
        class="mt-5"
        @submit.prevent="handleForgotPasswordSubmit"
      >
        <div class="relative mb-5 text-left animate-fade-in-up">
          <label
            :class="{ 'transform -translate-y-11 scale-75 text-[#6e8efb]': email.length > 0 || isFocusedEmail }"
            for="email"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-base"
          >Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-3 border border-gray-300 rounded-lg text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            @focus="isFocusedEmail = true"
            @blur="isFocusedEmail = false"
          >
        </div>
        <button
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none rounded-lg text-lg cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:scale-105 active:scale-95"
          type="submit"
        >
          Gửi yêu cầu quên mật khẩu
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const email = ref('')
    const isFocusedEmail = ref(false)

    const handleForgotPasswordSubmit = async() => {
      try {
        const response = await fetch('https://roombooking-fa3a.onrender.com/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email.value })
        });
        if (!response.ok) {
          window.alert("Error sending reset link. Please try again.");
        } else {
          window.alert("Reset link sent! Please check your email.");
        }
      } catch (error) {
        console.log("Error processing data", error);
      }
    }

    return {
      email,
      isFocusedEmail,
      handleForgotPasswordSubmit
    }
  }
}
</script>