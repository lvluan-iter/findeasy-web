<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Quản lý danh mục</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Quản lý các danh mục bất động sản trong hệ thống</p>
      </div>
      <button
        class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg hover:bg-[rgb(8,92,154)] transition-colors flex items-center gap-2"
        @click="openModal()"
      >
        <i class="fas fa-plus" />
        Thêm danh mục
      </button>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(10,115,192)]" />
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
      {{ error }}
    </div>

    <div v-else-if="categories.length === 0" class="text-center py-12 text-slate-500 dark:text-slate-400">
      <i class="fas fa-folder-open text-4xl mb-3" />
      <p>Chưa có danh mục nào. Hãy thêm danh mục mới!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="aspect-video relative rounded-t-xl overflow-hidden">
          <img :src="category.imageUrl" :alt="category.categoryName" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-lg font-semibold text-white">
              {{ category.categoryName }}
            </h3>
          </div>
        </div>
        <div class="p-4 flex justify-end gap-2">
          <button
            class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            @click="openModal(category)"
          >
            <i class="fas fa-edit" />
          </button>
          <button
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            @click="confirmDelete(category)"
          >
            <i class="fas fa-trash" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {{ editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới' }}
        </h3>

        <div v-if="formError" class="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-500 text-sm rounded-lg">
          {{ formError }}
        </div>

        <form class="space-y-4" @submit.prevent="saveCategory">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Tên danh mục </label>
            <input
              v-model="formData.categoryName"
              type="text"
              required
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> URL Hình ảnh </label>
            <input
              v-model="formData.imageUrl"
              type="url"
              required
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              :disabled="isSaving"
              @click="closeModal"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg hover:bg-[rgb(8,92,154)] transition-colors disabled:opacity-50"
              :disabled="isSaving"
            >
              <i v-if="isSaving" class="fas fa-spinner fa-spin mr-2" />
              {{ editingCategory ? 'Cập nhật' : 'Thêm mới' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showDeleteConfirm = false" />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Xác nhận xóa</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          Bạn có chắc chắn muốn xóa danh mục "{{ categoryToDelete?.categoryName }}" không?
        </p>
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            :disabled="isDeleting"
            @click="showDeleteConfirm = false"
          >
            Hủy bỏ
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            :disabled="isDeleting"
            @click="deleteCategory"
          >
            <i v-if="isDeleting" class="fas fa-spinner fa-spin mr-2" />
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';

const {proxy} = getCurrentInstance();

const categories = ref([]);
const isLoading = ref(false);
const error = ref(null);
const isModalOpen = ref(false);
const showDeleteConfirm = ref(false);
const editingCategory = ref(null);
const categoryToDelete = ref(null);
const formData = ref({
  categoryName: '',
  imageUrl: ''
});
const formError = ref(null);
const isSaving = ref(false);
const isDeleting = ref(false);

const fetchCategories = async () => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    error.value = null;

    const response = await proxy.$http.get(Endpoint.getCategories);
    if (response.succeeded) {
      categories.value = response.result;
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to fetch categories');
    }
  } catch (err) {
    error.value = 'Không thể tải danh sách danh mục';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const openModal = (category = null) => {
  editingCategory.value = category;
  formError.value = null;
  if (category) {
    formData.value = {
      categoryName: category.categoryName,
      imageUrl: category.imageUrl
    };
  } else {
    formData.value = {
      categoryName: '',
      imageUrl: ''
    };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  if (!isSaving.value) {
    isModalOpen.value = false;
    editingCategory.value = null;
    formData.value = {
      categoryName: '',
      imageUrl: ''
    };
    formError.value = null;
  }
};

const saveCategory = async () => {
  try {
    isSaving.value = true;
    formError.value = null;

    const endpoint = editingCategory.value
      ? Endpoint.updateCategory(editingCategory.value.id)
      : Endpoint.createCategory;

    const response = await proxy.$http[editingCategory.value ? 'put' : 'post'](endpoint, formData.value);

    if (!response.succeeded) {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to save category');
    }

    isModalOpen.value = false;
    await fetchCategories();

    formData.value = {
      categoryName: '',
      imageUrl: ''
    };
    editingCategory.value = null;
  } catch (err) {
    formError.value = err.message || 'Không thể lưu danh mục. Vui lòng thử lại.';
    console.error('Error saving category:', err);
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (category) => {
  categoryToDelete.value = category;
  showDeleteConfirm.value = true;
};

const deleteCategory = async () => {
  if (!categoryToDelete.value) return;

  isDeleting.value = true;
  try {
    const response = await proxy.$http.delete(Endpoint.deleteCategory(categoryToDelete.value.id));

    if (!response.succeeded) {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to delete category');
    }

    await fetchCategories();
    showDeleteConfirm.value = false;
    categoryToDelete.value = null;
  } catch (err) {
    console.error('Error deleting category:', err);
  } finally {
    isDeleting.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
