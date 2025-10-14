<template>
  <main>
    <CompareList />
    <ComparePage />
  </main>
</template>

<script setup>
import ComparePage from '@/components/ComparePage.vue';
import CompareList from '@/components/CompareList.vue';
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
