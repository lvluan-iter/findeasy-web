<template>
  <div class="relative inline-block">
    <div
    class="dropdown-content absolute top-[70px] right-0 sm:right-0 left-auto sm:left-auto flex flex-col gap-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out w-[250px] sm:w-[325px]"
    :class="{ 'max-h-[80vh] p-2': isOpen, 'max-h-0 p-0': !isOpen }">
      <div class="flex p-2 items-center gap-3 sm:gap-5 bg-blue-50 rounded-xl">
        <div class="w-12 h-12 sm:w-[50px] sm:h-[50px] overflow-hidden rounded-xl shrink-0">
          <img class="w-full h-full object-cover" :src="user.avatar" alt="Avatar">
        </div>
        <div class="flex-grow flex items-center justify-between">
          <div class="text-sm sm:text-base font-medium truncate">Hi! {{ user.fullname }}</div>
          <button
            class="text-blue-600 hover:text-orange-500 transition-colors duration-300 ease-in-out"
            @click="$router.push('/profile')"
            aria-label="Edit profile">
            <i class="fa-solid fa-user-pen"></i>
          </button>
        </div>
      </div>

      <button v-for="(item, index) in menuItems" :key="index"
        class="flex p-2 items-center gap-3 sm:gap-5 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-300 ease-in-out text-left"
        @click="handleItemClick(item)">
        <div class="text-sm sm:text-base font-medium pl-3 sm:pl-[25px] flex-grow">{{ item.label }}</div>
        <div class="w-10 h-10 sm:w-[50px] sm:h-[50px] overflow-hidden rounded-xl flex items-center justify-center border border-gray-200 bg-gray-50 shrink-0">
          <i class="fa-solid fa-caret-right text-blue-600"></i>
        </div>
      </button>

      <button
        class="flex p-2 items-center gap-3 sm:gap-5 border border-gray-200 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out"
        @click="logout">
        <div class="w-10 h-10 sm:w-[50px] sm:h-[50px] overflow-hidden rounded-xl flex items-center justify-center border border-gray-200 bg-gray-50 shrink-0">
          <i class="fa-solid fa-right-from-bracket text-blue-600"></i>
        </div>
        <div class="text-sm sm:text-base font-medium text-white flex-grow text-center">Log Out</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      menuItems: [
        { label: 'Dashboard', route: '/dashboard' },
        { label: 'Your Property', route: '/property' },
        { label: 'Your Request', route: '/request' },
        { label: 'Edit Profile', route: '/profile' }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleItemClick(item) {
      this.$router.push(item.route);
      this.isOpen = false;
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      this.$router.push('/login');
      this.isOpen = false;
    }
  }
};
</script>