<template>
  <div class="px-4 py-5 sm:px-6 md:px-12 lg:px-[120px] lg:py-14">
    <div class="flex flex-wrap items-center gap-4">
      <button
        class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition duration-300"
        @click="$router.go(-1)"
      >
        <i class="fas fa-angle-left" />
        <span>Quay lại</span>
      </button>
      <div class="hidden sm:block w-px h-6 bg-gray-300" />
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
        Đăng Tin
      </h1>
    </div>
    <hr class="w-full mb-5">
    <form
      class="space-y-8"
      @submit.prevent="submitProperty"
      @keydown.enter.prevent
    >
      <div class="bg-white shadow-md rounded-lg overflow-visible">
        <div class="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-end border-b border-gray-200">
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span>{{ currentDate }}</span>
            <i class="fas fa-calendar-alt text-[rgb(10,115,192)]" />
          </div>
        </div>

        <div class="p-6 space-y-8">
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Thông Tin Cơ Bản
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CreativeInput
                id="title"
                v-model="property.title"
                label="Tiêu đề"
                required
                placeholder="Viết tiêu đề cho tin đăng của bạn ..."
                :tooltip-content="'Tiêu đề nên đầy đủ thông tin cần thiết, không nên ngắn quá để tối ưu hiển thị.'"
              />

              <CreativeInput
                id="type"
                v-model="property.type"
                label="Loại"
                :is-select="true"
                :show-tooltip="false"
                :options="[
                  { value: '', label: 'Select Type' },
                  { value: 'For Rent', label: 'For Rent' },
                  { value: 'For Sale', label: 'For Sale' }
                ]"
                :input-icon-class="'fas fa-building text-gray-400'"
              />

              <CreativeInput
                id="category"
                v-model="property.categoryId"
                label="Danh mục"
                :is-select="true"
                :show-tooltip="false"
                :options="categoryOptions"
                :input-icon-class="'fas fa-layer-group text-gray-400'"
              />

              <CreativeInput
                id="price"
                v-model="property.price"
                label="Giá"
                :show-tooltip="false"
                type="number"
                required
                placeholder="Nhập giá..."
                input-icon-class="fas fa-dollar-sign text-gray-400"
              />

              <CreativeInput
                id="tags"
                label="Từ khóa"
                :show-tooltip="true"
                tooltip-content="Nhập từ khóa liên quan đến bất động sản và nhấn enter để tạo tag."
                input-icon-class="fas fa-tags text-gray-400"
                label-class="text-gray-700"
              >
                <template #default>
                  <tag-input
                    id="tags"
                    v-model="property.keywords"
                    required
                  />
                </template>
              </CreativeInput>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Thông Tin Mô Tả
            </h2>
            <div class="space-y-2">
              <textarea
                id="description"
                v-model="property.description"
                rows="6"
                required
                class="block w-full px-3 py-2 text-sm border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent resize-none"
                placeholder="Nhập thông tin mô tả đầy đủ về bất động sản..."
              />
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Vị Trí
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CreativeInput
                id="address"
                v-model="property.address"
                label="Địa chỉ"
                :show-tooltip="true"
                tooltip-content="Nhập địa chỉ và nhấp vào bên ngoài ô nhập để cập nhật vi trí trên bản đồ."
                type="text"
                required
                placeholder="Nhập đầy đủ địa chỉ..."
                input-icon-class="fas fa-map-marker-alt text-gray-400"
                @blur="updateMapByAddress"
              />
              <CreativeInput
                id="location"
                v-model="property.location"
                label="Địa điểm"
                :show-tooltip="false"
                type="text"
                required
                placeholder="Tỉnh, Thành Phố"
                input-icon-class="fas fa-location-arrow text-gray-400"
              />
            </div>
            <div
              id="map"
              class="h-96 rounded-lg overflow-hidden shadow-md"
            >
              <l-map
                style="height: 100%"
                :zoom="zoom"
                :center="center"
                @click="updateAddress"
              >
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <l-marker :lat-lng="marker" />
              </l-map>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Bộ Siêu Tập
            </h2>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300"
              @click="triggerFileUpload"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <input
                id="imageUpload"
                ref="fileInput"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="previewImages"
              >
              <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4" />
              <p class="text-sm text-gray-600">
                Nhấn vào đây hoặc kéo thả tệp để tải lên
              </p>
              <p class="text-xs text-gray-500 mt-2">
                Hỗ trợ định dạng: JPG, PNG, GIF (Tối đa 5MB)
              </p>
            </div>
            <div
              v-if="images.length > 0"
              class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              <div
                v-for="(image, index) in images"
                :key="index"
                class="relative group"
              >
                <img
                  :src="image.url"
                  :alt="`Property Image ${index + 1}`"
                  class="w-full h-24 object-cover rounded-lg shadow-md"
                >
                <button
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  @click="removeImage(index)"
                >
                  <i class="fas fa-times" />
                </button>
              </div>
            </div>
          </section>

          <!-- Property Details -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Thống Số Chi Tiết
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CreativeInput
                id="area"
                v-model="property.area"
                label="Diện tích (m²)"
                :show-tooltip="false"
                type="number"
                required
                placeholder="Area"
                input-icon-class="fas fa-expand-arrows-alt text-gray-400"
              />

              <CreativeInput
                id="bedrooms"
                v-model="property.bedrooms"
                label="Phòng ngủ"
                :show-tooltip="false"
                type="number"
                required
                placeholder="Number of Bedrooms"
                input-icon-class="fas fa-bed text-gray-400"
              />

              <CreativeInput
                id="bathrooms"
                v-model="property.bathrooms"
                label="Phòng tắm"
                :show-tooltip="false"
                type="number"
                required
                placeholder="Number of Bathrooms"
                input-icon-class="fas fa-bath text-gray-400"
              />
            </div>
          </section>

          <!-- Amenities -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Tiện Ích Sẵn Có
            </h2>
            <AmenitiesCheckbox
              v-model="property.amenities"
            />
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Khu Vực Lân Cận
            </h2>
            <NearbyPlacesInput v-model="property.nearbyPlaces" />
          </section>

          <section>
            <ListingPlans
              v-model="selectedPlan"
            />
          </section>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
          <button
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            @click="router.go(-1)"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Đăng tin
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";
import { useToast } from 'vue-toast-notification';
import TagInput from './TagInput.vue';
import CreativeInput from './CreativeInput.vue';
import AmenitiesCheckbox from './AmenitiesCheckbox.vue';
import NearbyPlacesInput from './NearbyPlacesInput.vue';
import { useUserStore } from '../stores/userStore'
import { useCategoryStore } from '../stores/categoryStore'
import ListingPlans from './ListingPlans.vue';

