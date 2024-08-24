<template>
  <div class="hidden lg:block">
    <nav
      :class="['flex justify-between items-center bg-white/60 backdrop-blur-lg text-[#2c3038] h-[80px] w-full rounded-lg shadow-md', { 'fixed top-0 left-0 w-full shadow-md px-[120px] z-[1000] rounded-none': isSticky}]">
      <div class="flex items-center">
        <div class="flex items-center text-3xl" v-if="isSticky">
          <i class="fa-solid fa-house-circle-check text-[#0a73c0] mr-1.5"></i>
          <span>FINDEASY</span>
          <div class="flex items-center w-[1px] h-[40px] bg-black mx-[20px]"></div>
        </div>
        <ul class="flex list-none m-0 p-0">
          <li
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 ease-in-out hover:text-[#0a73c0]"
            @click="linkToHome">Trang chủ</li>
          <li
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 ease-in-out hover:text-[#0a73c0]">
            Tin tức</li>
          <li
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 ease-in-out hover:text-[#0a73c0]">
            Giới thiệu</li>
          <li
            class="nav-item mx-[20px] cursor-pointer text-[1.1em] relative transition-colors duration-300 ease-in-out hover:text-[#0a73c0]">
            Liên hệ</li>
        </ul>
      </div>
      <div class="flex gap-4">
        <div
          class="flex relative gap-2.5 p-3.5 text-gray-800 text-base items-center shadow-[0px_4px_16px_rgba(0,0,0,0.2)] cursor-pointer rounded-lg hover:bg-[#0a73c0] hover:text-white hover:border-[#0a73c0] transition-all duration-300 ease-linear group"
          @click="linkToUpload">
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
          <div class="flex items-center w-[0.1px] h-[20px] bg-[#2c3038] group-hover:bg-white"></div>
          <span>Add Property</span>
        </div>
        <button v-if="!isAuthenticated" @click="$router.push('/login')"
          class="flex gap-2.5 px-5 py-3 text-white text-[16px] items-center bg-[#0a73c0] border border-[#0a73c0] cursor-pointer rounded-md hover:bg-[#0564a9] hover:border-[#0564a9]">
          <i class="fa-solid fa-right-to-bracket"></i>
          <div class="flex items-center w-[0.1px] h-[20px] bg-white"></div>
          <span>Login/Sign Up</span>
        </button>
        <button v-else @click="openUserSetting"
          class="flex gap-2.5 px-5 py-3 text-white text-[16px] items-center bg-[#0a73c0] border border-[#0a73c0] cursor-pointer rounded-md hover:bg-[#0564a9] hover:border-[#0564a9]">
          <i class="fa-solid fa-bell"></i>
          <div class="flex items-center w-[0.1px] h-[20px] bg-white"></div>
          <span>{{ user.fullname }}</span>
        </button>
        <ProfileSettingsDropdown ref="userdropdown" :user="user" />
      </div>
    </nav>
  </div>
</template>

<script>
import ProfileSettingsDropdown from './ProfileSettingsDropdown.vue';

export default {
  components: {
    ProfileSettingsDropdown
  },
  data() {
    return {
      isAuthenticated: false,
      user: {},
      isSticky: false
    };
  },
  methods: {
    linkToHome() {
      if (this.$router.currentRoute.path === '/') {
        window.location.reload();
      } else {
        this.$router.push('/');
      }
    },
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
    handleScroll() {
      this.isSticky = window.scrollY >= 300;
      console.log('isSticky:', this.isSticky);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const token = localStorage.getItem('jwt');
    if (token) {
      this.fetchUserInfo();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
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
