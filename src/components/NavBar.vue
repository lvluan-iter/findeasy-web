<template>
  <div class="hidden lg:block">
    <nav
      data-testid="main-navbar"
      :class="[
        'flex justify-between items-center bg-white/60 backdrop-blur-lg text-[#2c3038] h-[80px] w-full rounded-lg shadow-md',
        {'fixed top-0 left-0 w-full shadow-md px-[120px] z-10 rounded-none': isSticky}
      ]"
    >
      <div class="flex items-center">
        <div v-if="isSticky" class="flex items-center text-3xl">
          <i class="fa-solid fa-house-circle-check text-[#0a73c0] mr-1.5" />
          <h1>FINDEASY</h1>
          <div class="flex items-center w-[1px] h-[40px] bg-black mx-[20px]" />
        </div>

        <ul class="flex list-none m-0 p-0">
          <li
            v-for="item in navItems"
            :key="item.label"
            :data-testid="`nav-item-${item.label.replace(/\s+/g, '').toLowerCase()}`"
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 hover:text-[#0a73c0]"
            @click="item.action"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <div class="flex gap-4">
        <div
          data-testid="nav-upload"
          class="flex relative gap-2.5 p-3.5 items-center cursor-pointer rounded-lg shadow-[0px_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#0a73c0] hover:text-white transition-all"
          @click="linkToUpload"
        >
          <i class="fa-solid fa-arrow-up-from-bracket" />
          <div class="w-[1px] h-[20px] bg-[#2c3038] group-hover:bg-white" />
          <span>Đăng tin</span>
        </div>

        <button
          v-if="!userStore.isAuthenticated"
          data-testid="nav-login"
          class="flex gap-2.5 px-5 py-3 text-white bg-[#0a73c0] rounded-md"
          @click="goToLogin"
        >
          <i class="fa-solid fa-right-to-bracket" />
          <span>Đăng nhập</span>
        </button>

        <button
          v-else
          data-testid="user-menu-toggle"
          :aria-expanded="isUserMenuOpen"
          class="flex items-center gap-2.5 px-5 py-3 text-white bg-[#0a73c0] rounded-md relative"
          @click="toggleUserMenu"
        >
          <i class="fa-solid fa-user" />
          <span data-testid="user-fullname">
            {{ userStore.user.fullname }}
          </span>

          <i
            class="fa-solid fa-chevron-down text-sm transition-transform duration-300"
            :class="{'rotate-180': isUserMenuOpen}"
          />
        </button>

        <ProfileSettingsDropdown
          v-if="userStore.isAuthenticated"
          ref="userdropdown"
          :user="userStore.user"
          @close="isUserMenuOpen = false"
        />
      </div>
    </nav>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/userStore';
import ProfileSettingsDropdown from './ProfileSettingsDropdown.vue';

const router = useRouter();
const userStore = useUserStore();

const isSticky = ref(false);
const isUserMenuOpen = ref(false);
const userdropdown = ref(null);

const navItems = [
  {label: 'Trang chủ', action: linkToHome},
  {label: 'Tin tức', action: () => {}},
  {label: 'Giới thiệu', action: () => {}},
  {label: 'Liên hệ', action: () => {}}
];

function toggleUserMenu() {
  const newState = userdropdown.value?.toggleDropdown();
  isUserMenuOpen.value = !!newState;
}

function linkToHome() {
  router.currentRoute.value.path === '/' ? window.location.reload() : router.push('/');
}

function linkToUpload() {
  if (!userStore.isAuthenticated) {
    localStorage.setItem('redirectAfterLogin', '/upnew');
    router.push('/login');
  } else {
    router.push('/upnew');
  }
}

function goToLogin() {
  router.push('/login');
}

function handleScroll() {
  isSticky.value = window.scrollY >= 300;
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.nav-item::after {
  content: '';
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
