<template>
  <div class="dropdown-container">
    <div
      class="select"
      title="Giá cả"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <span>{{ selectedPriceText }}</span>
      <i class="fa-solid fa-chevron-down" />
    </div>
    <div
      v-show="isOpen"
      class="pricedropdown"
      @mouseover="showDropdown"
      @mouseleave="hideDropdown"
    >
      <div
        v-for="(price, index) in priceOptions"
        :key="index"
        class="priceitem"
        @click="selectPrice(price)"
      >
        {{ price.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedPrice: { value: 0, text: "Tất cả" },
      priceOptions: [
        { value: 0, text: "Tất cả" },
        { value: 500000, text: "Dưới 500k/ngày" },
        { value: 1000000, text: "Từ 500k-1M/ngày" },
        { value: 1500000, text: "Từ 1M-1.5M/ngày" },
        { value: 2000000, text: "Từ 1.5M-2M/ngày" },
        { value: 2500000, text: "Từ 2M-2.5M/ngày" },
        { value: 3000000, text: "Từ 2.5M-3M/ngày" },
        { value: 3500000, text: "Từ 3M-3.5M/ngày" },
        { value: 4000000, text: "Từ 3.5M-4M/ngày" },
        { value: 4500000, text: "Từ 4M-4.5M/ngày" },
        { value: 5000000, text: "Từ 4.5M-5M/ngày" },
        { value: 5500000, text: "Từ 5M-5.5M/ngày" }
      ]
    };
  },
  computed: {
    selectedPriceText() {
      return this.selectedPrice.text;
    }
  },
  methods: {
    showDropdown() {
      this.isOpen = true;
    },
    hideDropdown() {
      this.isOpen = false;
    },
    async selectPrice(price) {
      this.selectedPrice = price;
      this.isOpen = false;
      await this.searchPrice();
    },
    async searchPrice() {
      const minPrice = parseFloat(this.selectedPrice.value) - 500000;
      try {
        const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/search?minPrice=${minPrice}&maxPrice=${this.selectedPrice.value}`);
        if (!response.ok) {
          console.error("Lỗi khi tải dữ liệu từ server");
          return;
        }
        const results = await response.json();
        this.$emit('pricesearch', results);
      } catch (error) {
        console.error("Lỗi trong quá trình xử lý dữ liệu:", error);
      }
    }
  }
};
</script>

<style scoped>
.dropdown-container {
  position: relative;
  width: 100%;
}

.select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  border-radius: 0;
  height: 40px;
  padding: 0 15px;
  color: #000;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.select:hover {
  color: #f39c12;
}

.pricedropdown {
  position: absolute;
  top: 42px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.priceitem {
  padding: 10px 15px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.priceitem:hover {
  background-color: #d3e9ff;
}
</style>