const router = useRouter();
const toast = useToast();
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const selectedPlan = ref('free');

const categoryOptions = computed(() => categoryStore.getCategoryOptions)

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const property = reactive({
  title: '',
  description: '',
  address: '',
  price: null,
  location: '',
  isAvailable: true,
  imageUrls: [],
  bedrooms: null,
  bathrooms: null,
  area: null,
  furniture: '',
  amenities: [],
  type: '',
  keywords: '',
  categoryId: -1,
  userId: null,
  nearbyPlaces: [],
  isPaid: false
});

const currentDate = ref('');
const images = ref([]);
const zoom = ref(13);
const center = ref([10.762622, 106.660172]);
const marker = ref([10.762622, 106.660172]);

const fileInput = ref(null);
const nearbyPlaces = ref([]);

const setCurrentDate = () => {
  const today = new Date();
  currentDate.value = today.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
};

const triggerFileUpload = () => {
  fileInput.value.click();
  console.log(property.amenities)
};

const previewImages = (event) => {
  const files = event.target.files;
  if (files) {
    addImagesToPreview(files);
  }
};

const handleFileDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files) {
    addImagesToPreview(files);
  }
};

const addImagesToPreview = (files) => {
  const maxImages = selectedPlan.value === 'premium' ? Infinity : 5;
  
  if (images.value.length >= maxImages) {
    toast.error(`Free plan allows maximum ${maxImages} images`);
    return;
  }
  
  Array.from(files).forEach(file => {
    if (images.value.length >= maxImages) return;
    
    if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = e => {
        images.value.push({ file, url: e.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload image files only (max 5MB each)');
    }
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  console.log(property.userId)
  console.log(property)
};

const submitProperty = async () => {
  const formData = new FormData();
  images.value.forEach(image => {
    formData.append('images', image.file);
  });

  try {
    const imageResponse = await fetch('https://roombooking-fa3a.onrender.com/api/upload-images', {
      method: 'POST',
      body: formData,
    });
    if (!imageResponse.ok) throw new Error('Failed to upload images');
    const imageUrls = await imageResponse.json();
    property.imageUrls = imageUrls;

    property.isPaid = selectedPlan.value === 'premium';
    
    const propertyResponse = await fetch('https://roombooking-fa3a.onrender.com/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(property),
    });
    
    const response = await propertyResponse.json();
    
    if (response.paymentUrl) {
      window.location.href = response.paymentUrl;
    } else {
      resetForm();
      toast.success('Property added successfully!');
      router.push('/');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred. Please try again.');
  }
};

const resetForm = () => {
  Object.assign(property, {
    title: '',
    description: '',
    address: '',
    price: null,
    location: '',
    imageUrls: [],
    bedrooms: null,
    bathrooms: null,
    area: null,
    furniture: '',
    amenities: [],
    type: '',
    keywords: '',
    categoryId: null,
    nearbyPlaces: [],
    isPaid: false
  });
  images.value = [];
  nearbyPlaces.value = [];
  if (fileInput.value) fileInput.value.value = null;
};

const updateMapByAddress = () => {
  if (property.address) {
    const encodedAddress = encodeURIComponent(property.address);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`, {
      headers: {
        'Accept-Language': 'vi'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          center.value = [parseFloat(lat), parseFloat(lon)];
          marker.value = [parseFloat(lat), parseFloat(lon)];
        }
      })
      .catch(error => console.error('Error fetching map coordinates:', error));
  }
};

const updateAddress = (e) => {
  const { lat, lng } = e.latlng;
  marker.value = [lat, lng];
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
    headers: {
      'Accept-Language': 'vi'
    }
  })
    .then(response => response.json())
    .then(data => {
      property.address = data.display_name;
      
      const bigCities = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Khánh Hòa'];
      
      const processLocationName = (name) => {
        name = name.replace(/^Tỉnh /, '').replace(/^Thành phố /, '');
        return name.trim();
      };

      const addressParts = data.display_name.split(', ').reverse();
      let location = '';
      for (let part of addressParts) {
        if (bigCities.includes(processLocationName(part))) {
          location = processLocationName(part);
          break;
        }
        if (part.startsWith('Tỉnh') || part.startsWith('Thành phố')) {
          location = processLocationName(part);
          break;
        }
      }
      
      if (!location) {
        location = processLocationName(data.address.state || data.address.city || data.address.county || '');
      }
      
      property.location = location;
    })
    .catch(error => console.error('Error fetching address:', error));
};

watch(() => userStore.user, (newUser) => {
  if (newUser) {
    property.userId = newUser.id;
  }
}, { immediate: true });

onMounted(() => {
  setCurrentDate();
});
</script>

<style scoped>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>