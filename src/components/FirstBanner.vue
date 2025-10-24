<template>
  <div>
    <div class="relative h-[85vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <!-- Cột trái (nội dung) -->
      <div class="w-full relative z-10 flex items-end">
        <div
          class="absolute bottom-0 left-0 w-full h-full px-6 md:pl-[60px] lg:pl-[120px] pt-[30px] md:pt-[40px] lg:pt-[60px] box-border bg-gradient-to-r from-white/90 to-white/70"
        >
          <div class="inline-block py-2 px-5 bg-[rgb(10,115,192,8%)] rounded-full text-[rgb(10,115,192)] mb-2.5">
            <span>Chào mừng đến với FindEasy!</span>
          </div>
          <h1 class="font-bold text-[#212529] text-3xl md:text-4xl lg:text-5xl m-0 mb-5">
            Tìm ngôi nhà mơ ước tại vị trí lý tưởng
          </h1>
          <div
            class="text-base mt-auto md:text-xs font-semibold text-[#212529] flex flex-col md:flex-row items-start md:items-center gap-2.5"
          >
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-location-dot text-inherit" />
              <span>Tìm kiếm vị trí</span>
            </div>
            <i class="fa-solid fa-arrow-right hidden md:inline-block text-inherit" />
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-calendar-days text-inherit" />
              <span>Đặt lịch</span>
            </div>
            <i class="fa-solid fa-arrow-right hidden md:inline-block text-inherit" />
            <div class="flex items-center gap-1">
              <i class="fa-solid fa-house text-inherit" />
              <span>Sở hữu ngôi nhà mơ ước</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải (ảnh nền) -->
      <div class="hidden md:block relative w-full h-full">
        <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center image-background" />
      </div>
    </div>
  </div>
</template>

<script setup>
// import LocationSearch from './LocationSearch.vue';
</script>

<style scoped>
.image-background {
  background-image: url('@/assets/images/anhdep.png');
  clip-path: polygon(20% 0, 100% 0, 100% 100%, 4% 100%);
  height: 85vh;
  width: 100%;
}

svg {
  font-size: 24px;
  color: rgb(10 115 192);
}
</style>
