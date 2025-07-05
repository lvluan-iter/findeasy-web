<template>
  <div>
    <div class="relative h-[85vh] grid grid-cols-1 md:grid-cols-2">
      <div class="w-full lg:w-3/5" />
      <div class="image w-full md:w-1/2 lg:w-2/5 md:block hidden">
        <img
          class="w-full h-full object-cover"
          src="@/assets/anhdep.png"
          alt="Ảnh-Banner"
        >
      </div>
      <div
        class="absolute bottom-0 left-0 w-full h-full px-6 md:px-[60px] lg:px-[120px] pt-[30px] md:pt-[40px] lg:pt-[60px] box-border"
      >
        <div class="inline-block py-2 px-5 bg-[rgb(10,115,192,8%)] rounded-full text-[rgb(10,115,192)] mb-2.5">
          <span>Chào mừng đến với FindEasy!</span>
        </div>
        <h1 class="font-bold text-[#212529] text-3xl md:text-4xl lg:text-6xl m-0 mb-5">
          Tìm ngôi nhà mơ ước <br>
          tại vị trí lý tưởng
        </h1>
        <div class="mb-8 ml-0 lg:ml-[80px]">
          <LocationSearch />
        </div>
        <div
          class="text-base md:text-lg font-semibold text-[#212529] flex flex-col md:flex-row items-start md:items-center gap-2.5"
        >
          <div class="flex items-center gap-4">
            <i class="fa-solid fa-location-dot" />
            <span>Tìm kiếm vị trí</span>
          </div>
          <i class="fa-solid fa-arrow-right hidden md:inline-block" />
          <div class="flex items-center gap-4">
            <i class="fa-solid fa-calendar-days" />
            <span>Đặt lịch hẹn</span>
          </div>
          <i class="fa-solid fa-arrow-right hidden md:inline-block" />
          <div class="flex items-center gap-4">
            <i class="fa-solid fa-house" />
            <span>Sở hữu ngôi nhà mơ ước</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationSearch from './LocationSearch.vue';
</script>

<style scoped>
.image {
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 4% 100%);
    height: 85vh;
    width: 100%;
}

svg {
    font-size: 24px;
    color: rgb(10 115 192);
}
</style>