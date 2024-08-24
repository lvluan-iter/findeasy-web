<template>
  <div id="app">
    <router-view></router-view>
    <scollto-top />

  </div>
</template>

<script>
import ScolltoTop from './components/ScolltoTop.vue';

export default {
  name: 'App',
  components: {
    ScolltoTop
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

html, body {
  overflow-x: hidden;
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
