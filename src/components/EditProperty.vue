<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <button class="text-gray-600 hover:text-gray-800 transition-colors" @click="$router.go(-1)">
            <i class="fas fa-arrow-left text-xl" />
          </button>
          <h1 class="text-2xl font-bold text-gray-900">Chỉnh sửa bất động sản</h1>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="$router.go(-1)"
          >
            Hủy
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="isLoading"
            @click="handleSubmit"
          >
            <i v-if="isLoading" class="fas fa-circle-notch fa-spin" />
            {{ isLoading ? 'Đang xử lý...' : 'Lưu thay đổi' }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Thông tin cơ bản</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Tiêu đề </label>
              <input
                v-model="formData.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Địa chỉ </label>
              <input
                v-model="formData.address"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Loại hình </label>
              <select
                v-model="formData.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="For Rent">Cho thuê</option>
                <option value="For Sale">Bán</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Danh mục </label>
              <select
                v-model="formData.categoryId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Chi tiết bất động sản</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Diện tích (m²) </label>
              <input
                v-model="formData.area"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Số phòng ngủ </label>
              <input
                v-model="formData.bedrooms"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Số phòng tắm </label>
              <input
                v-model="formData.bathrooms"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Nội thất </label>
              <input
                v-model="formData.furniture"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Giá </label>
              <input
                v-model="formData.price"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Mô tả</h2>
          <textarea
            v-model="formData.description"
            rows="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Tiện ích</h2>
          <AmenitiesCheckbox v-model="formData.amenities" />
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Địa điểm lân cận</h2>
          <NearbyPlacesInput v-model="formData.nearbyPlaces" />
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Hình ảnh</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            <div v-for="(image, index) in formData.imageUrls" :key="index" class="relative aspect-square group">
              <img :src="image" :alt="`Property image ${index + 1}`" class="w-full h-full object-cover rounded-lg" />
              <div
                class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
              >
                <button class="text-white hover:text-red-500 transition-colors" @click="removeImage(index)">
                  <i class="fas fa-trash" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
            @click="showImageDialog = true"
          >
            <i class="fas fa-camera" />
            <span>{{ formData.imageUrls.length > 0 ? 'Thêm hình ảnh' : 'Tải hình ảnh lên' }}</span>
          </button>
        </div>
      </div>
    </div>

    <EditImage v-model:show="showImageDialog" :initial-images="formData.imageUrls" @save="handleSaveImages" />
  </div>
</template>

<script setup>
import {ref, onMounted, computed, onBeforeUnmount, getCurrentInstance} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useToast} from 'vue-toast-notification';
import {useCategoryStore} from '../stores/categoryStore';
import {Endpoint} from '@/constants/Endpoint';
import AmenitiesCheckbox from '../components/AmenitiesCheckbox.vue';
import NearbyPlacesInput from '../components/NearbyPlacesInput.vue';
import EditImage from '../components/EditImage.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const categoryStore = useCategoryStore();
const {proxy} = getCurrentInstance();

const isLoading = ref(false);
const showImageDialog = ref(false);
const isComponentMounted = ref(true);

const formData = ref({
  title: '',
  address: '',
  type: '',
  categoryId: '',
  area: 0,
  bedrooms: 0,
  bathrooms: 0,
  furniture: '',
  price: 0,
  description: '',
  amenities: [],
  nearbyPlaces: [],
  imageUrls: []
});

const categoryOptions = computed(() => categoryStore.getCategoryOptions);

const fetchProperty = async () => {
  try {
    const response = await proxy.$http.get(Endpoint.getPropertyById(route.params.id));
    if (response.succeeded) {
      const property = response.result;
      if (isComponentMounted.value) {
        formData.value = {
          ...property,
          categoryId: property.categoryId || '',
          amenities: property.amenities || [],
          nearbyPlaces: property.nearbyPlaces || []
        };
      }
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to fetch property');
    }
  } catch (error) {
    console.error('Error fetching property:', error);
    if (isComponentMounted.value) {
      toast.error('Không thể tải thông tin bất động sản. Vui lòng thử lại.');
      router.push('/yourproperty');
    }
  }
};

const handleSaveImages = (images) => {
  if (isComponentMounted.value) {
    formData.value.imageUrls = images;
    showImageDialog.value = false;
  }
};

const removeImage = (index) => {
  if (isComponentMounted.value) {
    formData.value.imageUrls = formData.value.imageUrls.filter((_, i) => i !== index);
  }
};

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await proxy.$http.put(Endpoint.updateProperty(route.params.id), formData.value);

    if (response.succeeded) {
      if (isComponentMounted.value) {
        toast.success('Cập nhật thành công!', {
          duration: 1500
        });

        setTimeout(() => {
          if (isComponentMounted.value) {
            router.push('/yourproperty');
          }
        }, 1500);
      }
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to update property');
    }
  } catch (error) {
    console.error('Error updating property:', error);
    if (isComponentMounted.value) {
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
      isLoading.value = false;
    }
  }
};

onMounted(() => {
  isComponentMounted.value = true;
  fetchProperty();
});

onBeforeUnmount(() => {
  isComponentMounted.value = false;
});
</script>
