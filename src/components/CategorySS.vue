<template>
  <div class="con">
    <h3>Bạn muốn tìm kiếm loại phòng nào ? </h3>
    <div class="category">
      <div v-for="category in categories" :key="category.id" class="category-item" @click="updateAvaiblewithCate(category.id)">
        <div class="image-container">
          <img :src="category.imageUrl" :alt="category.categoryName">
        </div>
        <div><span>{{ category.categoryName }}</span></div>
        <div class="icons">
          <div @click.stop="editCategory(category)"><i class="fa-solid fa-pen-to-square" title="Edit"></i></div>
          <div @click.stop="deleteCategory(category.id)"><i class="fa-solid fa-trash" title="Delete"></i></div>
        </div>
      </div>
      <div class="addbutton" @click="showModal = true" title="Add Category">
        <i class="fa-solid fa-circle-plus"></i>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <button class="close" @click="showModal = false"><i class="fa-solid fa-xmark"></i></button>
        <h2>Thêm Loại Phòng</h2>
        <form @submit.prevent="addCategory">
          <div class="form-group">
            <label for="categoryName">Category Name:</label>
            <input type="text" v-model="newCategoryName" required>
          </div>
          <div class="form-group">
            <label for="imgUrl">Image URL:</label>
            <input type="text" v-model="newCategoryImgUrl" required>
          </div>
          <div class="form-group">
            <label for="img">Image:</label>
            <div style="width: 100%; height: 400px; box-sizing: border-box;"><img :src="newCategoryImgUrl" alt="Picture" style="width: 100%; height: 100%; object-fit: cover;"></div>
          </div>
          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
  
Vue.use(VueToast);

export default {
  data() {
    return {
      categories: [],
      showModal: false,
      newCategoryName: '',
      newCategoryImgUrl: '',
    };
  },
  created() {
    this.loadCategory();
  },
  methods: {
    async loadCategory() {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/`);
        if (!response.ok) {
          console.log("Lỗi khi tải dữ liệu từ server!");
          return;
        }
        this.categories = await response.json();
      } catch (error) {
        console.log("Lỗi trong quá trình xử lý dữ liệu!", error);
      }
    },
    async updateAvaiblewithCate(categoryId) {
      try {
        console.log(this.categoryId);
        const response = await fetch(`http://localhost:8080/api/properties/search?categoryId=${categoryId}`);
        if (!response.ok) {
          console.log("Lỗi trong quá trình lấy dữ liệu từ serve !")
        }
        const results = await response.json();
        this.$emit('loadavaibycate', results)
      } catch (error) {
        console.log("Lỗi trong quá trình xử lý dữ liệu !", error)
      }
    },
    async addCategory() {
      try {
        const response = await fetch('http://localhost:8080/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categoryName: this.newCategoryName,
            imageUrl: this.newCategoryImgUrl
          })
        });
        if (response.ok) {
          this.loadCategory();
          this.showModal = false;
          this.newCategoryName ='';
          this.newCategoryImgUrl = '';
        } else {
          const results = await response.text();
          this.$toast.open({
            message: results,
            type: 'error',
            duration: 5000,
            dismissible: true,
            position: 'top'
          })
        }
      } catch (error) {
        console.log('Lỗi trong quá trình xử lý dữ liệu!', error);
      }
    },
    editCategory(category) {
      this.showModal = true;
      this.newCategoryName = category.categoryName;
      this.newCategoryImgUrl = category.imageUrl;
    },
    async deleteCategory(categoryId) {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.loadCategory();
        } else {
          console.log('Lỗi khi xóa category');
        }
      } catch (error) {
        console.log('Lỗi trong quá trình xử lý dữ liệu!', error);
      }
    }
  }
};
</script>

<style scoped>
.con {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.category {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; /* Khoảng cách giữa các item */
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Tăng độ sâu của đổ bóng */
  border-radius: 8px;
  background-color: #ffffff;
  text-align: center;
  position: relative;
  transition: background-color 0.3s, transform 0.3s; /* Hiệu ứng hover */
}

.category-item:hover {
  background-color: #f0f0f0; /* Màu nền khi hover */
  transform: translateY(-5px); /* Độ nhô lên khi hover */
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px; /* Chiều cao cố định */
  width: 120px; /* Chiều rộng cố định */
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px; /* Bo góc cho hình ảnh */
}


.addbutton {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;
}

.addbutton:hover,
.category-item:hover {
  background-color: #e0e0e0;
}

.addbutton i {
  font-size: 24px;
  color: #333;
}

.icons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 5px;
}

.icons div {
  cursor: pointer;
}

.icons svg {
  font-size: 10px; 
  color: #777; 
  transition: color 0.3s; 
}

.icons svg:hover {
  color: #007bff; 
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

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.close i {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>


  