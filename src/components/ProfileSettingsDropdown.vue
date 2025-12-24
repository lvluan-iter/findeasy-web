<template>
  <div class="relative inline-block">
    <div
      data-testid="user-menu"
      :aria-hidden="!isOpen"
      class="dropdown-content absolute top-[70px] right-0 flex flex-col gap-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out w-[300px]"
      :class="{
        'max-h-[80vh] p-2': isOpen,
        'max-h-0 p-0': !isOpen
      }"
    >
      <div class="flex p-2 items-center gap-4 bg-blue-50 rounded-xl">
        <div class="w-12 h-12 overflow-hidden rounded-xl">
          <img class="w-full h-full object-cover" :src="user.avatar" alt="Avatar" />
        </div>

        <div class="flex-grow flex justify-between items-center">
          <div class="font-medium truncate">Hi! {{ user.fullname }}</div>

          <button
            data-testid="user-menu-edit-profile"
            aria-label="Edit profile"
            class="text-blue-600 hover:text-orange-500"
            @click="goProfile"
          >
            <i class="fa-solid fa-user-pen" />
          </button>
        </div>
      </div>

      <button
        v-for="item in menuItems"
        :key="item.route"
        :data-testid="`user-menu-item-${item.route.replace('/', '')}`"
        class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 text-left"
        @click="handleItemClick(item)"
      >
        <span class="flex-grow font-medium">
          {{ item.label }}
        </span>
        <i class="fa-solid fa-caret-right text-blue-600" />
      </button>

      <button
        data-testid="user-menu-logout"
        class="flex items-center gap-3 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        @click="handleLogout"
      >
        <i class="fa-solid fa-right-from-bracket" />
        <span class="flex-grow text-center font-medium"> Đăng Xuất </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/userStore';

defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const router = useRouter();
const userStore = useUserStore();
const isOpen = ref(false);

const menuItems = [
  {label: 'Tổng Quan', route: '/dashboard'},
  {label: 'Quản Lý BĐS', route: '/yourproperty'},
  {label: 'Yêu Cầu', route: '/tourrequest'},
  {label: 'Tài Khoản', route: '/profile'}
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  return isOpen.value;
};

function handleItemClick(item) {
  router.push(item.route);
  close();
}

function goProfile() {
  router.push('/profile');
  close();
}

function handleLogout() {
  userStore.logout();
  router.push('/login');
  close();
}

function close() {
  isOpen.value = false;
  emit('close');
}

defineExpose({toggleDropdown});
</script>
