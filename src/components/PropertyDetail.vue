<template>
  <div
    v-if="property"
    class="py-6"
  >
    <!-- Header section -->
    <div class="flex flex-wrap gap-2 sm:gap-5 items-center my-4 sm:my-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32">
      <div
        class="text-[rgb(10,115,192)] font-medium cursor-pointer inline-block hover:underline"
        @click="$router.go(-1);"
      >
        <i class="fa-solid fa-angle-left" />
        Quay lại
      </div>
      <div class="hidden sm:flex items-center w-[0.1px] h-5 bg-[#707070]" />
      <div class="font-semibold text-base sm:text-lg md:text-[18px] text-[#212529]">
        {{ property.title }}
      </div>
      <div
        v-show="isShow"
        class="action-buttons flex flex-wrap gap-2 sm:gap-5 w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0"
      >
        <div class="hidden sm:flex items-center w-[0.1px] h-5 bg-[#707070]" />
        <button
          v-if="!isEditing"
          class="flex items-center gap-1 text-[16px] text-[rgb(10,115,192)] font-semibold hover:underline"
          @click="isEditing = true"
        >
          <span>Sửa</span>
          <i class="fa-solid fa-pen-to-square" />
        </button>
        <button
          v-if="isEditing"
          class="flex items-center gap-1 text-[16px] text-[#28a745] font-semibold hover:underline"
          @click="updateProperty"
        >
          <span>Lưu</span>
          <i class="fa-solid fa-save" />
        </button>
        <button
          v-if="isEditing"
          class="flex items-center gap-1 text-[16px] text-[#dc3545] font-semibold hover:underline"
          @click="cancelEdit"
        >
          <span>Hủy</span>
          <i class="fa-solid fa-times" />
        </button>
        <button class="flex items-center gap-1 text-[16px] text-[#6c757d] font-semibold hover:underline">
          <span>Ẩn</span>
          <i class="fa-solid fa-eye-slash" />
        </button>
      </div>
    </div>

    <!-- Main image gallery -->
    <div class="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[74vh] overflow-hidden">
      <div
        v-for="(image, index) in property.imageUrls"
        :key="index"
        class="absolute inset-0 transition-opacity duration-500 ease-in-out"
        :style="{ opacity: currentImageIndex === index ? 1 : 0 }"
      >
        <img
          :src="image"
          :alt="`Property Image ${index + 1}`"
          class="w-full h-full object-fill transition-transform duration-500 ease-in-out transform hover:scale-105"
        >
      </div>

      <!-- Overlay for text and buttons -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />

      <!-- Text overlay -->
      <div class="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
          {{ property.title }}
        </h1>
        <p class="text-sm sm:text-base md:text-xl mb-2 sm:mb-4">
          {{ property.address }}
        </p>
        <div class="flex flex-wrap items-center space-x-2 sm:space-x-4">
          <span class="flex items-center text-xs sm:text-sm md:text-base"><i class="fas fa-bed mr-1 sm:mr-2" />{{ property.bedrooms }} giường</span>
          <span class="flex items-center text-xs sm:text-sm md:text-base"><i class="fas fa-bath mr-1 sm:mr-2" />{{ property.bathrooms }} nhà tắm</span>
          <span class="flex items-center text-xs sm:text-sm md:text-base"><i class="fas fa-vector-square mr-1 sm:mr-2" />{{ property.area }} m²</span>
        </div>
      </div>

      <!-- Thumbnail navigation -->
      <div class="absolute bottom-0 right-0 p-2 sm:p-4 flex space-x-1 sm:space-x-2 overflow-x-auto">
        <div
          v-for="(image, index) in property.imageUrls.slice(0, 5)"
          :key="index"
          class="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0"
          :class="{ 'ring-2 ring-white': currentImageIndex === index }"
          @click="currentImageIndex = index"
        >
          <img
            :src="image"
            :alt="`Property Image ${index + 1}`"
            class="w-full h-full object-cover"
          >
        </div>
      </div>

      <!-- Navigation arrows -->
      <button
        class="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white text-2xl sm:text-4xl opacity-50 hover:opacity-100 transition-opacity duration-300"
        @click="prevImage"
      >
        <i class="fas fa-chevron-left" />
      </button>
      <button
        class="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white text-2xl sm:text-4xl opacity-50 hover:opacity-100 transition-opacity duration-300"
        @click="nextImage"
      >
        <i class="fas fa-chevron-right" />
      </button>

      <button
        v-if="isEditing"
        class="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-blue-600 p-1 sm:p-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        @click="openImageDialog"
      >
        <div class="relative">
          <i class="fa-solid fa-camera text-lg sm:text-xl" />
          <i class="fa-solid fa-pen-to-square text-xs absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full" />
        </div>
        <span class="text-xs font-semibold block mt-1">Edit</span>
      </button>
    </div>

    <!-- New layout for property details and form -->
    <div class="container mx-auto px-4 mt-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left column: Property details -->
        <div class="lg:w-2/3">
          <div>
            <div class="flex justify-between items-center mb-6">
              <h1
                v-if="!isEditing"
                class="text-3xl font-bold text-gray-800"
              >
                {{ property.title }}
              </h1>
              <input
                v-else
                v-model="editedProperty.title"
                class="w-full text-3xl font-bold p-2 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700"
                placeholder="Property Title"
              >
            </div>

            <div class="flex items-center text-gray-600 mb-4">
              <i class="fas fa-location-dot mr-2 text-blue-500" />
              <span v-if="!isEditing">{{ property.address }}</span>
              <input
                v-else
                v-model="editedProperty.address"
                class="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Property Address"
              >
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
              <div class="flex items-center">
                <i class="fas fa-vector-square text-blue-500 mr-2" />
                <span v-if="!isEditing">{{ property.area }} m²</span>
                <input
                  v-else
                  v-model="editedProperty.area"
                  type="number"
                  class="w-20 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                >
                <span
                  v-if="isEditing"
                  class="ml-1"
                >m²</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-bed text-blue-500 mr-2" />
                <span v-if="!isEditing">{{ property.bedrooms }} giường</span>
                <input
                  v-else
                  v-model="editedProperty.bedrooms"
                  type="number"
                  class="w-16 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                >
                <span
                  v-if="isEditing"
                  class="ml-1"
                >giường</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-bath text-blue-500 mr-2" />
                <span v-if="!isEditing">{{ property.bathrooms }} nhà tắm</span>
                <input
                  v-else
                  v-model="editedProperty.bathrooms"
                  type="number"
                  class="w-16 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                >
                <span
                  v-if="isEditing"
                  class="ml-1"
                >nhà tắm</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-couch text-blue-500 mr-2" />
                <span v-if="!isEditing">{{ property.furniture }}</span>
                <input
                  v-else
                  v-model="editedProperty.furniture"
                  class="w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Furniture status"
                >
              </div>
            </div>
          </div>

          <hr class="my-10">

          <!-- New section: Property Type and Category -->
          <div class="mb-8">
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Thông tin bất động sản
            </h4>
            <div class="flex flex-wrap gap-4">
              <div>
                <CreativeInput
                  v-if="isEditing"
                  id="type"
                  v-model="editedProperty.type"
                  label="Type"
                  :is-select="true"
                  :show-tooltip="false"
                  :options="[
                    { value: '', label: 'Select Type' },
                    { value: 'For Rent', label: 'For Rent' },
                    { value: 'For Sale', label: 'For Sale' }
                  ]"
                  input-icon-class="fas fa-building text-blue-800"
                  input-class="bg-transparent border-none focus:outline-none text-blue-800 w-full"
                />
                <div 
                  v-else 
                  class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center"
                >
                  <i class="fas fa-building mr-2" />
                  <span>{{ property.type }}</span>
                </div>
              </div>
              <div>
                <CreativeInput
                  v-if="isEditing"
                  id="category"
                  v-model="editedProperty.categoryId"
                  label="Category"
                  :is-select="true"
                  :show-tooltip="false"
                  :options="categoryOptions"
                  input-icon-class="fas fa-layer-group text-green-800"
                  input-class="bg-transparent border-none focus:outline-none text-green-800 w-full"
                />
                <div 
                  v-else 
                  class="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center"
                >
                  <i class="fas fa-layer-group mr-2" />
                  <span>{{ property.categoryName }}</span>
                </div>
              </div>
            </div>
          </div>

          <hr class="my-10">

          <div>
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Mô tả
            </h4>
            <p
              v-if="!isEditing"
              class="text-gray-600 leading-relaxed"
            >
              {{ property.description }}
            </p>
            <textarea
              v-else
              v-model="editedProperty.description"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Property description"
            />
            <p class="mt-4 text-sm text-gray-500">
              <strong>Lần cuối cập nhật:</strong> {{ formatUpdatedAt(property.updatedAt) }}
            </p>
          </div>

          <hr class="my-10">

          <div class="mb-8">
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Khu vực lân cận
            </h4>
            <div v-if="!isEditing">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="(place, index) in property.nearbyPlaces"
                  :key="index" 
                  class="flex items-center p-3 bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <i
                    :class="getPlaceIcon(place.name)"
                    class="text-2xl text-indigo-500 mr-3"
                  />
                  <div>
                    <h5 class="font-semibold text-gray-800">
                      {{ place.name }}
                    </h5>
                    <p class="text-sm text-gray-600">
                      {{ place.distance }} {{ place.unit }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <NearbyPlacesInput v-model="editedProperty.nearbyPlaces" />
            </div>
          </div>

          <hr class="my-10">

          <div>
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Tiện ích sẵn có
            </h4>
            <div
              v-if="!isEditing"
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              <div
                v-for="amenity in property.amenities"
                :key="amenity.id"
                class="text-[16px] leading-[1.6] text-[#707070] flex items-center"
              >
                <i
                  :class="amenity.icon"
                  class="text-blue-500 mr-2"
                />
                {{ amenity.name }}
              </div>
            </div>
            <AmenitiesCheckbox
              v-else
              v-model="editedProperty.amenities"
            />
            <hr class="my-10">
          </div>

          <div>
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Kết nối chủ sở hữu
            </h4>
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div class="relative flex-shrink-0">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#0a73c0] overflow-hidden">
                  <img
                    class="w-full h-full object-cover"
                    :src="contact.avatar"
                    alt="Agent avatar"
                  >
                </div>
                <div
                  v-if="isAgentOnline"
                  class="absolute bottom-0 right-0 bg-green-400 w-5 h-5 rounded-full border-2 border-white pulse"
                />
              </div>
              <div class="flex-grow text-center sm:text-left">
                <h5 class="text-xl font-semibold text-[#212529] mb-2">
                  {{ contact.fullname }}
                </h5>
                <p class="text-[#707070] mb-4">
                  {{ contact.phoneNumber }}
                </p>
                <div
                  v-if="user && contact.id !== user.id"
                  class="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start"
                >
                  <button
                    class="btn-a p-[5px] border border-[#0a73c0] text-[#0a73c0] inline-block font-medium rounded-[5px] cursor-pointer hover:text-white hover:bg-[#0564a9]"
                    @click="startChat"
                  >
                    Nhắn tin <i class="fa-solid fa-message" />
                  </button>
                  <button
                    class="btn-a p-[5px] border border-[#0a73c0] text-[#0a73c0] inline-block font-medium rounded-[5px] cursor-pointer hover:text-white hover:bg-[#0564a9]"
                  >
                    Liên lạc <i class="fa-solid fa-address-book" />
                  </button>
                </div>
              </div>
            </div>
            <hr class="my-10">
          </div>

          <!-- Location -->
          <div>
            <h4 class="text-2xl font-semibold text-gray-800 mb-4">
              Vị trí
            </h4>
            <div class="map h-[400px] w-full rounded-[10px] overflow-hidden shadow-md mb-[60px]">
              <MapView
                v-if="property && propertyCoordinates"
                :properties="[{...property, latitude: propertyCoordinates[0], longitude: propertyCoordinates[1]}]"
                :initial-center="propertyCoordinates"
                :initial-zoom="15"
              />
            </div>
          </div>
        </div>

        <!-- Right column: Form and agent info -->
        <div class="lg:w-1/3">
          <div class="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              Đặt lịch xem nhà
            </h2>
            <p class="text-sm text-gray-600 mb-6">
              {{ property.type }} for {{ property.categoryName }} - {{ property.address }}
            </p>
            <div class="bg-blue-50 rounded-xl p-4 mb-6">
              <p class="text-sm text-blue-800 font-medium">
                Giá niêm yết
              </p>
              <p 
                v-if="!isEditing" 
                class="text-3xl font-bold text-blue-900"
              >
                ${{ formatPrice(property.price) }}
              </p>
              <input
                v-else
                v-model="editedProperty.price"
                type="number"
                class="p-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
              >
            </div>
            <form
              class="space-y-4"
              @submit.prevent="handleSubmit"
            >
              <div class="relative">
                <i
                  class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :size="18"
                />
                <input
                  v-model="formData.phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
              <div class="relative">
                <i
                  class="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :size="18"
                />
                <input
                  v-model="formData.appointmentDate"
                  type="date"
                  name="appointmentDate"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
              <div class="relative">
                <i
                  class="fas fa-clock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :size="18"
                />
                <input
                  v-model="formData.appointmentTime"
                  type="time"
                  name="appointmentTime"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
              <div class="relative">
                <i
                  class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :size="18"
                />
                <input
                  v-model="formData.email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
              </div>
              <button
                type="submit"
                class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
              >
                Đặt lịch
              </button>
            </form>
            <p class="mt-4 text-xs text-center text-gray-500">
              Bằng cách đặt lịch, bạn đã đồng ý
              <a 
                href="#" 
                class="text-blue-500 hover:underline"
              >Điều khoản dịch vụ</a> <br>và
              <a 
                href="#" 
                class="text-blue-500 hover:underline"
              >Chính sách bảo mật</a> của chúng tôi
            </p>
          </div>
        </div>
      </div>

      <EditImage
        v-model:show="showImageDialog"
        :initial-images="editedProperty.imageUrls"
        @save="handleSaveImages"
      />
      <ChatComponent
        v-if="showChat && user"
        :sender-id="user.id"
        :recipient-id="property.userId"
        @close="showChat = false"
      />
    </div>
    <hr class="my-10">
    <MortgageCalculator 
      v-if="property.type == 'For Sale'"
      :property-price="property.price" 
    />
    <PropertyGallery :images="property.imageUrls" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChatComponent from './ChatComponent.vue';
import AmenitiesCheckbox from './AmenitiesCheckbox.vue';
import NearbyPlacesInput from './NearbyPlacesInput.vue';
import 'leaflet/dist/leaflet.css';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { webSocketService } from '@/services/websocketService'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import MortgageCalculator from './MortgageCalculator.vue';
import MapView from './MapView.vue'
import CreativeInput from './CreativeInput.vue';
import EditImage from './EditImage.vue';
import PropertyGallery from './PropertyGallery.vue';
import { useCategoryStore } from '../stores/categoryStore'

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const { user } = storeToRefs(userStore)

const showChat = ref(false);
const property = ref(null);
const editedProperty = ref({});
const isEditing = ref(false);
const contact = ref({});
const formData = ref({
  phoneNumber: '',
  appointmentDate: '',
  appointmentTime: '',
  email: ''
});
const showImageDialog = ref(false);
const isAgentOnline = ref(false);
const currentImageIndex = ref(0);
const propertyCoordinates = ref(null);

const emit = defineEmits(['loadNearbyProperty']);

const categoryOptions = computed(() => categoryStore.getCategoryOptions)

const isShow = computed(() => {
  return user.value && user.value.id === property.value?.userId;
});

const startChat = () => {
  if (user.value && user.value.id) {
    showChat.value = true;
  } else {
    router.push('/login');
  }
};

const info = computed(() => {
  return {
    location: property.value?.location || '',
    id: property.value?.id || null
  };
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const formatUpdatedAt = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
};

const getPlaceIcon = (placeName) => {
  const iconMap = {
    'đại học': 'fas fa-university',
    'trường': 'fas fa-school',
    'học viện': 'fas fa-university',
    'chợ': 'fas fa-store',
    'siêu thị': 'fas fa-shopping-cart',
    'cửa hàng': 'fas fa-store',
    'bệnh viện': 'fas fa-hospital',
    'phòng khám': 'fas fa-clinic-medical',
    'công viên': 'fas fa-tree',
    'nhà hàng': 'fas fa-utensils',
    'quán ăn': 'fas fa-utensils',
    'quán cà phê': 'fas fa-coffee',
    'phòng tập': 'fas fa-dumbbell',
    'ga': 'fas fa-train',
    'bến xe': 'fas fa-bus',
    'thư viện': 'fas fa-book',
    'rạp chiếu phim': 'fas fa-film',
    'nhà hát': 'fas fa-theater-masks',
    'bãi biển': 'fas fa-umbrella-beach',
    'sân bay': 'fas fa-plane',
    'ngân hàng': 'fas fa-landmark',
    'cây atm': 'fas fa-money-bill-wave',
    'nhà thuốc': 'fas fa-prescription-bottle-alt',
    'đồn công an': 'fas fa-shield-alt',
    'trạm cứu hỏa': 'fas fa-fire-extinguisher',
    'bưu điện': 'fas fa-mail-bulk',
    'nhà thờ': 'fas fa-church',
    'chùa': 'fas fa-place-of-worship',
    'đền': 'fas fa-place-of-worship',
    'miếu': 'fas fa-place-of-worship',
    'trung tâm thương mại': 'fas fa-shopping-mall',
    'sân vận động': 'fas fa-futbol',
    'trạm xăng': 'fas fa-gas-pump',
    'trường mầm non': 'fas fa-baby',
    'trường tiểu học': 'fas fa-school',
    'trường trung học': 'fas fa-school',
    'vườn bách thú': 'fas fa-paw',
    'trạm xe buýt': 'fas fa-bus-alt',
    'khu dân cư': 'fas fa-home',
    'khu đô thị': 'fas fa-city'
  };

  const lowerPlaceName = placeName.toLowerCase();

  for (const [key, value] of Object.entries(iconMap)) {
    if (lowerPlaceName.includes(key)) {
      return value;
    }
  }

  return 'fas fa-map-marker-alt';
};

const fetchProperty = async () => {
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/${route.params.id}`);
    if (!response.ok) throw new Error('Failed to fetch property');
    property.value = await response.json();
    editedProperty.value = JSON.parse(JSON.stringify(property.value));
    emit('loadNearbyProperty', info.value);
  } catch (error) {
    console.error('Error fetching property:', error);
  }
};

const getCoordinates = async (address) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
  return null;
};

const fetchUserContact = async () => {
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/users/id/${property.value.userId}`);
    if (response.ok) {
      contact.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching user contact:', error);
  }
};

const updateProperty = async () => {
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/${property.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedProperty.value)
    });
    if (!response.ok) throw new Error('Failed to update property');
    property.value = JSON.parse(JSON.stringify(editedProperty.value));
    isEditing.value = false;
    await fetchAllData();
  } catch (error) {
    console.error('Error updating property:', error);
  }
};

