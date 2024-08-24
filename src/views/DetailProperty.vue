<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav" id="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <PropertyDetail :id="id" @loadNearbyProperty="updatePropertiesNearBy" />
      <NearbyArea :info="info" />
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script>
import IconHeader from '../components/IconHeader.vue';
import PropertyDetail from '../components/PropertyDetail.vue';
import WebFooter from '@/components/WebFooter.vue';
import NavBar from '@/components/NavBar.vue';
import NearbyArea from '@/components/NearbyArea.vue';

export default {
  props: ['id'],
  components: {
    IconHeader,
    PropertyDetail,
    WebFooter,
    NavBar,
    NearbyArea
  },
  data() {
    return {
      info: {},
    }
  },
  methods: {
    updatePropertiesNearBy(newinfo) {
      console.log(newinfo);
      this.info = newinfo;
    }
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
</style>
