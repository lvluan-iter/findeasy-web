<template>
    <div>
        <div v-show="showScrollTopButton" @click="scrollToTop" class="scroll-top-button-wrapper">
            <div class="scroll-top-button"><i class="fa-solid fa-angle-up"></i></div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        showScrollTopButton: false
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      handleScroll() {
        this.showScrollTopButton = window.scrollY > 300;
      }
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>
  
<style scoped>
.scroll-top-button-wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 2px;
    border: 2px solid #FFD700;
    border-radius: 50%;
    box-sizing: border-box;
}
  
.scroll-top-button {
    width: 44px;
    height: 44px;
    background-color: #FFD700;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
  
.scroll-top-button i {
    font-size: 24px;
}
  
.scroll-top-button-wrapper:hover {
    padding: 6px;
    bottom: 26px;
    right: 26px;
    border-radius: 50%;
    box-sizing: border-box;
}
  
.scroll-top-button:active {
    background-color: #f39c12;
    transform: scale(0.95);
}
</style>
  