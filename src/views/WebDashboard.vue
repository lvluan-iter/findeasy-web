<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <DashBoard />
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script setup>
import IconHeader from '../components/IconHeader.vue'
import WebFooter from '@/components/WebFooter.vue'
import NavBar from '@/components/NavBar.vue'
import DashBoard from '@/components/DashBoard.vue';
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
</style>