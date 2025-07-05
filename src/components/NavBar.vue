<template>
  <div class="hidden lg:block">
    <nav
      :class="[
        'flex justify-between items-center bg-white/60 backdrop-blur-lg text-[#2c3038] h-[80px] w-full rounded-lg shadow-md',
        { 'fixed top-0 left-0 w-full shadow-md px-[120px] z-10 rounded-none': isSticky }
      ]"
    >
      <div class="flex items-center">
        <div
          v-if="isSticky"
          class="flex items-center text-3xl"
        >
          <i class="fa-solid fa-house-circle-check text-[#0a73c0] mr-1.5" />
          <h1>FINDEASY</h1>
          <div class="flex items-center w-[1px] h-[40px] bg-black mx-[20px]" />
        </div>
        <ul class="flex list-none m-0 p-0">
          <li
            v-for="item in navItems"
            :key="item.label"
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 ease-in-out hover:text-[#0a73c0]"
            @click="item.action"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="flex gap-4">
        <div
          class="flex relative gap-2.5 p-3.5 text-gray-800 text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg hover:bg-[#0a73c0] hover:text-white hover:border-[#0a73c0] transition-all duration-300 ease-linear group"
          @click="linkToUpload"
        >
          <i class="fa-solid fa-arrow-up-from-bracket" />
          <div class="flex items-center w-[0.1px] h-[20px] bg-[#2c3038] group-hover:bg-white" />
          <span>Đăng tin</span>
        </div>
        <button
          v-if="!userStore.isAuthenticated"
          class="flex gap-2.5 px-5 py-3 text-white text-[16px] items-center bg-[#0a73c0] border border-[#0a73c0] cursor-pointer rounded-md hover:bg-[#0564a9] hover:border-[#0564a9] mr-5"
          @click="goToLogin"
        >
          <i class="fa-solid fa-right-to-bracket" />
          <div class="flex items-center w-[0.1px] h-[20px] bg-white" />
          <span>Đăng nhập</span>
        </button>
        <button
          v-else
          class="flex items-center gap-2.5 px-5 py-3 text-white text-[16px] bg-[#0a73c0] border border-[#0a73c0] cursor-pointer rounded-md hover:bg-[#0564a9] hover:border-[#0564a9] mr-5 relative group"
          @click="openUserSetting"
        >
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-user" />
            <span>{{ userStore.user.fullname }}</span>
          </div>
          <i class="fa-solid fa-chevron-down text-sm transition-transform duration-300 group-hover:rotate-180" />
        </button>
        <ProfileSettingsDropdown
          v-if="userStore.isAuthenticated"
          ref="userdropdown"
          :user="userStore.user"
        />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import ProfileSettingsDropdown from './ProfileSettingsDropdown.vue';

const router = useRouter();
const userStore = useUserStore();
const isSticky = ref(false);
const userdropdown = ref(null);

const navItems = [
  { label: 'Trang chủ', action: linkToHome },
  { label: 'Tin tức', action: () => {} },
  { label: 'Giới thiệu', action: () => {} },
  { label: 'Liên hệ', action: () => {} }
];

function linkToHome() {
  if (router.currentRoute.value.path === '/') {
    window.location.reload();
  } else {
    router.push('/');
  }
}

function linkToUpload() {
  if (router.currentRoute.value.path === '/upnew') {
    window.location.reload();
  } else {
    if (userStore.isAuthenticated) {
      router.push('/upnew');
    } else {
      localStorage.setItem('redirectAfterLogin', '/upnew');
      router.push('/login');
    }
  }
}

function goToLogin() {
  if (router.currentRoute.value.path === '/login') {
    window.location.reload();
  } else {
    router.push('/login');
  }
}

function openUserSetting() {
  userdropdown.value?.toggleDropdown();
}

function handleScroll() {
  isSticky.value = window.scrollY >= 300;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-item::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #0a73c0;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>