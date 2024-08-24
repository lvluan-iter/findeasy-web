<template>
    <div class="flex flex-col items-start px-4 md:px-12 lg:px-20 lg:mt-14 xl:px-32 mt-5">
        <div class="mb-2 text-[#0a73c2] font-medium cursor-pointer hover:underline" @click="$router.push('/')">
            <i class="fa-solid fa-angle-left"></i>
            Back To Home
        </div>
        <hr class="w-full mb-5">
        <div class="flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-16 w-full animate-bounceIn">
            <div class="w-full md:w-1/2 lg:w-2/5">
                <img class="w-full h-auto object-contain" src="@/assets/login.png" alt="login-image">
            </div>
            <form id="register" @submit.prevent="handleUserRegister" method="POST" class="w-full md:w-1/2 lg:w-2/5">
                <h2
                    class="text-[#212529] text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeIn mb-2 text-center">
                    Sign up your account!</h2>
                <span class="text-gray-600 block mb-4 text-sm md:text-base text-center">Nice to see you! Please log in
                    with your account.</span>
                <div
                    class="my-4 bg-gray-100 text-gray-700 shadow-md px-5 py-3 flex items-center gap-4 rounded-lg text-sm md:text-base cursor-pointer">
                    <i class="fa-brands fa-google"></i>
                    Sign up with Google
                </div>
                <span class="text-gray-600 block text-sm md:text-base mb-4 text-center">We won't post anything without
                    your permission and your personal details are kept private.</span>
                <div class="flex items-center justify-between my-6">
                    <div class="h-px bg-gray-300 flex-grow"></div>
                    <span class="mx-4 text-gray-600 text-sm md:text-base">Or</span>
                    <div class="h-px bg-gray-300 flex-grow"></div>
                </div>
                <fieldset class="border border-none p-0 mx-0 my-5">
                    <legend class=" text-left text-[#007bff] font-semibold mb-2.5 text-lg">Thông tin đăng nhập :
                    </legend>
                    <div class="form-group-inline flex justify-between">
                        <div
                            :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]">
                            <label :class="{ 'active': username.length > 0 || isFocusedUsername }" for="username"
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Username</label>
                            <input
                                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                type="text" v-model="username" @focus="isFocusedUsername = true"
                                @blur="isFocusedUsername = false" required>
                        </div>
                        <div
                            :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]">
                            <label :class="{ 'active': password.length > 0 || isFocusedPassword }" for="password"
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Password</label>
                            <input
                                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                type="password" v-model="password" @focus="isFocusedPassword = true"
                                @blur="isFocusedPassword = false" required>
                        </div>
                    </div>
                    <div
                        :class="['form-group relative mb-6 text-left animate-fade-in-up', { 'input-error': passwordMismatch }]">
                        <label :class="{ 'active': rewritepassword.length > 0 || isFocusedRewritePassword }"
                            for="rewrite-password"
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Nhập
                            lại mật khẩu</label>
                        <input
                            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="password" v-model="rewritepassword" @focus="isFocusedRewritePassword = true"
                            @blur="isFocusedRewritePassword = false" required>
                        <span v-if="passwordMismatch" class="text-red-600 text-xs">Passwords do not match.</span>
                    </div>
                </fieldset>
                <fieldset class="border border-none p-0 mx-0 my-5">
                    <legend class=" text-left text-[#007bff] font-semibold mb-2.5 text-lg">Thông tin cá nhân :</legend>
                    <div class="form-group relative mb-6 text-left animate-fade-in-up">
                        <label :class="{ 'active': email.length > 0 || isFocusedEmail }" for="email"
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Email
                            address</label>
                        <input
                            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="email" v-model="email" @focus="isFocusedEmail = true" @blur="isFocusedEmail = false"
                            required>
                    </div>
                    <div class="form-group relative mb-6 text-left animate-fade-in-up">
                        <label :class="{ 'active': fullname.length > 0 || isFocusedFullname }" for="fullname"
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Full
                            Name</label>
                        <input
                            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="text" v-model="fullname" @focus="isFocusedFullname = true"
                            @blur="isFocusedFullname = false" required>
                    </div>
                    <div class="form-group-inline flex justify-between">
                        <div class="form-group relative mb-6 text-left animate-fade-in-up">
                            <label :class="{ 'active': gender.length > 0 || isFocusedGender }" for="gender"
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Gender</label>
                            <select
                                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                v-model="gender" @focus="isFocusedGender = true" @blur="isFocusedGender = false"
                                required>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group relative mb-6 text-left animate-fade-in-up">
                            <input
                                class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                type="date" v-model="birthdate" required>
                        </div>
                    </div>
                    <div class="form-group relative mb-6 text-left animate-fade-in-up">
                        <label :class="{ 'active': phoneNumber.length > 0 || isFocusedPhoneNumber }" for="phoneNumber"
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">Phone
                            Number</label>
                        <input
                            class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="tel" v-model="phoneNumber" @focus="isFocusedPhoneNumber = true"
                            @blur="isFocusedPhoneNumber = false">
                    </div>
                </fieldset>
                <button
                    class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg text-sm md:text-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95"
                    type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast);

export default {
    data() {
        return {
            username: '',
            password: '',
            rewritepassword: '',
            email: '',
            fullname: '',
            phoneNumber: '',
            gender: '',
            birthdate: '',
            passwordMismatch: false,
            isFocusedUsername: false,
            isFocusedPassword: false,
            isFocusedRewritePassword: false,
            isFocusedEmail: false,
            isFocusedFullname: false,
            isFocusedPhoneNumber: false,
            isFocusedGender: false
        };
    },
    methods: {
        async handleUserRegister() {
            if (this.rewritepassword === this.password) {
                this.passwordMismatch = false;
                try {
                    const response = await fetch('http://localhost:8080/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            fullname: this.fullname,
                            phoneNumber: this.phoneNumber,
                            gender: this.gender,
                            birthday: this.birthdate
                        })
                    });
                    if (response.status !== 201) {
                        const results = await response.text();
                        this.$toast.open({
                            message: results,
                            type: 'error',
                            duration: 5000,
                            dismissible: true,
                            position: 'top'
                        });
                        return;
                    } else {
                        const results = await response.text();
                        this.$toast.open({
                            message: results,
                            type: 'success',
                            duration: 5000,
                            dismissible: true,
                            position: 'top-right'
                        });
                        this.$router.push('/login');
                    }
                } catch (error) {
                    console.log("Lỗi trong quá trình xử lý dữ liệu", error);
                }
            } else {
                this.passwordMismatch = true;
            }
        }
    }
}
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
