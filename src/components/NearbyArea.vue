<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] mt-14">
    <div class="text-center mb-[50px]">
      <div class="inline-block p-2.5 px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2.5">
        <span>Khu vực lân cận ({{ info?.location }})</span>
      </div>
      <p class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-5">
        Explore Nearby Properties
      </p>
      <span class="description-text text-sm sm:text-base"
        >Discover the best properties currently available in your area.<br />
        From luxury homes to prime commercial spaces, our listings offer exceptional opportunities for buyers and
        investors.</span
      >
    </div>
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">Lỗi khi tải dữ liệu</div>
    <AvaibleProperty v-else :initial-properties="properties" :show-pagination="false" />
  </div>
</template>

<script setup>
import {ref, watch, onMounted, getCurrentInstance} from 'vue';
import AvaibleProperty from './AvaibleProperty.vue';
import {Endpoint} from '@/constants/Endpoint';

const {proxy} = getCurrentInstance();

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
});

const properties = ref([]);
const loading = ref(false);
const error = ref(false);

const fetchPropertyNearBy = async (info) => {
  if (!info || Object.keys(info).length === 0) return;

  loading.value = true;
  error.value = false;
  try {
    const response = await proxy.$http.get(
      `${Endpoint.searchNearbyProperties}?location=${encodeURIComponent(info.location)}&propertyId=${info.id}`
    );

    if (!response.succeeded) {
      const err = Array.isArray(response.errors) ? response.errors.join(', ') : 'Failed to fetch properties';
      throw new Error(err);
    }

    const result = response.result;
    if (Array.isArray(result)) {
      properties.value = result;
    } else if (result && result.content) {
      properties.value = result.content;
    } else if (result) {
      properties.value = Array.isArray(result) ? result : [result];
    } else {
      properties.value = [];
    }
  } catch (err) {
    error.value = true;
    console.error('Error fetching nearby properties:', err);
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.info,
  (newInfo) => {
    fetchPropertyNearBy(newInfo);
  },
  {immediate: true, deep: true}
);

onMounted(() => {
  if (props.info && Object.keys(props.info).length > 0) {
    fetchPropertyNearBy(props.info);
  }
});
</script>
