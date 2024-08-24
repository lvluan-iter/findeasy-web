<template>
  <div id="app">
    <header class="relative">
      <IconHeader />
      <div class="nav" id="nav">
        <NavBar />
      </div>
    </header>
    <main>
      <div class="section" v-scroll-reveal>
        <FirstBanner />
      </div>
      <div class="section0" v-scroll-reveal>
        <HomeSOne />
      </div>
      <div class="section01" v-scroll-reveal>
        <HomeSTwo />
      </div>
      <div class="section2" v-scroll-reveal>
        <HomeSThree/>
      </div>
      <div class="section3" v-scroll-reveal>
        <PopularProperty />
      </div>
      <div class="section4" v-scroll-reveal>
        <JoinUs />
      </div>
    </main>
    <footer class="footer">
      <WebFooter />
    </footer>
  </div>
</template>

<script>
import IconHeader from '../components/IconHeader.vue';
import NavBar from '../components/NavBar.vue';
import WebFooter from '@/components/WebFooter.vue';
import PopularProperty from '@/components/PopularProperty.vue';
import FirstBanner from '@/components/FirstBanner.vue';
import HomeSOne from '../components/HomeSOne.vue'
import HomeSTwo from '../components/HomeSTwo.vue'
import JoinUs from '@/components/JoinUs.vue';
import HomeSThree from '@/components/HomeSThree.vue';

export default {
  name: 'WebHome',
  components: {
    IconHeader,
    NavBar,
    WebFooter,
    PopularProperty,
    HomeSOne,
    FirstBanner,
    HomeSTwo,
    HomeSThree,
    JoinUs
  },
  data() {
    return {
      visibleSections: []
    };
  },
  methods: {
    isVisible(index) {
      return this.visibleSections.includes(index);
    },
  },
  directives: {
    scrollReveal: {
      inserted(el) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.classList.add('fade-in');
              el.classList.remove('fade-out');
            } else {
              // Thay vì ẩn khi ra khỏi viewport, chỉ ẩn khi phần tử ở dưới bottom của viewport
              if (entry.boundingClientRect.top > window.innerHeight) {
                el.classList.remove('fade-in');
                el.classList.add('fade-out');
              }
            }
          });
        }, {
          threshold: [0],
          rootMargin: '0px'
        });
        observer.observe(el);
      }
    }
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
.section3 {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
