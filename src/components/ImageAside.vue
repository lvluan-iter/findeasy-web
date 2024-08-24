<template>
  <div id="contact-aside">
    <div class="banner">
      <i class="fa-solid fa-image"></i>
      <span>Hình ảnh:</span>
    </div>
    <div class="image-main">
      <img :src="getImageUrl(imageUrls[0])" alt="Main Image" @click="openImage(0)">
    </div>
    <div class="image-gallery">
      <div v-for="(url, index) in imageUrls.slice(1)" :key="index" class="image-thumbnail" @click="openImage(index)">
        <img :src="getImageUrl(url)" alt="Thumbnail">
      </div>
    </div>
    <div class="modal" v-show="isOpen" @click.self="closeImage">
      <div class="modalcontent">
        <div class="btnclose" @click="closeImage"><i class="fa-solid fa-xmark"></i></div>
        <div class="image">
          <img :src="getImageUrl(imageUrls[dialogIndex])" alt="Dialog Image">
        </div>
        <div class="nav-buttons">
          <button @click="prevImage"><i class="fa-solid fa-angle-left"></i></button>
          <button @click="nextImage"><i class="fa-solid fa-angle-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrls: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      dialogIndex: 0
    };
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://localhost:8080${imagePath}`;
    },
    openImage(index) {
      this.isOpen = true;
      this.dialogIndex = index;
    },
    closeImage() {
      this.isOpen = false;
      this.dialogIndex = 0;
    },
    prevImage() {
      if (this.dialogIndex > 0) {
        this.dialogIndex--;
      }
    },
    nextImage() {
      if (this.dialogIndex < this.imageUrls.length - 1) {
        this.dialogIndex++;
      }
    }
  }
};
</script>

<style scoped>
#contact-aside {
  border: 1px solid #D3D3D3;
  text-align: center;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: #ffffff;
  position: relative;
}

#contact-aside:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #4682B4;
  color: white;
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.banner i {
  font-size: 1.5em;
}

.image-main {
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3 ease;
}

.image-main:hover {
  transform: scale(1.05);
}

.image-main img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.image-gallery {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  background-color: #f9f9f9;
}

.image-thumbnail {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.image-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.image-thumbnail:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modalcontent {
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.btnclose {
  align-self: flex-end;
  cursor: pointer;
  padding: 10px;
}

.image {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.image img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.nav-buttons button {
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.nav-buttons button:focus {
  outline: none;
}
</style>
