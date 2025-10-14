<template>
  <div v-for="(component, index) in components" :key="index" v-scroll-reveal :class="component.class">
    <component :is="component.name" />
  </div>
  <CompareBar />
</template>

<script setup>
import {markRaw} from 'vue';
import FirstBanner from '@/components/FirstBanner.vue';
import HomeSOne from '@/components/HomeSOne.vue';
import HomeSTwo from '@/components/HomeSTwo.vue';
import JoinUs from '@/components/JoinUs.vue';
import HomeSThree from '@/components/HomeSThree.vue';
import LocationComponent from '@/components/LocationComponent.vue';
import CompareBar from '@/components/CompareBar.vue';

const components = [
  {name: markRaw(FirstBanner), class: 'section'},
  {name: markRaw(HomeSOne), class: 'section0'},
  {name: markRaw(HomeSTwo), class: 'section01'},
  {name: markRaw(HomeSThree), class: 'section2'},
  {name: markRaw(LocationComponent), class: 'section5'},
  {name: markRaw(JoinUs), class: 'section4'}
];

const vScrollReveal = {
  mounted(el) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('fade-in');
            el.classList.remove('fade-out');
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            el.classList.remove('fade-in');
            el.classList.add('fade-out');
          }
        });
      },
      {
        threshold: [0],
        rootMargin: '0px'
      }
    );
    observer.observe(el);
  }
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
  z-index: 9999;
}

.section {
  height: 85vh;
  margin-bottom: 60px;
}

.section0 {
  margin-bottom: 180px;
}

.section,
.section0,
.section1,
.section2,
.section4 {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-out {
  opacity: 0;
  transform: translateY(30px);
}
</style>
