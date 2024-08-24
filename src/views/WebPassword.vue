<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav" id="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <ForgotPassword />
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
import ForgotPassword from '@/components/ForgotPassword.vue';

export default {
  components: {
    IconHeader,
    ForgotPassword,
    WebFooter,
    NavBar,
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.nav {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 240px);
  z-index: 9999;
}

main {
  margin-bottom: 80px;
}
</style>
