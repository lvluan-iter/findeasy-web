<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] mt-14">
    <div class="text-center mb-[50px]">
      <div class="inline-block p-2.5 px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2.5">
        <span>Khu vực lân cận ({{ info.location }})</span>
      </div>
      <p class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-5">
        Explore Nearby Properties</p>
      <span class="description-text text-sm sm:text-base">Discover the best properties currently available in your area.<br> From luxury homes
        to prime commercial spaces, our listings offer exceptional opportunities for buyers and investors.</span>
    </div>
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-if="error" class="error">Lỗi khi tải dữ liệu</div>
    <AvaibleProperty v-else :initialProperties="properties" :showPagination="false" />
  </div>
</template>

<script>
import AvaibleProperty from './AvaibleProperty.vue';

export default {
  props: {
    info: Object
  },
  components: {
    AvaibleProperty
  },
  data() {
    return {
      properties: [],
      loading: false,
      error: false,
    };
  },
  watch: {
    info: {
      immediate: true,
      handler(newInfo) {
        if (newInfo && Object.keys(newInfo).length > 0) {
          this.fetchPropertyNearBy(newInfo);
        }
      },
    }
  },
  methods: {
    async fetchPropertyNearBy(info) {
      this.loading = true;
      this.error = false;
      try {
        const response = await fetch(`http://localhost:8080/api/properties/searchNearby?location=${info.location}&propertyId=${info.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        this.properties = data.content;
      } catch (error) {
        this.error = true;
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>