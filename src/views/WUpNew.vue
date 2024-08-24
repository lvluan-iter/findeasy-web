<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav" id="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <UpNew />
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
import UpNew from '@/components/UpNew.vue'

export default {
  name: 'WebLogin',
  components: {
    IconHeader,
    WebFooter,
    NavBar,
    UpNew
  },
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
</style>