<template>
  <div>
    <PropertyDetail :id="Number(route.params.id)" @load-nearby-property="updatePropertiesNearBy" />
    <NearbyArea :info="info" />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import PropertyDetail from '../components/PropertyDetail.vue';
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
