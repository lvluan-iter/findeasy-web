<template>
  <header
    ref="header"
    :class="[
      'w-full h-auto flex justify-between items-center box-border bg-[rgb(10,115,192)] px-3 py-5 lg:px-[120px] lg:pb-14 md:px-3 md:py-5 md:h-auto',
      {'fixed top-0 left-0 right-0 z-50': !isLargeScreen}
    ]"
  >
    <div class="flex gap-2.5 items-center text-white text-2xl md:text-3xl cursor-pointer" @click="goToHome">
      <i class="fa-solid fa-house-circle-check text-2xl md:text-3xl" />
      <h1 class="logo-text">FINDEASY</h1>
      <div class="flex lg:hidden items-center w-[1px] h-[40px] bg-white mx-1 sm:mx-[20px]" />
    </div>
    <div class="hidden lg:flex gap-5 items-center">
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-clock text-3xl" />
        <div class="item-text text-xs">
          <span>TH2 - TH6: 08:00AM - 20:00PM</span><br />
          <span>Thứ 7 và Chủ nhật - Nghỉ</span>
        </div>
      </div>
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-mobile text-3xl" />
        <div class="item-text text-xs">
          <span>+ 0392 788 740</span><br />
          <span>Liên hệ để được hỗ trợ</span>
        </div>
      </div>
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-building-flag text-3xl" />
        <div class="item-text text-xs">
          <span>B2/45G Tân Liêm</span><br />
          <span>Phong phú, Bình Chánh</span>
        </div>
      </div>
    </div>
    <div class="flex gap-1 lg:hidden">
      <div
        class="flex relative gap-2.5 p-3 text-[#0a73c0] bg-white text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg"
        @click="linkToUpload"
      >
        <i class="fa-solid fa-arrow-up-from-bracket text-lg" />
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0] group-hover:bg-white" />
        <span class="hidden sm:block">Đăng tin</span>
      </div>
      <button
        v-if="!userStore.isAuthenticated"
        class="flex gap-2.5 px-3.5 sm:px-5 py-2 text-[#0a73c0] bg-white text-base sm:text-[16px] items-center cursor-pointer rounded-md"
        @click="$router.push('/login')"
      >
        <i class="fa-solid fa-right-to-bracket" />
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0]" />
        <span class="hidden sm:block">Đăng nhập</span>
      </button>
      <button
        v-else
        class="flex gap-2.5 px-3.5 sm:px-5 py-2 text-[#0a73c0] bg-white text-base sm:text-[16px] items-center cursor-pointer rounded-md"
        @click="openUserSetting"
      >
        <i class="fa-solid fa-user" />
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0]" />
        <span class="hidden sm:block">{{ userStore.user?.fullname || 'User' }}</span>
      </button>
      <div
        class="relative flex py-3 px-4 text-[#0a73c0] bg-white text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg"
        @click="toggleDropdown"
      >
        <i class="fa-solid fa-bars" />
        <div
          v-if="isOpen"
          class="absolute top-0 right-0 flex flex-col gap-2 bg-white rounded-xl w-[calc(100vw-30px)] h-auto shadow-lg z-50 px-4 py-4 box-border"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <i class="fa-solid fa-house-circle-check text-3xl text-[#0a73c0] mr-2" />
              <span class="text-2xl text-[#2f2e41]">FINDEASY</span>
            </div>
            <div class="h-full w-10 flex items-center justify-end text-[#2f2e41]" @click="toggleDropdown">
              <i class="fa-solid fa-xmark text-xl" />
            </div>
          </div>
          <hr />
          <a href="/" class="block py-2 text-[#2f2e41]">Trang chủ</a>
          <a href="/about" class="block py-2 text-[#2f2e41]">Giới thiệu</a>
          <a href="/contact" class="block py-2 text-[#2f2e41]">Liên hệ</a>
        </div>
      </div>
      <ProfileSettingsDropdown v-if="userStore.isAuthenticated" ref="userdropdown" :user="userStore.user" />
    </div>
  </header>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useUserStore} from '../stores/userStore';
import ProfileSettingsDropdown from './ProfileSettingsDropdown.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const isOpen = ref(false);
const userdropdown = ref(null);
const header = ref(null);

const isLargeScreen = ref(window.innerWidth >= 1024);

const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};

const adjustContentPadding = () => {
  if (!isLargeScreen.value && header.value) {
    const headerHeight = header.value.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
  } else {
    document.body.style.paddingTop = '0px';
  }
};

onMounted(() => {
  checkScreenSize();
  adjustContentPadding();
  window.addEventListener('resize', () => {
    checkScreenSize();
    adjustContentPadding();
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('resize', adjustContentPadding);
});

const goToHome = () => {
  if (route.path === '/') {
    window.location.reload();
  } else {
    router.push('/');
  }
};

const linkToUpload = () => {
  if (route.path === '/upnew') {
    window.location.reload();
  } else {
    if (userStore.isAuthenticated) {
      router.push('/upnew');
    } else {
      localStorage.setItem('redirectAfterLogin', '/upnew');
      router.push('/login');
    }
  }
};

const openUserSetting = () => {
  userdropdown.value?.toggleDropdown();
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
@media (max-width: 767px) {
  .logo-text {
    font-size: 1.5rem;
  }
  .icon-text {
    font-size: 0.875rem;
  }
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  .dropdown-menu {
    width: 80vw;
  }
}
</style>
