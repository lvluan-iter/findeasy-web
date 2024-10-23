<template>
  <div class="user-favorite">
    <h2>Danh Sách Bài Đăng Đã Lưu</h2>
    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>
    <div
      v-if="error"
      class="error"
    >
      Error: {{ error }}
    </div>
    <div
      v-if="!loading && !error && favoriteProperties.length > 0"
      class="property-list"
    >
      <div
        v-for="property in favoriteProperties"
        :key="property.id"
        class="property-item"
      >
        <img
          :src="getImageUrl(property.imageUrls[0])"
          alt="Property Image"
          class="property-image"
        >
        <div class="property-details">
          <h3>{{ property.title }}</h3>
          <p class="property-description">
            {{ property.description }}
          </p>
          <div class="property-price">
            {{ property.price }} VND
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!loading && !error && favoriteProperties.length === 0"
      class="no-properties"
    >
      No favorite properties found.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propertyIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      favoriteProperties: [],
      loading: true,
      error: null
    }
  },
  watch: {
    propertyIds: 'fetchProperties'
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://localhost:8080${imagePath}`;
    },
    async fetchProperties() {
      try {
        const responses = await Promise.all(this.propertyIds.map(id => 
          fetch(`http://localhost:8080/api/properties/${id}`).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch property with ID ${id}`);
            }
            return response.json();
          })
        ));
        this.favoriteProperties = responses;
      } catch (error) {
        console.error('Error fetching properties:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.user-favorite {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
}

.loading, .error {
  text-align: center;
  color: #ff0000;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.property-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.property-image {
  width: 40%;
  height: 200px;
  object-fit: cover;
}

.property-details {
  padding: 15px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.property-details h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.property-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.property-price {
  font-weight: bold;
  color: #4682B4;
  font-size: 16px;
}

.no-properties {
  text-align: center;
  color: #666;
}
</style>