const fetchUserStatus = async () => {
  if (!user.value) {
    return;
  }
  const token = localStorage.getItem('jwt');
  try {
    const response = await fetch(`https://roombooking-fa3a.onrender.com/api/users/status/${contact.value.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAgentOnline.value = data.status === "online";
    }
  } catch (error) {
    console.error('Error fetching user status:', error);
  }
};

const handleSubmit = async () => {
  try {
    const tourRequestDTO = {
      propertyId: property.value.id,
      phoneNumber: formData.value.phoneNumber,
      email: formData.value.email,
      appointmentDate: formData.value.appointmentDate,
      appointmentTime: formData.value.appointmentTime,
    };

    const response = await fetch('https://roombooking-fa3a.onrender.com/api/tour-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tourRequestDTO)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit tour request');
    }

    const result = await response.json();
    console.log('Tour request submitted successfully:', result);

    formData.value = {
      phoneNumber: '',
      appointmentDate: '',
      appointmentTime: '',
      email: ''
    };

    alert('Tour request submitted successfully!');

  } catch (error) {
    console.error('Error submitting tour request:', error);
    alert(error.message || 'Failed to submit tour request. Please try again.');
  }
};

const cancelEdit = () => {
  editedProperty.value = JSON.parse(JSON.stringify(property.value));
  isEditing.value = false;
};

const openImageDialog = () => {
  showImageDialog.value = true;
};

const handleSaveImages = (newImages) => {
  editedProperty.value.imageUrls = newImages;
  updateProperty();
};

function handleUserStatus(message) {
  const statusUpdate = message
  if (statusUpdate.userId === contact.value.id) {
    const data = statusUpdate.status.status
    if (data === "online") {
      isAgentOnline.value = true
    } else {
      isAgentOnline.value = false
    }
  }
}

const fetchAllData = async () => {
  try {
    await fetchProperty();
    await Promise.all([
      fetchUserContact(),
    ]);
    await fetchUserStatus();
    if (property.value && property.value.address) {
      propertyCoordinates.value = await getCoordinates(property.value.address);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + property.value.imageUrls.length) % property.value.imageUrls.length;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % property.value.imageUrls.length;
};

const initialFetchDone = ref(false);

watch(() => route.params.id, (newId) => {
  if (newId && !initialFetchDone.value) {
    fetchAllData();
    initialFetchDone.value = true;
  }
}, { immediate: true });

onMounted(() => {
  if (!initialFetchDone.value) {
    fetchAllData();
    initialFetchDone.value = true;
  }
  webSocketService.addSubscription('/topic/user-status', handleUserStatus)
});
</script>

<style scoped>
.form-group label.active {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #6e8efb;
  background-color: white;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
}

.pulse {
  animation: pulse 2s infinite;
}
</style>