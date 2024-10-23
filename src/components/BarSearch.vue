<template>
  <div class="search-container">
    <input
      v-model="searchValue"
      type="search"
      placeholder="Tìm kiếm thông tin theo mô tả"
      @input="barSearch"
    >
  </div>
</template>

<script>
import { debounce } from 'lodash';
export default {
    data() {
        return {
            searchValue: ''
        }
    },
    created() {
        this.debouncedSearch = debounce(this.fetchData, 500);
    },
    methods: {
        barSearch() {
            this.debouncedSearch();
        },
        async fetchData() {
            try {
                const response = await fetch(`http://localhost:8080/api/properties/search?keyword=${this.searchValue.toLowerCase()}`);
                if (!response.ok) {
                    console.log("Lỗi khi tải dữ liệu từ server");
                    return;
                }
                const results = await response.json();
                this.$emit('barsearch', results);
            } catch (error) {
                console.log("Lỗi trong quá trình xử lý dữ liệu", error);
            }
        }
    }
};
</script>

<style scoped>
.search-container {
    position: relative;
    width: 100%;
}

input[type="search"] {
    width: 100%;
    background-color: white;
    border-radius: 0px 20px 20px 0px;
    padding-left: 20px;
    height: 40px;
    text-align: left;
    color: #555555;
    border: none;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="search"]::placeholder {
    color: #888888;
    font-style: italic;
}

input[type="search"]:focus {
    border: 1px solid #4682b4;
}
</style>
