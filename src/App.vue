<template>
  <div id="app">
    <router-view />
    <HeartbeatComponent 
      v-if="userStore.user"
      :user-id="userStore.user.id"
    />
    <MessComponent />
    <ScolltoTop />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from './stores/userStore'
import { webSocketService } from './services/websocketService'
import { useCategoryStore } from './stores/categoryStore'
import ScolltoTop from './components/ScolltoTop.vue'
import HeartbeatComponent from './components/HeartbeatComponent.vue'
import MessComponent from './components/MessComponent.vue';

const userStore = useUserStore()
const categoryStore = useCategoryStore()

onMounted(async () => {
  await userStore.initializeAuth();
  await categoryStore.fetchCategories();
});

watch(() => userStore.isAuthenticated, (newValue) => {
  if (newValue && userStore.user) {
    webSocketService.connect(userStore.user.id)
  } else {
    webSocketService.disconnect()
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@400;500;600;700&display=swap');
:root {
  --font-primary: 'Lato', sans-serif;
  --font-heading: 'Playfair Display', serif;
}

body {
  font-family: var(--font-primary);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, .heading-text {
  font-family: var(--font-heading);
}

.font-primary {
  font-family: var(--font-primary);
}

.font-heading {
  font-family: var(--font-heading);
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

html, body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background-color: #FFFFFF;
  color: #2c3e50;
}
</style>
