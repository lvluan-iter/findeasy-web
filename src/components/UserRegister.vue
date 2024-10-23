<template>
  <div class="flex flex-col items-start px-4 md:px-12 lg:px-20 lg:mt-14 xl:px-32 mt-5">
    <div
      class="mb-2 text-[#0a73c2] font-medium cursor-pointer hover:underline"
      @click="$router.push('/')"
    >
      <i class="fa-solid fa-angle-left" />
      Quay lại
    </div>
    <hr class="w-full mb-5">
    <div class="flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-16 w-full animate-bounceIn">
      <div class="w-full md:w-1/2 lg:w-2/5">
        <img
          class="w-full h-auto object-contain"
          src="@/assets/login.png"
          alt="login-image"
        >
      </div>
      <form
        id="register"
        method="POST"
        class="w-full md:w-1/2 lg:w-2/5"
        @submit.prevent="handleUserRegister"
      >
        <h2
          class="text-[#212529] text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeIn mb-2 text-center"
        >
          Đăng ký tài khoản!
        </h2>
        <span class="text-gray-600 block mb-4 text-sm md:text-base text-center">Vui lòng thực hiện các bước đăng ký tài khoản.</span>
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
        <fieldset class="border border-none p-0 mx-0 my-5">
          <legend class=" text-left text-[#007bff] font-semibold mb-2.5 text-lg">
            Thông tin đăng nhập :
          </legend>
          <div class="form-group-inline flex justify-between">
            <div
              :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]"
            >
              <label
                :class="{ 'active': username.length > 0 || isFocusedUsername }"
                for="username"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
              >Tên đăng nhập</label>
              <input
                v-model="username"
                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="text"
                required
                @focus="isFocusedUsername = true"
                @blur="isFocusedUsername = false"
              >
            </div>
            <div
              :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]"
            >
              <label
                :class="{ 'active': password.length > 0 || isFocusedPassword }"
                for="password"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
              >Mật khẩu</label>
              <input
                v-model="password"
                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="password"
                required
                @focus="isFocusedPassword = true"
                @blur="isFocusedPassword = false"
              >
            </div>
          </div>
          <div
            :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]"
          >
            <label
              :class="{ 'active': rewritepassword.length > 0 || isFocusedRewritePassword }"
              for="rewrite-password"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
            >Nhập lại mật khẩu</label>
            <input
              v-model="rewritepassword"
              class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="password"
              required
              @focus="isFocusedRewritePassword = true"
              @blur="isFocusedRewritePassword = false"
            >
            <span
              v-if="passwordMismatch"
              class="text-red-600 text-xs"
            >Nhập lại mật khẩu không khớp</span>
          </div>
        </fieldset>
        <fieldset class="border border-none p-0 mx-0 my-5">
          <legend class=" text-left text-[#007bff] font-semibold mb-2.5 text-lg">
            Thông tin cá nhân :
          </legend>
          <div class="form-group relative mb-6 text-left animate-fade-in-up">
            <label
              :class="{ 'active': email.length > 0 || isFocusedEmail }"
              for="email"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
            >Địa chỉ email</label>
            <input
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="email"
              required
              @focus="isFocusedEmail = true"
              @blur="isFocusedEmail = false"
            >
          </div>
          <div class="form-group relative mb-6 text-left animate-fade-in-up">
            <label
              :class="{ 'active': fullname.length > 0 || isFocusedFullname }"
              for="fullname"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
            >Tên đầy đủ</label>
            <input
              v-model="fullname"
              class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="text"
              required
              @focus="isFocusedFullname = true"
              @blur="isFocusedFullname = false"
            >
          </div>
          <div class="form-group-inline flex justify-between">
            <div class="form-group relative mb-6 text-left animate-fade-in-up">
              <label
                :class="{ 'active': gender.length > 0 || isFocusedGender }"
                for="gender"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
              >Giới tính</label>
              <select
                v-model="gender"
                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                required
                @focus="isFocusedGender = true"
                @blur="isFocusedGender = false"
              >
                <option value="male">
                  Nam
                </option>
                <option value="female">
                  Nữ
                </option>
                <option value="other">
                  Khác
                </option>
              </select>
            </div>
            <div class="form-group relative mb-6 text-left animate-fade-in-up">
              <input
                v-model="birthdate"
                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="date"
                required
              >
            </div>
          </div>
          <div class="form-group relative mb-6 text-left animate-fade-in-up">
            <label
              :class="{ 'active': phoneNumber.length > 0 || isFocusedPhoneNumber }"
              for="phoneNumber"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base"
            >Số điện thoại</label>
            <input
              v-model="phoneNumber"
              class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="tel"
              @focus="isFocusedPhoneNumber = true"
              @blur="isFocusedPhoneNumber = false"
            >
          </div>
        </fieldset>
        <button
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg text-sm md:text-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95"
          type="submit"
        >
          Đăng ký
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

// Router
const router = useRouter();
const $toast = useToast();

// Form state
const username = ref('');
const password = ref('');
const rewritepassword = ref('');
const email = ref('');
const fullname = ref('');
const phoneNumber = ref('');
const gender = ref('');
const birthdate = ref('');
const passwordMismatch = ref(false);
const isFocusedUsername = ref(false);
const isFocusedPassword = ref(false);
const isFocusedRewritePassword = ref(false);
const isFocusedEmail = ref(false);
const isFocusedFullname = ref(false);
const isFocusedPhoneNumber = ref(false);
const isFocusedGender = ref(false);

// Methods
const handleUserRegister = async () => {
  if (rewritepassword.value === password.value) {
    passwordMismatch.value = false;
    try {
      const response = await fetch('https://roombooking-fa3a.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          email: email.value,
          fullname: fullname.value,
          phoneNumber: phoneNumber.value,
          gender: gender.value,
          birthday: birthdate.value,
        }),
      });

      const results = await response.text();

      if (response.status !== 201) {
        $toast.open({
          message: results,
          type: 'error',
          duration: 5000,
          dismissible: true,
          position: 'top',
        });
      } else {
        $toast.open({
          message: results,
          type: 'success',
          duration: 5000,
          dismissible: true,
          position: 'top-right',
        });
        router.push('/login');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý dữ liệu', error);
    }
  } else {
    passwordMismatch.value = true;
  }
};
</script>


<style scoped>
.form-group-inline .form-group {
    flex: 1;
    margin-right: 10px;
}

.form-group-inline .form-group:last-child {
    margin-right: 0;
}

.form-group label.active {
    top: -8px;
    left: 12px;
    font-size: 12px;
    color: #6e8efb;
}

.input-error input {
    border-color: red;
}
</style>
