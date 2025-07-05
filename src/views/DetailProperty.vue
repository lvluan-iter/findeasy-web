<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <PropertyDetail
        :id="Number(route.params.id)"
        @load-nearby-property="updatePropertiesNearBy"
      />
      <NearbyArea :info="info" />
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import IconHeader from '../components/IconHeader.vue';
import PropertyDetail from '../components/PropertyDetail.vue';
import WebFooter from '@/components/WebFooter.vue';
import NavBar from '@/components/NavBar.vue';
import NearbyArea from '@/components/NearbyArea.vue';

const route = useRoute();
const info = ref({});

const updatePropertiesNearBy = (newInfo) => {
  info.value = newInfo;
};
</script>

<style scoped>
.nav {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: calc(100% - 240px);
  z-index: 50;
}
</style>