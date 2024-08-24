<template>
    <div>
      <div class="flex flex-col gap-5">
        <div v-for="(property, index) in properties" :key="property.id"
          class="property grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] bg-white rounded-lg w-full relative cursor-pointer overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-8px]"
          @click="linktoDetail(property.id)">
          <!-- Image section -->
          <div class="relative overflow-hidden w-full h-[200px] md:h-full">
            <img class="image w-full h-full object-cover transition-transform duration-300 ease-in-out"
              :src="property.imageUrls[0]" :alt="property.title">
            <!-- Bottom button -->
            <div class="property-actions absolute bottom-3 left-3">
              <div class="relative">
                <button @click.stop="toggleActions(index)"
                  class="action-toggle bg-white text-gray-700 rounded-full w-8 h-8 shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center">
                  <i class="fas fa-ellipsis-h text-sm"></i>
                </button>

                <transition name="slide-fade">
                  <div v-if="showActions[index]"
                    class="action-menu absolute left-full ml-2 bottom-0 flex items-center space-x-2">
                    <button @click.stop="addToFavorites(property.id)"
                      class="action-btn bg-red-500 text-white rounded-full w-8 h-8 shadow-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center">
                      <i class="fas fa-heart text-sm"></i>
                    </button>
                    <button @click.stop="reportProperty"
                      class="action-btn bg-yellow-500 text-white rounded-full w-8 h-8 shadow-lg hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-center">
                      <i class="fas fa-flag text-sm"></i>
                    </button>
                    <button @click.stop="shareProperty(property)"
                      class="action-btn bg-blue-500 text-white rounded-full w-8 h-8 shadow-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center">
                      <i class="fas fa-share-alt text-sm"></i>
                    </button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <!-- Info section -->
          <div class="p-5 flex flex-col justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl text-gray-800 m-0 mb-1 font-medium line-clamp-1">{{ property.title }}</h3>
              <div class="flex items-center gap-0.5 text-sm sm:text-base text-[#707070]">
                <i class="fa-solid fa-location-dot"></i>
                <div class="line-clamp-1">{{ property.address }}</div>
              </div>
              <div class="text-sm sm:text-base text-[#707070] my-3">
                <div class="line-clamp-2">{{ property.description }}</div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5 border border-[#dee2e6] p-2 sm:p-3.5 rounded-md">
              <div class="text-sm sm:text-base text-[#707070] flex items-center gap-1">
                <i class="fa-solid fa-bed"></i>
                <span>{{ property.bedrooms }} bedrooms</span>
              </div>
              <div class="hidden sm:flex items-center w-px h-5 bg-[#707070]"></div>
              <div class="text-sm sm:text-base text-[#707070] flex items-center gap-1">
                <i class="fa-solid fa-bath"></i>
                <span>{{ property.bathrooms }} bathrooms</span>
              </div>
              <div class="hidden sm:flex items-center w-px h-5 bg-[#707070]"></div>
              <div class="text-sm sm:text-base text-[#707070] flex items-center gap-1">
                <i class="fa-solid fa-vector-square text-dark me-1"></i>
                <span>{{ property.area }} m²</span>
              </div>
            </div>
          </div>
          <!-- Price and action section -->
          <div class="p-5 bg-[#f5f5f5] flex flex-col lg:justify-around md:col-span-2 lg:col-span-1">
            <div class="flex flex-wrap justify-between items-center gap-4 lg:flex-col">
              <div class="text-center lg:text-left flex-grow lg:flex-grow-0">
                <div class="text-[#0a73c0] text-2xl sm:text-3xl font-semibold">
                  {{ property.price / 1000000 }}M <span
                    class="text-sm sm:text-base text-[#707070] font-normal">/month</span>
                </div>
              </div>
              <div class="text-center lg:text-left flex-grow lg:flex-grow-0">
                <strong>(incl.VAT)</strong><br>
                <span>Per booking</span>
              </div>
              <div class="flex justify-center gap-2 text-[#0a73c0] text-xs sm:text-sm flex-grow lg:flex-grow-0">
                <div
                  class="p-1 sm:p-1.5 bg-white border border-[#ced4da] rounded-md shadow-sm hover:bg-[#cdcdcd] hover:border-[#c6c7c8]">
                  <i class="fa-brands fa-whatsapp"></i>
                  WhatsApp
                </div>
                <div
                  class="p-1 sm:p-1.5 bg-white border border-[#ced4da] rounded-md shadow-sm hover:bg-[#cdcdcd] hover:border-[#c6c7c8]">
                  <i class="fa-brands fa-google"></i>
                  Gmail
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showPagination" class="flex justify-center items-center mt-8 gap-2.5">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0"
          class="page-button bg-white border border-[#0a73c0] text-[#0a73c0] rounded-md px-2 sm:px-3 py-1 sm:py-2 cursor-pointer transition-colors duration-300 ease-in hover:bg-[#0a73c0] hover:text-white">
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <div v-for="page in pages" :key="page" :class="[
          'px-2 sm:px-3 py-1 sm:py-2 rounded-md cursor-pointer text-xs sm:text-sm',
          'bg-[#0a73c0] text-white hover:bg-[#0056b3]',
          page === currentPage + 1 ? 'bg-[#3498db]' : ''
        ]" @click="changePage(page - 1)">
          {{ page }}
        </div>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1"
          class="page-number bg-white border border-[#0a73c0] text-[#0a73c0] rounded-md px-2 sm:px-3 py-1 sm:py-2 cursor-pointer transition-colors duration-300 ease-in hover:bg-[#0a73c0] hover:text-white">
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    initialProperties: Array,
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      properties: [],
      count: 0,
      currentPage: 0,
      totalPages: 0,
      showActions: {}
    };
  },
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  },
  watch: {
    initialProperties: {
      immediate: true,
      handler(newProperties) {
        if (newProperties && newProperties.length) {
          this.properties = newProperties;
        } else {
          this.fetchAvailableProperties();
        }
      }
    }
  },
  methods: {
    async fetchAvailableProperties() {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/available?page=${this.currentPage}`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        this.properties = data.content;
        this.count = data.totalElements;
        this.totalPages = data.totalPages;
        this.$emit('dataload', this.properties);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage < this.totalPages && newPage !== this.currentPage) {
        this.currentPage = newPage;
        this.fetchAvailableProperties();
      }
    },
    linktoDetail(id) {
      this.$router.push(`/propertydetail/${id}`);
    },
    shareProperty(property) {
      const shareUrl = `${window.location.origin}/propertydetail/${property.id}`;
      if (navigator.share) {
        navigator.share({
          title: property.title,
          text: property.description,
          url: shareUrl
        }).then(() => console.log('Thanks for sharing!')).catch(console.error);
      } else {
        navigator.clipboard.writeText(shareUrl)
          .then(() => alert('Link đã được sao chép vào clipboard!'))
          .catch(err => console.error('Could not copy text: ', err));
      }
    },
    addToFavorites(propertyId) {
      const url = `http://localhost:8080/api/users/${localStorage.getItem('username')}/favorites/${propertyId}`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
        .then(response => response.text().then(text => ({ text, status: response.status })))
        .then(({ text, status }) => {
          const message = status === 200 ? 'Đã thêm vào danh sách yêu thích!' :
            status === 409 ? `Lỗi: ${text}` :
              status === 404 ? `Không tìm thấy tài nguyên: ${text}` :
                'Có lỗi xảy ra. Vui lòng thử lại sau.';
          alert(message);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        });
    },
    toggleActions(index) {
      this.$set(this.showActions, index, !this.showActions[index]);
    },
    reportProperty() {
      // Implement report functionality
      alert('Property reported!');
    },
  }
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.action-btn, .action-toggle {
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.action-btn:hover, .action-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.action-btn:active, .action-toggle:active {
  transform: scale(0.95);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(10, 115, 192, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(10, 115, 192, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(10, 115, 192, 0);
  }
}

.action-toggle {
  animation: pulse 2s infinite;
}

.action-menu {
  transition: all 0.3s ease;
}

.action-menu .action-btn {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}

.action-menu .action-btn:nth-child(1) { transition-delay: 0.1s; }
.action-menu .action-btn:nth-child(2) { transition-delay: 0.2s; }
.action-menu .action-btn:nth-child(3) { transition-delay: 0.3s; }

.action-menu:hover .action-btn {
  opacity: 1;
  transform: translateX(0);
}

@media (hover: hover) {
  .property:hover .action-toggle {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .property-actions {
    bottom: 2px;
    left: 2px;
  }
  .action-btn, .action-toggle {
    width: 2rem;
    height: 2rem;
  }
}

@media (min-width: 641px) {
  .action-toggle {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .property:hover .action-toggle {
    opacity: 1;
  }
}

.page-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>