<template>
  <div>
    <UProfile :user="user" :property-count="properties.length" />
    <PropertyCard :properties="properties" />
  </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue';
import {useRoute} from 'vue-router';
import {Endpoint} from '@/constants/Endpoint';
import UProfile from '@/components/UProfile.vue';
import PropertyCard from '@/components/PropertyCard.vue';

const route = useRoute();
const user = ref({});
const properties = ref([]);
const {proxy} = getCurrentInstance();

const fetchData = async () => {
  try {
    const userId = Number(route.params.id);
    const [userResponse, propertiesResponse] = await Promise.all([
      proxy.$http.get(Endpoint.getUserById(userId)),
      proxy.$http.get(Endpoint.getPropertiesByUser(userId))
    ]);

    if (userResponse.succeeded) {
      user.value = userResponse.result;
    } else {
      console.error('Error fetching user:', userResponse.errors ? userResponse.errors.join(', ') : userResponse);
    }

    if (propertiesResponse.succeeded) {
      properties.value = propertiesResponse.result;
    } else {
      console.error(
        'Error fetching properties:',
        propertiesResponse.errors ? propertiesResponse.errors.join(', ') : propertiesResponse
      );
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
