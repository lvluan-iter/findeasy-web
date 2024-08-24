<template>
  <div
    class="w-full h-auto flex justify-between items-center box-border bg-[rgb(10,115,192)] px-3 py-5 lg:px-[120px] lg:pb-14 md:px-3 md:py-5 md:h-auto">
    <div class="flex gap-2.5 items-center text-white text-2xl md:text-3xl">
      <i class="fa-solid fa-house-circle-check text-2xl md:text-3xl"></i>
      <span class="logo-text">FINDEASY</span>
      <div class="flex lg:hidden items-center w-[1px] h-[40px] bg-white mx-1 sm:mx-[20px]"></div>
    </div>
    <div class="hidden lg:flex gap-5 items-center">
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-clock text-3xl"></i>
        <div class="item-text text-xs">
          <span>MON - FRI: 08:00AM - 20:00PM</span><br>
          <span>Saturday and Sunday - CLOSED</span>
        </div>
      </div>
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-mobile text-3xl"></i>
        <div class="item-text text-xs">
          <span>+ 0392 788 740</span><br>
          <span>Contact Us For Help</span>
        </div>
      </div>
      <div class="flex gap-2.5 items-center text-white">
        <i class="fa-solid fa-building-flag text-3xl"></i>
        <div class="item-text text-xs">
          <span>34th Avenue</span><br>
          <span>New York, W2 3XE</span>
        </div>
      </div>
    </div>
    <div class="flex gap-1 lg:hidden">
      <div
        class="flex relative gap-2.5 p-3 text-[#0a73c0] bg-white text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg"
        @click="linkToUpload">
        <i class="fa-solid fa-arrow-up-from-bracket text-lg"></i>
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0] group-hover:bg-white"></div>
        <span class="hidden sm:block">Upload</span>
      </div>
      <button v-if="!isAuthenticated" @click="$router.push('/login')"
        class="flex gap-2.5 px-3.5 sm:px-5 py-2 text-[#0a73c0] bg-white text-base sm:text-[16px] items-center cursor-pointer rounded-md">
        <i class="fa-solid fa-right-to-bracket"></i>
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0]"></div>
        <span class="hidden sm:block">Login/Sign Up</span>
      </button>
      <button v-else @click="openUserSetting"
        class="flex gap-2.5 px-3.5 sm:px-5 py-2 text-[#0a73c0] bg-white text-base sm:text-[16px] items-center cursor-pointer rounded-md">
        <i class="fa-solid fa-user"></i>
        <div class="hidden sm:flex items-center w-[0.1px] h-[20px] bg-[#0a73c0]"></div>
        <span class="hidden sm:block">{{ user.fullname }}</span>
      </button>
      <div
        class="relative flex py-3 px-4 text-[#0a73c0] bg-white text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg"
        @click="toggleDropdown">
        <i class="fa-solid fa-bars"></i>
        <div v-if="isOpen"
          class="absolute top-0 right-0 flex flex-col gap-2 bg-white rounded-xl w-[calc(100vw-30px)] h-auto shadow-lg z-50 px-4 py-4 box-border">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <i class="fa-solid fa-house-circle-check text-3xl text-[#0a73c0] mr-2"></i>
              <span class="text-2xl text-[#2f2e41]">FINDEASY</span>
            </div>
            <div class="h-full w-10 flex items-center justify-end text-[#2f2e41]" @click="this.isOpen=false">
              <i class="fa-solid fa-xmark text-xl"></i>
            </div>
          </div>
          <hr>
          <a href="/" class="block py-2 text-[#2f2e41]">Home</a>
          <a href="/about" class="block py-2 text-[#2f2e41]">About Us</a>
          <a href="/contact" class="block py-2 text-[#2f2e41]">Contact</a>
        </div>
      </div>
      <ProfileSettingsDropdown ref="userdropdown" :user="user" />
    </div>
  </div>
</template>

<script>
import ProfileSettingsDropdown from './ProfileSettingsDropdown.vue';

export default {
  components: {
    ProfileSettingsDropdown,
  },
  data() {
    return {
      isAuthenticated: false,
      isOpen: false,
      user: {},
    };
  },
  methods: {
    linkToUpload() {
      if (this.$router.currentRoute.path === '/upnew') {
        window.location.reload();
      } else {
        if (this.isAuthenticated) {
          this.$router.push('/upnew');
        } else {
          if (this.$router.currentRoute.path === '/login') {
            window.location.reload();
          } else {
            localStorage.setItem('redirectAfterLogin', '/upnew');
            this.$router.push('/login');
          }
        }
      }
    },
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/users/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          this.user = await response.json();
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    openUserSetting() {
      this.$refs.userdropdown.toggleDropdown();
    },
    openMenuDropdown() {
      this.$refs.menudropdown.toggleDropdown();
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const token = localStorage.getItem('jwt');
    if (token) {
      this.fetchUserInfo();
    }
  },
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