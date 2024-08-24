<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav" id="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <UserProfile :fuser="user" />
      <UserSave :propertyIds="user.favoritePropertyIds" />
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script>
import IconHeader from '../components/IconHeader.vue'
import WebFooter from '@/components/WebFooter.vue'
import NavBar from '@/components/NavBar.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserSave from '@/components/UserSave.vue'

export default {
  name: 'WebProfile',
  components: {
    IconHeader,
    UserProfile,
    WebFooter,
    NavBar,
    UserSave
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
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
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  }
}
</script>

<style scoped>
main {
  margin-top: 50px;
  display: flex;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 20px;
  padding: 0px 120px;
}

.nav {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 240px);
  z-index: 9999;
}
</style>
