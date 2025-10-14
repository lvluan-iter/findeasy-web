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

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { debounce } from 'lodash';
import { Endpoint } from '@/constants/Endpoint';

const { proxy } = getCurrentInstance();
const emit = defineEmits(['barsearch']);

const searchValue = ref('');
let debouncedSearch;

const barSearch = () => {
    debouncedSearch();
};

const fetchData = async () => {
    try {
        const response = await proxy.$http.get(`${Endpoint.searchProperties}?keyword=${searchValue.value.toLowerCase()}`);
        if (!response.success) {
            console.log("Lỗi khi tải dữ liệu từ server");
            return;
        }
        emit('barsearch', response.data);
    } catch (error) {
        console.log("Lỗi trong quá trình xử lý dữ liệu", error);
    }
};

onMounted(() => {
    debouncedSearch = debounce(fetchData, 500);
});
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
