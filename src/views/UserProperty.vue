<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <nav class="nav">
        <NavBar />
      </nav>
    </header>
    <main>
      <UProfile 
        :user="user" 
        :property-count="properties.length"
      />
      <PropertyCard :properties="properties" />
    </main>
    <footer>
      <WebFooter />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { Endpoint } from '@/constants/Endpoint';
import IconHeader from '../components/IconHeader.vue'
import WebFooter from '@/components/WebFooter.vue'
import NavBar from '@/components/NavBar.vue'
import UProfile from '@/components/UProfile.vue';
import PropertyCard from '@/components/PropertyCard.vue';

const route = useRoute();
const user = ref({});
const properties = ref([]);
const { proxy } = getCurrentInstance();

const fetchData = async () => {
  try {
    const userId = Number(route.params.id);
    const [userResponse, propertiesResponse] = await Promise.all([
      proxy.$http.get(Endpoint.getUserById(userId)),
      proxy.$http.get(Endpoint.getPropertiesByUser(userId))
    ]);

    if (userResponse.success && propertiesResponse.success) {
      user.value = userResponse.data;
      properties.value = propertiesResponse.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
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