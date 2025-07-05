<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <h3 class="text-2xl font-bold text-gray-800">
          <i class="fas fa-images mr-2 text-blue-500" />Chỉnh sửa hình ảnh
        </h3>
        <button
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          @click="cancelEdit"
        >
          <i class="fas fa-times text-2xl" />
        </button>
      </div>
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="relative group"
          >
            <img
              :src="image"
              alt="Property Image"
              class="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            >
            <button
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              @click="removeImage(index)"
            >
              <i class="fas fa-trash-alt" />
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label
            for="file-upload"
            class="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <i class="fas fa-cloud-upload-alt text-3xl mb-2" />
            <span class="text-base font-semibold">Chọn hình ảnh</span>
            <input
              id="file-upload"
              type="file"
              multiple
              class="hidden"
              @change="handleFileUpload"
            >
          </label>
        </div>
      </div>
      <div class="flex justify-end items-center gap-4 p-6 border-t border-gray-200">
        <button
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          @click="cancelEdit"
        >
          Hủy
        </button>
        <button
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          @click="saveChanges"
        >
          <i class="fas fa-save mr-2" />Lưu thay đổi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  initialImages: Array
});

const emit = defineEmits(['update:show', 'save']);

const images = ref([]);

watch(() => props.initialImages, (newImages) => {
  images.value = [...newImages];
}, { immediate: true });

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const handleFileUpload = async (event) => {
  const files = event.target.files;
  if (files.length) {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });
    try {
      const response = await fetch('https://roombooking-fa3a.onrender.com/api/upload-images', {
        method: 'POST',
        body: formData,
      });
      const imageUrls = await response.json();
      images.value.push(...imageUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }
};

const cancelEdit = () => {
  emit('update:show', false);
};

const saveChanges = () => {
  emit('save', images.value);
  emit('update:show', false);
};
</script>