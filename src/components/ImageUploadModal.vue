<template>
  <div
    v-if="isVisible"
    class="modal"
  >
    <div class="modal-content">
      <span
        class="close"
        @click="close"
      >&times;</span>
      <h2>Thay đổi ảnh</h2>
      <div class="image-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-item"
        >
          <img
            :src="image.url"
            alt="Property Image"
          >
          <button
            class="remove"
            @click="removeImage(index)"
          >
            x
          </button>
        </div>
        <div
          class="image-item add-new"
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            style="display: none;"
            @change="handleFileChange"
          >
          <button class="add">
            +
          </button>
        </div>
      </div>
      <button
        class="save"
        @click="save"
      >
        Xong
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible', 'initialImages'],
  data() {
    return {
      images: [...this.initialImages],
      newImages: []
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleFileChange(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        this.newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({ url: e.target.result, file });
        };
        reader.readAsDataURL(file);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    async save() {
      const formData = new FormData();
      this.newImages.forEach(file => {
        formData.append('images', file);
      });
      
      try {
        const response = await fetch('https://roombooking-fa3a.onrender.com/api/upload-images', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload images');
        }

        const uploadedUrls = await response.json();
        const finalImages = this.images.map(image => image.url).concat(uploadedUrls);
        this.$emit('save', finalImages);
        this.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.add-new {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.add-new input {
  display: none;
}

.add-new .add {
  font-size: 24px;
}

.save {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
