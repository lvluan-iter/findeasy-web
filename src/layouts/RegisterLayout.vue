<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <BackHeader title="Đăng ký tài khoản" />

    <div class="flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-16 w-full animate-bounceIn">
      <!-- Hình minh họa -->
      <div class="w-full md:w-1/2 lg:w-2/5">
        <img class="w-full h-auto object-contain" src="@/assets/images/login.png" alt="register-image" />
      </div>

      <!-- Form Đăng ký -->
      <form id="register" method="POST" class="w-full md:w-1/2 lg:w-2/5" @submit.prevent="handleUserRegister">
        <h2 class="text-[#212529] text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeIn mb-2 text-center">
          Đăng ký tài khoản!
        </h2>
        <span class="text-gray-600 block mb-4 text-sm md:text-base text-center">
          Vui lòng thực hiện các bước đăng ký tài khoản.
        </span>

        <!-- Đăng nhập Google -->
        <div
          class="my-4 bg-gray-100 text-gray-700 shadow-md px-5 py-3 flex items-center gap-4 rounded-lg text-sm md:text-base cursor-pointer"
        >
          <i class="fa-brands fa-google" />
          Đăng nhập bằng tài khoản Google
        </div>

        <span class="text-gray-600 block text-sm md:text-base mb-4 text-center">
          Chúng tôi sẽ không đăng bất cứ điều gì mà không có sự cho phép của bạn và thông tin của bạn sẽ được giữ kín.
        </span>

        <!-- Divider -->
        <div class="flex items-center justify-between my-6">
          <div class="h-px bg-gray-300 flex-grow" />
          <span class="mx-4 text-gray-600 text-sm md:text-base">Hoặc</span>
          <div class="h-px bg-gray-300 flex-grow" />
        </div>

        <!-- Thông tin đăng nhập -->
        <fieldset class="border border-none p-0 mx-0 my-5">
          <legend class="text-left text-[#007bff] font-semibold mb-2.5 text-lg">Thông tin đăng nhập :</legend>

          <BaseInput id="username" v-model="username" label="Tên đăng nhập" required />
          <BaseInput id="password" v-model="password" label="Mật khẩu" type="password" required />
          <BaseInput
            id="rewritepassword"
            v-model="rewritepassword"
            label="Nhập lại mật khẩu"
            type="password"
            required
          />
          <span v-if="passwordMismatch" class="text-red-600 text-xs">Nhập lại mật khẩu không khớp</span>
        </fieldset>

        <!-- Thông tin cá nhân -->
        <fieldset class="border border-none p-0 mx-0 my-5">
          <legend class="text-left text-[#007bff] font-semibold mb-2.5 text-lg">Thông tin cá nhân :</legend>

          <BaseInput id="email" v-model="email" label="Địa chỉ email" type="email" required />
          <BaseInput id="fullname" v-model="fullname" label="Tên đầy đủ" required />

          <div class="flex gap-4">
            <BaseSelect
              id="gender"
              v-model="gender"
              class="flex-1"
              label="Giới tính"
              :options="genderOptions"
              required
            />
            <BaseInput id="birthdate" v-model="birthdate" class="flex-1" type="date" required />
          </div>

          <BaseInput id="phoneNumber" v-model="phoneNumber" label="Số điện thoại" type="tel" />
        </fieldset>

        <!-- Submit -->
        <SubmitButton :loading="isSubmitting" text="Đăng ký" loading-text="Đang đăng ký..." />

        <!-- Error -->
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useToast} from '@/stores/useToast';
import 'vue-toast-notification/dist/theme-default.css';
import BackHeader from '@/components/BackHeader.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import http from '@/api/httpClient';

const router = useRouter();
const {showToast} = useToast();

const username = ref('');
const password = ref('');
const rewritepassword = ref('');
const email = ref('');
const fullname = ref('');
const phoneNumber = ref('');
const gender = ref('');
const birthdate = ref('');
const passwordMismatch = ref(false);
const genderOptions = ref([
  {value: 'male', label: 'Nam'},
  {value: 'female', label: 'Nữ'},
  {value: 'other', label: 'Khác'}
]);

const handleUserRegister = async () => {
  if (rewritepassword.value === password.value) {
    passwordMismatch.value = false;
    try {
      const response = await http.post(Endpoint.register, {
        username: username.value,
        password: password.value,
        email: email.value,
        fullname: fullname.value,
        phoneNumber: phoneNumber.value,
        gender: gender.value,
        birthdate: birthdate.value
      });

      if (response.succeeded) {
        showToast.success('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        router.push('/login');
      } else {
        const errorMessage = response.errors.join(', ');
        showToast.error(`Đăng ký thất bại: ${errorMessage}`, 'error');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý dữ liệu', error);
      showToast.error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.', 'error');
    }
  } else {
    passwordMismatch.value = true;
    showToast.error('Mật khẩu không khớp. Vui lòng kiểm tra lại.', 'error');
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
