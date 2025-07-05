<template>
  <div class="property-query-form">
    <div class="form-title">
      <h3>SEARCH FORM</h3>
    </div>
    <div class="dropdown">
      <div class="dropdown-content">
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/location.jpg"
              alt="location"
            >
          </div>
          <span>Vị trí</span>
          <select
            v-model="filters.location"
            @change="debouncedApplyFilters"
          >
            <option value="">
              Chọn vị trí
            </option>
            <option
              v-for="location in uniqueLocations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>
        </div>
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/S.jpg"
              alt="price"
            >
          </div>
          <span>Giá cả</span>
          <div class="range-slider">
            <div class="range-values">
              <span>{{ filters.priceMin }} triệu</span> - <span>{{ filters.priceMax }} triệu</span>
            </div>
            <div class="range-inputs">
              <span class="range-label">Min</span>
              <input
                v-model="filters.priceMin"
                type="range"
                min="0"
                max="50"
                step="1"
                @input="debouncedApplyFilters"
              >
              <span class="range-label">Max</span>
              <input
                v-model="filters.priceMax"
                type="range"
                min="0"
                max="50"
                step="1"
                @input="debouncedApplyFilters"
              >
            </div>
          </div>
        </div>
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/bedroom.png"
              alt="bedroom"
            >
          </div>
          <span>Phòng ngủ</span>
          <input
            v-model="filters.bedroom"
            type="number"
            min="1"
            max="10"
            placeholder="Số phòng ngủ"
            @input="debouncedApplyFilters"
          >
        </div>
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/toilet.png"
              alt="bathroom"
            >
          </div>
          <span>Nhà tắm</span>
          <input
            v-model="filters.bathroom"
            type="number"
            min="1"
            max="10"
            placeholder="Số nhà tắm"
            @input="debouncedApplyFilters"
          >
        </div>
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/dientich.png"
              alt="area"
            >
          </div>
          <span>Diện tích (m²)</span>
          <div class="range-slider">
            <div class="range-values">
              <span>{{ filters.areaMin }} m²</span> - <span>{{ filters.areaMax }} m²</span>
            </div>
            <div class="range-inputs">
              <span class="range-label">Min</span>
              <input
                v-model="filters.areaMin"
                type="range"
                min="0"
                max="200"
                step="10"
                @input="debouncedApplyFilters"
              >
              <span class="range-label">Max</span>
              <input
                v-model="filters.areaMax"
                type="range"
                min="0"
                max="200"
                step="10"
                @input="debouncedApplyFilters"
              >
            </div>
          </div>
        </div>
        <div class="category-item">
          <div class="icon">
            <img
              src="@/assets/tienich.png"
              alt="amenities"
            >
          </div>
          <span>Tiện ích</span>
          <div class="checkbox-group">
            <label><input
              v-model="filters.amenities"
              type="checkbox"
              value="gym"
              @change="debouncedApplyFilters"
            > Phòng Gym</label>
            <label><input
              v-model="filters.amenities"
              type="checkbox"
              value="pool"
              @change="debouncedApplyFilters"
            > Hồ bơi</label>
            <label><input
              v-model="filters.amenities"
              type="checkbox"
              value="parking"
              @change="debouncedApplyFilters"
            > Bãi đỗ xe</label>
            <label><input
              v-model="filters.amenities"
              type="checkbox"
              value="security"
              @change="debouncedApplyFilters"
            > An ninh 24/7</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    properties: Array
  },
  data() {
    return {
      filters: {
        location: '',
        priceMin: 0,
        priceMax: 50,
        bedroom: '',
        bathroom: '',
        areaMin: 0,
        areaMax: 200,
        amenities: []
      }
    };
  },
  computed: {
    uniqueLocations() {
      const unique = [...new Set(this.properties.map(property => property.location))]
      return unique;
    }
  },
  created() {
    this.debounceSearch = debounce(this.applyFilters,1000)
  },
  methods: {
    cleanInput(input) {
      return typeof input === 'string' ? input.trim() : input;
    },
    debouncedApplyFilters() {
      this.debounceSearch();
    },
    async applyFilters() {
      try {
        const location = this.cleanInput(this.filters.location);
        const bedrooms = this.cleanInput(this.filters.bedroom);
        const bathrooms = this.cleanInput(this.filters.bathroom);
        const minArea = this.cleanInput(this.filters.areaMin);
        const maxArea = this.cleanInput(this.filters.areaMax);

        const priceMin = this.filters.priceMin * 1000000; // Chuyển đổi từ triệu sang VND
        const priceMax = this.filters.priceMax * 1000000; // Chuyển đổi từ triệu sang VND

        const url = `https://roombooking-fa3a.onrender.com/api/properties/search?location=${location}&minPrice=${priceMin}&maxPrice=${priceMax}&bedrooms=${bedrooms !== '' ? bedrooms : ''}&bathrooms=${bathrooms !== '' ? bathrooms : ''}&minArea=${minArea !== '' ? minArea : 0}&maxArea=${maxArea !== '' ? maxArea : 200}&amenities=${this.filters.amenities.join(',')}`;
        console.log("Request URL:", url); // Debug URL

        const response = await fetch(url);
        if (!response.ok) {
          console.log("Lỗi khi tải dữ liệu từ server");
          return;
        }
        const data = await response.json();
        this.$emit('loadsearchdata', data);
      } catch (error) {
        console.error("Lỗi trong quá trình xử lý dữ liệu:", error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.property-query-form {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
}

.form-title h3 {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
}

.dropdown-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.category-item {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.category-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 8px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

span {
  font-size: 1em;
  color: #34495e;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: center;
}

select, input[type="number"], .range-slider input[type="range"] {
  width: 100%;
  padding: 8px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1em;
  color: #2c3e50;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus, input[type="number"]:focus, .range-slider input[type="range"]:focus {
  border-color: #3498db;
}

.range-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.range-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9em;
  color: #7f8c8d;
  margin-bottom: 8px;
}

.range-inputs {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.range-label {
  font-size: 0.9em;
  color: #7f8c8d;
  margin: 0 10px 0 0;
}

.range-slider input[type="range"] {
  -webkit-appearance: none;
  width: calc(50% - 40px); /* Adjusted to match the padding of the labels */
  height: 6px;
  background: #ecf0f1;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;
}

.range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #3498db;
  cursor: pointer;
  border-radius: 50%;
}

.range-slider input[type="range"]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #3498db;
  cursor: pointer;
  border-radius: 50%;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  justify-items: left;
}

.checkbox-group label {
  font-size: 0.9em;
  color: #34495e;
  font-weight: 500;
  margin: 5px 0;
}

select, input[type="number"] {
  max-width: 100%;
}

input[type="number"] {
  width: calc(100% - 16px); /* Matching the select element width */
}
</style>
