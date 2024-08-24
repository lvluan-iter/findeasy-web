<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <form @submit.prevent="submitProperty" @keydown.enter.prevent class="space-y-8">
      <!-- Header section -->
      <div class="flex flex-wrap items-center gap-4 mb-8">
        <button @click="$router.go(-1)"
          class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition duration-300">
          <i class="fas fa-angle-left"></i>
          <span>Back</span>
        </button>
        <div class="hidden sm:block w-px h-6 bg-gray-300"></div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
          ADD NEW PROPERTY (Normal)
        </h1>
      </div>

      <!-- Main content -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Property form header -->
        <div class="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-200">
          <div class="text-lg font-semibold text-gray-800">Add Property</div>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span>{{ currentDate }}</span>
            <i class="fas fa-calendar-alt text-[rgb(10,115,192)]"></i>
            <div class="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <span>Your listing plan: Standard</span>
              <i class="fas fa-caret-down"></i>
            </div>
          </div>
        </div>

        <!-- Form sections -->
        <div class="p-6 space-y-8">
          <!-- Basic Information -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-font text-gray-400"></i>
                  </div>
                  <input v-model="property.title" id="title" type="text" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Main Title">
                </div>
              </div>

              <div class="space-y-2">
                <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-building text-gray-400"></i>
                  </div>
                  <select v-model="property.type" id="type"
                    class="block w-full pl-10 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="">Select Type</option>
                    <option value="For Rent">For Rent</option>
                    <option value="For Sale">For Sale</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-layer-group text-gray-400"></i>
                  </div>
                  <select v-model="property.categoryId" id="category"
                    class="block w-full pl-10 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value= null>Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.categoryName }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-dollar-sign text-gray-400"></i>
                  </div>
                  <input v-model="property.price" id="price" type="number" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Price">
                </div>
              </div>

              <div class="space-y-2">
                <label for="tags" class="block text-sm font-medium text-gray-700">Tags</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-tags text-gray-400"></i>
                  </div>
                  <tag-input v-model="tags" @input="handleTagsUpdate" id="tags" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"></tag-input>
                </div>
              </div>
            </div>
          </section>

          <!-- Property Description -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Property Description</h2>
            <div class="space-y-2">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea v-model="property.description" id="description" rows="6" required
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none"
                placeholder="Provide a detailed description of the property"></textarea>
            </div>
          </section>

          <!-- Location / Contacts -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Location / Contacts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-2">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-map-marker-alt text-gray-400"></i>
                  </div>
                  <input v-model="property.address" @blur="updateMapByAddress" id="address" type="text" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Full Address">
                </div>
              </div>
              <div class="space-y-2">
                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-location-arrow text-gray-400"></i>
                  </div>
                  <input v-model="property.location" id="location" type="text" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="City, State">
                </div>
              </div>
            </div>
            <div id="map" class="h-96 rounded-lg overflow-hidden shadow-md">
              <l-map style="height: 100%" :zoom="zoom" :center="center" @click="updateAddress">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker :lat-lng="marker"></l-marker>
              </l-map>
            </div>
          </section>

          <!-- Property Media -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Property Media</h2>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300"
              @click="triggerFileUpload" @dragover.prevent @drop.prevent="handleFileDrop">
              <input type="file" id="imageUpload" ref="fileInput" @change="previewImages" accept="image/*" multiple
                class="hidden">
              <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
              <p class="text-sm text-gray-600">Click here or drop files to upload</p>
              <p class="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, GIF (Max 5MB each)</p>
            </div>
            <div v-if="images.length > 0"
              class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div v-for="(image, index) in images" :key="index" class="relative group">
                <img :src="image.url" :alt="`Property Image ${index + 1}`"
                  class="w-full h-24 object-cover rounded-lg shadow-md">
                <button @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </section>

          <!-- Property Details -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label for="area" class="block text-sm font-medium text-gray-700">Area (sq ft)</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-expand-arrows-alt text-gray-400"></i>
                  </div>
                  <input v-model="property.area" id="area" type="number" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Area">
                </div>
              </div>
              <div class="space-y-2">
                <label for="bedrooms" class="block text-sm font-medium text-gray-700">Bedrooms</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-bed text-gray-400"></i>
                  </div>
                  <input v-model="property.bedrooms" id="bedrooms" type="number" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Number of Bedrooms">
                </div>
              </div>
              <div class="space-y-2">
                <label for="bathrooms" class="block text-sm font-medium text-gray-700">Bathrooms</label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-bath text-gray-400"></i>
                  </div>
                  <input v-model="property.bathrooms" id="bathrooms" type="number" required
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Number of Bathrooms">
                </div>
              </div>
            </div>
          </section>

          <!-- Amenities -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="(feature, index) in features" :key="index" class="flex items-center">
                <input type="checkbox" v-model="feature.checked" :id="'feature-' + index" class="hidden">
                <label :for="'feature-' + index" class="flex items-center cursor-pointer">
                  <span
                    class="w-5 h-5 inline-block mr-2 rounded border border-gray-300 flex-shrink-0 transition-colors duration-200 ease-in-out relative"
                    :class="{ 'bg-blue-500 border-blue-500': feature.checked }">
                    <i :class="{'fas fa-check text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2': feature.checked}"></i>
                  </span>
                  <span class="text-sm text-gray-700">{{ feature.name }}</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        <!-- Submit buttons -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
          <button @click="$router.go(-1)" type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Upload
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
import TagInput from './TagInput.vue';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    TagInput
  },
  data() {
    return {
      property: {
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
        userId: null,
      },
      currentDate: '',
      images: [],
      features: [],
      categories: [],
      users: [],
      tags: [],
      zoom: 13,
      center: [10.762622, 106.660172],
      marker: [10.762622, 106.660172],
    };
  },
  created() {
    this.fetchCategories();
    this.fetchUser();
    this.fetchAmenities();
    this.setCurrentDate();
  },
  methods: {
    setCurrentDate() {
      const today = new Date();
      this.currentDate = today.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.property.categoryId = category.id;
      console.log(this.property.categoryId)
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleTagsUpdate(newTags) {
      this.tags = newTags;
      this.property.keywords = newTags.join(', ');
    },
    async fetchAmenities() {
      try {
        const response = await fetch('http://localhost:8080/api/amenities');
        const data = await response.json();
        this.features = data.map(item => ({ ...item, checked: false }));
      } catch (error) {
        console.error('Failed to fetch amenities:', error);
      }
    },
    updateAmenities() {
      this.property.amenities = this.features
        .filter(feature => feature.checked)
        .map(feature => feature.id);
    },
    previewImages(event) {
      const files = event.target.files;
      if (files) {
        this.addImagesToPreview(files);
      }
    },
    handleFileDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files) {
        this.addImagesToPreview(files);
      }
    },
    addImagesToPreview(files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = e => {
            this.images.push({ file, url: e.target.result });
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please upload image files only (max 5MB each)');
        }
      });
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    async submitProperty() {
      this.updateAmenities();

      // Upload images
      const formData = new FormData();
      this.images.forEach(image => {
        formData.append('images', image.file);
      });

      try {
        const imageResponse = await fetch('http://localhost:8080/api/upload-images', {
          method: 'POST',
          body: formData,
        });
        if (!imageResponse.ok) throw new Error('Failed to upload images');
        const imageUrls = await imageResponse.json();
        this.property.imageUrls = imageUrls;

        // Submit property data
        const propertyResponse = await fetch('http://localhost:8080/api/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.property),
        });
        if (!propertyResponse.ok) throw new Error('Failed to submit property data');

        // Reset form and show success message
        this.resetForm();
        this.$toast.success('Property added successfully!');
      } catch (error) {
        console.error('Error:', error);
        this.$toast.error('An error occurred. Please try again.');
      }
    },
    resetForm() {
      this.property = {
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
        userId: null,
      };
      this.images = [];
      this.tags = [];
      this.selectedType = '';
      this.selectedCategory = null;
      this.$refs.fileInput.value = null;
    },
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:8080/api/categories/');
        if (!response.ok) throw new Error('Failed to fetch categories');
        this.categories = await response.json();
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.$toast.error('Failed to load categories');
      }
    },
    async fetchUser() {
      const jwtToken = localStorage.getItem('jwt');
      if (!jwtToken) {
        this.$router.push('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/users/info`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        this.property.userId = userData.id;
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('jwt');
        this.$toast.error('Session expired. Please log in again.');
        this.$router.push('/login');
      }
    },
    updateMapByAddress() {
      if (this.property.address) {
        const encodedAddress = encodeURIComponent(this.property.address);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`, {
          headers: {
            'Accept-Language': 'vi'
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              const { lat, lon } = data[0];
              this.center = [parseFloat(lat), parseFloat(lon)];
              this.marker = [parseFloat(lat), parseFloat(lon)];
            }
          })
          .catch(error => console.error('Error fetching map coordinates:', error));
      }
    },
    updateAddress(e) {
      const { lat, lng } = e.latlng;
      this.marker = [lat, lng];
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: {
          'Accept-Language': 'vi'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.property.address = data.display_name;
          this.property.location = data.address.city || data.address.town || data.address.village;
        })
        .catch(error => console.error('Error fetching address:', error));
    },
  },
};
</script>

<style scoped>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
