<template>
  <div v-if="property">
    <!-- Header section -->
    <div class="flex flex-wrap gap-2 sm:gap-5 items-center mt-5 lg:mt-14 my-4 sm:my-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32">
      <div class="text-[rgb(10,115,192)] font-medium cursor-pointer inline-block hover:underline"
        @click="$router.go(-1);">
        <i class="fa-solid fa-angle-left"></i>
        Back
      </div>
      <div class="hidden sm:flex items-center w-[0.1px] h-5 bg-[#707070]"></div>
      <div class="font-semibold text-base sm:text-lg md:text-[18px] text-[#212529]">
        {{ property.title }}
      </div>
      <div class="action-buttons flex flex-wrap gap-2 sm:gap-5 w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0"
        v-show="isShow">
        <div class="hidden sm:flex items-center w-[0.1px] h-5 bg-[#707070]"></div>
        <button v-if="!isEditing" @click="isEditing = true"
          class="flex items-center gap-1 text-[16px] text-[rgb(10,115,192)] font-semibold hover:underline">
          <span>Sửa</span>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button v-if="isEditing" @click="updateProperty"
          class="flex items-center gap-1 text-[16px] text-[#28a745] font-semibold hover:underline">
          <span>Lưu</span>
          <i class="fa-solid fa-save"></i>
        </button>
        <button v-if="isEditing" @click="cancelEdit"
          class="flex items-center gap-1 text-[16px] text-[#dc3545] font-semibold hover:underline">
          <span>Hủy</span>
          <i class="fa-solid fa-times"></i>
        </button>
        <button class="flex items-center gap-1 text-[16px] text-[#6c757d] font-semibold hover:underline">
          <span>Ẩn</span>
          <i class="fa-solid fa-eye-slash"></i>
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-[70%_30%] gap-2 aspect-[16/9] w-full">
      <div class="relative w-full h-full">
        <img class="w-full h-full object-fill" :src="property.imageUrls[0]" alt="Main Image">
        <button v-if="isEditing" @click="openImageDialog" class="absolute top-0 right-0 p-2 bg-white rounded-bl-lg">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
      <div class="grid grid-rows-2 gap-2 h-full">
        <div class="w-full h-full">
          <img class="w-full h-full object-fill" :src="property.imageUrls[1]" alt="Image">
        </div>
        <div class="w-full h-full">
          <img class="w-full h-full object-fill" :src="property.imageUrls[2]" alt="Image">
        </div>
      </div>
    </div>

    <!-- Property details -->
    <div
      class="mt-8 lg:mt-0 lg:absolute lg:right-[5%] lg:bottom-[-40%] z-10 rounded-[20px] w-full max-w-[400px] p-5 sm:p-8 bg-white shadow-lg">
      <p class="m-0">Property for rent</p>
      <h2 class="font-bold text-[#212529] text-[calc(1.325rem+0.9vw)] mb-[20px]">
        <span v-if="!isEditing">{{ formatPrice(property.price) }}</span>
        <input v-else v-model="editedProperty.price" class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md"
          type="number" />
      </h2>
      <p class="mb-[20px] text-[#0a73c0] border-b border-[#0a73c0] inline-block font-semibold">
        Schedule a Tour
      </p>
      <form id="schedule" @submit.prevent="handleSchedule" method="post">
        <div class="form-group relative mb-4 text-left animate-fade-in-up">
          <label :class="{ 'active': formData.phoneNumber.length > 0 || isFocusedPhoneNumber }" for="phoneNumber"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555] px-1.5 transition-all duration-300 pointer-events-none text-sm">
            Phone Number
          </label>
          <input v-model="formData.phoneNumber" @focus="isFocusedPhoneNumber = true"
            @blur="isFocusedPhoneNumber = false"
            class="w-full p-2 border border-[#ddd] rounded-lg text-sm transition-colors duration-300 focus:border-[#6e8efb] focus:outline-none focus:ring-0 focus:shadow-[0_0_8px_rgba(110,142,251,0.5)]"
            type="text" required>
        </div>
        <div class="form-group relative mb-4 text-left animate-fade-in-up">
          <input v-model="formData.appointmentDate"
            class="w-full p-2 border border-[#ddd] rounded-lg text-sm transition-colors duration-300 focus:border-[#6e8efb] focus:outline-none focus:ring-0 focus:shadow-[0_0_8px_rgba(110,142,251,0.5)]"
            type="date" required>
        </div>
        <div class="form-group relative mb-4 text-left animate-fade-in-up">
          <label :class="{ 'active': formData.email.length > 0 || isFocusedEmail }" for="email"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555] px-1.5 transition-all duration-300 pointer-events-none text-sm">
            Email
          </label>
          <input v-model="formData.email" @focus="isFocusedEmail = true" @blur="isFocusedEmail = false"
            class="w-full p-2 border border-[#ddd] rounded-lg text-sm transition-colors duration-300 focus:border-[#6e8efb] focus:outline-none focus:ring-0 focus:shadow-[0_0_8px_rgba(110,142,251,0.5)]"
            type="email" required>
        </div>
        <button type="submit"
          class="w-full p-[10px] bg-gradient-to-r from-[#6e8efb] to-[#a777e3] text-white border-none rounded-[10px] text-[16px] cursor-pointer transition-all duration-300 hover:from-[#a777e3] hover:to-[#6e8efb] hover:scale-[1.05] active:scale-[0.95]">
          Schedule a Tour
        </button>
      </form>
    </div>

    <!-- Property information -->
    <div class="mt-[50px] px-4 sm:px-6 md:px-8 lg:px-[120px] lg:pr-[550px] relative">
      <p class="text-[16px] text-[#707070] flex gap-[2px] m-0 items-center">
        <i class="fa-solid fa-location-dot"></i>
        <span v-if="!isEditing">{{ property.address }}</span>
        <input v-else v-model="editedProperty.address"
          class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" />
      </p>
      <h1 class="text-[calc(1.325rem+0.9vw)] font-medium m-[5px_0_20px_0] text-[#212529]" v-if="!isEditing">
        {{ property.title }}
      </h1>
      <input v-else v-model="editedProperty.title"
        class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" />
      <div class="flex flex-wrap items-center gap-[10px]">
        <div class="flex gap-1 items-center text-[#707070]">
          <i class="fa-solid fa-vector-square text-[#2c3e50]"></i>
          <p>
            <span v-if="!isEditing">{{ property.area }}</span>
            <input v-else v-model="editedProperty.area"
              class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" type="number" />
          </p>
          <span>m²</span>
        </div>
        <div class="flex items-center w-[0.1px] h-[20px] bg-[#707070]"></div>
        <div class="flex gap-1 items-center text-[#707070]">
          <i class="fa-solid fa-bed text-[#2c3e50]"></i>
          <p>
            <span v-if="!isEditing">{{ property.bedrooms }} bedrooms</span>
            <input v-else v-model="editedProperty.bedrooms"
              class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" type="number" />
          </p>
        </div>
        <div class="flex items-center w-[0.1px] h-[20px] bg-[#707070]"></div>
        <div class="flex gap-1 items-center text-[#707070]">
          <i class="fa-solid fa-bath text-[#2c3e50]"></i>
          <p>
            <span v-if="!isEditing">{{ property.bathrooms }} bathrooms</span>
            <input v-else v-model="editedProperty.bathrooms"
              class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" type="number" />
          </p>
        </div>
        <div class="flex items-center w-[0.1px] h-[20px] bg-[#707070]"></div>
        <div class="flex gap-1 items-center text-[#707070]">
          <i class="fa-solid fa-couch text-[#2c3e50]"></i>
          <p>
            <span v-if="!isEditing">{{ property.furniture }}</span>
            <input v-else v-model="editedProperty.furniture"
              class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md" />
          </p>
        </div>
      </div>
      <hr class="my-10">
    </div>

    <!-- About the property -->
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] lg:pr-[550px]">
      <h4 class="text-2xl font-semibold text-[#212529] mb-5">About the property</h4>
      <p class="mb-[15px] text-[16px] leading-[1.6] text-[#707070]">
        <span v-if="!isEditing">{{ property.description }}</span>
        <textarea v-else v-model="editedProperty.description"
          class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md"></textarea>
      </p>
      <p class="mb-[15px] text-[16px] leading-[1.6] text-[#707070]">
        <strong>Chỉnh sửa lần cuối:</strong> {{ formatUpdatedAt(property.updatedAt) }}
      </p>
      <hr class="my-10">
    </div>

    <!-- Amenities -->
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] lg:pr-[550px]">
      <h4 class="text-2xl font-semibold text-[#212529] mb-5">Amenities Available</h4>
      <p class="mb-[15px] text-[16px] leading-[1.6] text-[#707070]">
        <span v-if="!isEditing">{{ property.amenities }}</span>
        <textarea v-else v-model="editedProperty.amenities"
          class="w-full p-2 text-base mb-2.5 border border-[#ddd] rounded-md"></textarea>
      </p>
      <hr class="my-10">
    </div>

    <!-- Reach The Agent -->
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] lg:pr-[550px]">
      <h4 class="text-2xl font-semibold text-[#212529] mb-5">Reach The Agent</h4>
      <div class="flex flex-col sm:flex-row gap-4">
        <div>
          <div class="border border-[#0a73c0] p-[4px] rounded-full inline-block">
            <div class="avatar w-[158px] h-[158px] rounded-full overflow-hidden">
              <img class="w-full h-full object-cover" :src="contact.avatar" alt="User avatar">
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-around">
          <div>
            <h5 class="font-medium text-[1.25rem] text-[#212529] mb-1">{{ contact.fullname }}</h5>
            <p class="m-0">{{ contact.phoneNumber }}</p>
          </div>
          <div class="flex gap-2 mt-4 sm:mt-0">
            <div
              class="btn-a p-[5px] border border-[#0a73c0] text-[#0a73c0] inline-block font-medium rounded-[5px] cursor-pointer hover:text-white hover:bg-[#0564a9]">
              Chat
              <i class="fa-solid fa-message"></i>
            </div>
            <div
              class="btn-a p-[5px] border border-[#0a73c0] text-[#0a73c0] inline-block font-medium rounded-[5px] cursor-pointer hover:text-white hover:bg-[#0564a9]">
              Contact Agent
              <i class="fa-solid fa-address-book"></i>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-10">
    </div>

    <!-- Location -->
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] lg:pr-[550px]">
      <h4 class="text-2xl font-semibold text-[#212529] mb-5">Location</h4>
      <div class="map h-[400px] w-full rounded-[10px] overflow-hidden shadow-md mb-[60px]" id="map"></div>
    </div>

    <!-- Property Gallery -->
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-[60px] bg-[#212529]">
      <div class="mb-14">
        <div class="inline-block px-[30px] py-[10px] bg-white rounded-full text-[rgb(10,115,192)] mb-2.5">
          <span>Property Gallery</span>
        </div>
        <p class="font-bold text-[calc(1.375rem+1.5vw)] text-white m-0 mb-2">See Our Property Gallery</p>
        <span class="text-white">Our guests always enjoy unique stays around the world.<br>
          Tag @FindEasy on Instagram for a chance to be featured!</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
        <div v-for="(image, index) in displayedImages" :key="index" class="relative rounded-xl overflow-hidden"
          :class="getImageClass(index)">
          <img :src="image.url" class="w-full h-full object-cover" alt="Gallery image" />
          <div v-if="index === 5 && imageCount > 6"
            class="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-2xl">
            +{{ imageCount - 6 }} Images
          </div>
        </div>
      </div>
    </div>

    <!-- Image Dialog -->
    <div v-if="showImageDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 max-w-3xl w-full">
        <div class="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 class="text-xl font-bold">Chỉnh sửa hình ảnh</h3>
          <button @click="cancelImageDialog" class="text-gray-500 hover:text-red-500">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4">
          <div v-for="(image, index) in temporaryImages" :key="index" class="relative">
            <img :src="image" alt="Property Image" class="w-full h-24 object-cover rounded border" />
            <button @click="removeTempImage(index)"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              &times;
            </button>
          </div>
        </div>
        <input type="file" @change="handleFileUpload" multiple class="mb-4" />
        <div class="flex justify-end gap-2">
          <button @click="saveImages" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Lưu
          </button>
          <button @click="cancelImageDialog" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export default {
  name: 'PropertyDetail',
  props: ['id'],
  data() {
    return {
      property: null,
      editedProperty: {},
      isEditing: false,
      user: {},
      contact: {},
      formData: {
        phoneNumber: '',
        appointmentDate: '',
        email: ''
      },
      isFocusedPhoneNumber: false,
      isFocusedEmail: false,
      showImageDialog: false,
      temporaryImages: [],
      map: null,
      marker: null
    };
  },
  computed: {
    displayedImages() {
      return this.property?.imageUrls?.slice(0, 6).map(url => ({ url })) || [];
    },
    imageCount() {
      return this.property?.imageUrls?.length || 0;
    },
    isShow() {
      return this.user.id === this.property?.userId;
    },
    info() {
      return {
        location: this.property?.location || '',
        id: this.property?.id || null
      };
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchAllData();
        }
      }
    }
  },
  methods: {
    getImageClass(index) {
      return index % 2 === 0 ? 'h-[260px]' : 'h-[160px]';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
    formatUpdatedAt(dateString) {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    },
    async fetchAllData() {
      try {
        await this.fetchProperty();
        await Promise.all([
          this.fetchUserContact(),
          this.fetchUserInfo()
        ]);
        this.initializeMap();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchProperty() {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${this.id}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        this.property = await response.json();
        this.editedProperty = { ...this.property };
        this.$emit('loadNearbyProperty', this.info);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    },
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/users/info', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          this.user = await response.json();
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    async fetchUserContact() {
      try {
        const response = await fetch(`http://localhost:8080/api/users/id/${this.property.userId}`);
        if (response.ok) {
          this.contact = await response.json();
        }
      } catch (error) {
        console.error('Error fetching user contact:', error);
      }
    },
    async initializeMap() {
      if (!this.property?.address) return;

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.property.address)}`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          this.map = L.map('map').setView([lat, lon], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);
          this.marker = L.marker([lat, lon]).addTo(this.map);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    },
    async updateProperty() {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${this.property.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editedProperty)
        });
        if (!response.ok) throw new Error('Failed to update property');
        this.property = { ...this.editedProperty };
        this.isEditing = false;
        this.fetchAllData();
      } catch (error) {
        console.error('Error updating property:', error);
      }
    },
    cancelEdit() {
      this.editedProperty = { ...this.property };
      this.isEditing = false;
    },
    openImageDialog() {
      this.temporaryImages = [...this.editedProperty.imageUrls];
      this.showImageDialog = true;
    },
    cancelImageDialog() {
      this.showImageDialog = false;
      this.temporaryImages = [];
    },
    async handleFileUpload(event) {
      const files = event.target.files;
      if (files.length) {
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('images', file);
        });
        try {
          const response = await fetch('http://localhost:8080/api/upload-images', {
            method: 'POST',
            body: formData,
          });
          const imageUrls = await response.json();
          this.temporaryImages.push(...imageUrls);
        } catch (error) {
          console.error('Error uploading images:', error);
        }
      }
    },
    removeTempImage(index) {
      this.temporaryImages.splice(index, 1);
    },
    async saveImages() {
      this.editedProperty.imageUrls = [...this.temporaryImages];
      this.showImageDialog = false;
      await this.updateProperty();
    },
    handleSchedule() {
      // Implement scheduling logic here
      console.log('Schedule submitted:', this.formData);
    }
  }
};
</script>

<style scoped>
.form-group label.active {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #6e8efb;
  background-color: white;
}
</style>
