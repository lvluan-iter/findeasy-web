<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px]">
    <div class="text-center mb-[50px]">
      <div class="inline-block p-2.5 px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2.5">
        <span>Bất Động Sản Nổi Bật</span>
      </div>
      <p class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-5">
        Khám Phá Bất Động Sản Hàng Đầu
      </p>
      <span class="description-text text-sm sm:text-base">
        Tìm kiếm những bất động sản tốt nhất đang có trên thị trường. 
        Từ những ngôi nhà sang trọng đến các không gian thương mại đắc địa, danh sách nổi bật của chúng tôi mang đến cơ hội tuyệt vời cho người mua và nhà đầu tư. 
        Duyệt qua những lựa chọn hàng đầu và tìm kiếm bất động sản lý tưởng của bạn ngay hôm nay.
      </span>
    </div>
    <AvaibleProperty 
      :properties="properties"
      :current-page="currentPage"
      :total-pages="totalPages"
      :show-pagination="true"
      @change-page="handlePageChange"
    />
  </div>
</template>

<script setup>
import AvaibleProperty from './AvaibleProperty.vue';
import { usePropertyStore } from '../stores/propertyStore';
import { storeToRefs } from 'pinia'

const propertyStore = usePropertyStore();
const { properties, totalPages, currentPage } = storeToRefs(propertyStore);

const handlePageChange = (newPage) => {
  propertyStore.fetchAvailableProperties(newPage);
};
</script>