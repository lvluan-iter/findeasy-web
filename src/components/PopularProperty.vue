<template>
  <div class="container">
    <h3>Top 10 bài đăng phổ biến</h3>
    <button
      class="scroll-btn left"
      @click="scrollLeft"
    >
      <i class="fa-solid fa-angles-left" />
    </button>
    <div class="properties">
      <div
        v-for="property in properties"
        :key="property.id"
        class="property"
        @click="linktoDetail(property.id)"
      >
        <div class="image-container">
          <img
            class="image"
            :src="getImageUrl(property.imageUrls[0])"
            :alt="property.title"
          >
          <div class="overlay">
            <button
              class="btn btn-bookmark"
              @click.stop
            >
              <i class="fa-solid fa-bookmark" /> Lưu
            </button>
            <button
              class="btn btn-view"
              @click.stop="linktoDetail(property.id)"
            >
              <i class="fa-regular fa-eye" /> Xem chi tiết
            </button>
          </div>
        </div>
        <div class="details">
          <h3 class="title">
            {{ property.title }}
          </h3>
          <div class="info">
            <div class="info-item">
              <i class="fa-solid fa-dollar-sign" />
              <div class="price">
                {{ property.price / 1000000 }} Triệu/tháng
              </div>
            </div>
            <div class="info-item">
              <i class="fa-solid fa-location-dot" />
              <div class="location">
                {{ getCleanLocation(property.location) }}
              </div>
            </div>
          </div>
          <div class="updated-at">
            Cập nhật: {{ formatUpdatedAt(property.updatedAt) }}
          </div>
        </div>
        <div class="bottom-btn">
          <div class="menu-icon">
            <i class="fa-solid fa-ellipsis-v" />
          </div>
          <div class="menu-items">
            <div
              class="menu-item"
              title="Report"
            >
              <i class="fa-solid fa-flag" />
            </div>
            <div
              class="menu-item"
              title="Share"
              @click.stop="shareProperty(property)"
            >
              <i class="fa-solid fa-share-nodes" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="scroll-btn right"
      @click="scrollRight"
    >
      <i class="fa-solid fa-angles-right" />
    </button>
  </div>
</template>

<script>
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export default {
    data() {
        return {
            properties: [],
        };
    },
    created() {
        this.fetchAvailableProperties();
    },
    methods: {
        getImageUrl(imagePath) {
            return `http://localhost:8080${imagePath}`;
        },
        async fetchAvailableProperties() {
            try {
                const response = await fetch(`https://roombooking-fa3a.onrender.com/api/properties/popular`);
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                this.properties = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        formatUpdatedAt(dateString) {
            const date = parseISO(dateString);
            return formatDistanceToNow(date, { addSuffix: true, locale: vi });
        },
        getCleanLocation(location) {
            return location.replace(/City|Province/g, '').trim();
        },
        linktoDetail(id) {
            this.$router.push(`/propertydetail/${id}`);
        },
        shareProperty(property) {
            if (navigator.share) {
                navigator.share({
                    title: property.title,
                    text: property.description,
                    url: window.location.href + `/propertydetail/${property.id}`
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch(console.error);
            } else {
                const shareUrl = window.location.href + `/propertydetail/${property.id}`;
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Link đã được sao chép vào clipboard!');
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            }
        },
        scrollLeft() {
            const container = this.$el.querySelector('.properties');
            container.scrollBy({ left: -300, behavior: 'smooth' });
        },
        scrollRight() {
            const container = this.$el.querySelector('.properties');
            container.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }
}
</script>

<style scoped>
@keyframes hoverUp {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10px);
    }
}

@keyframes zoomIn {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.05);
    }
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #4169e1 0%, #4682b4 50%, #5a9 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    text-align: center;
    position: relative;
}

h3 {
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}

.properties {
    display: flex;
    gap: 20px;
    padding: 8px 15px;
    overflow-x: hidden;
    scroll-behavior: smooth;
    width: 100%;
}

.property {
    background-color: #ffffff;
    border-radius: 16px;
    width: 285px;
    flex: 0 0 auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property:hover {
    animation: hoverUp 0.3s forwards, zoomIn 0.3s forwards;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.image-container {
    position: relative;
    overflow: hidden;
    height: 160px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: fill;
    transition: transform 0.3s ease-in-out;
}

.property:hover .image {
    transform: scale(1.05);
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-sizing: border-box;
}

.property:hover .overlay {
    opacity: 1;
}

.btn {
    padding: 8px 12px;
    background-color: #4682B4;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #4169E1;
}

.btn i {
    margin-right: 5px;
}

.bottom-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 15px;
    right: 15px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 4px;
    color: white;
    position: absolute;
    width: 22px;
    height: 22px;
    transition: background-color 0.3s ease, width 0.3s ease;
    overflow: hidden;
}

.bottom-btn:hover {
    background-color: #D3D3D3;
    width: 65px;
    color: #333;
}

.menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    width: 0;
    overflow: hidden;
    transition: width 0.3s ease;
}

.bottom-btn:hover .menu-items {
    width: 65px;
}

.bottom-btn:hover .menu-icon {
    opacity: 0;
}

.menu-item {
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.menu-item:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.details {
    padding: 20px;
    color: #333;
}

.title {
    font-size: 1.2em;
    margin: 0 0 10px;
    font-weight: bold;
    color: #4682B4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
}

.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9em;
    color: #555;
}

.price {
    color: #e74c3c;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.location {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.updated-at {
    color: #888;
    font-size: 0.8em;
    margin-top: 10px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
    z-index: 2;
}

.scroll-btn:hover {
    background-color: #2980b9;
    transform: translateY(-50%) scale(1.1);
}

.scroll-btn.left {
    left: 10px;
}

.scroll-btn.right {
    right: 10px;
}
</style>
