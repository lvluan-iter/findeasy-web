<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">Quản lý địa điểm</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Quản lý các địa điểm bất động sản trong hệ thống</p>
      </div>
      <button
        class="px-4 py-2 bg-[rgb(10,115,192)] text-white rounded-lg hover:bg-[rgb(8,92,154)] transition-colors flex items-center gap-2"
        @click="openModal()"
      >
        <i class="fas fa-plus" />
        Thêm địa điểm
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg p-4">
      <div class="flex gap-4 flex-wrap">
        <div class="flex-1 min-w-[200px]">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
          />
        </div>
        <div class="flex-1 min-w-[200px]">
          <select
            v-model="sortBy"
            class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="count">Sắp xếp theo số lượng BĐS</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(10,115,192)]" />
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
      {{ error }}
    </div>

    <div v-else-if="locations.length === 0" class="text-center py-12 text-slate-500 dark:text-slate-400">
      <i class="fas fa-map-marker-alt text-4xl mb-3" />
      <p>Chưa có địa điểm nào. Hãy thêm địa điểm mới!</p>
    </div>

    <div v-else class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700">
              <th class="px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">Tên địa điểm</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">Mô tả</th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-200">BĐS</th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-200">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-600">
            <tr
              v-for="location in filteredLocations"
              :key="location.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="location.url" :alt="location.name" class="w-10 h-10 rounded-lg object-cover" />
                  <span class="font-medium text-slate-800 dark:text-slate-200">
                    {{ location.name }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-slate-600 dark:text-slate-400 line-clamp-2">
                  {{ location.description }}
                </p>
              </td>
              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                >
                  {{ location.count }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    @click="openModal(location)"
                  >
                    <i class="fas fa-edit" />
                  </button>
                  <button
                    class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    @click="confirmDelete(location)"
                  >
                    <i class="fas fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {{ editingLocation ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới' }}
        </h3>

        <div v-if="formError" class="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-500 text-sm rounded-lg">
          {{ formError }}
        </div>

        <form class="space-y-4" @submit.prevent="saveLocation">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Tên địa điểm </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> Mô tả </label>
            <textarea
              v-model="formData.description"
              required
              rows="3"
              class="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-[rgb(10,115,192)] dark:text-slate-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"> URL Hình ảnh </label>
            <input
              v-model="formData.url"
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
              {{ editingLocation ? 'Cập nhật' : 'Thêm mới' }}
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
          Bạn có chắc chắn muốn xóa địa điểm "{{ locationToDelete?.name }}" không?
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
            @click="deleteLocation"
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
import {ref, computed, onMounted, getCurrentInstance} from 'vue';
import {Endpoint} from '@/constants/Endpoint';

const {proxy} = getCurrentInstance();

const locations = ref([]);
const isLoading = ref(false);
const error = ref(null);
const isModalOpen = ref(false);
const showDeleteConfirm = ref(false);
const editingLocation = ref(null);
const locationToDelete = ref(null);
const searchTerm = ref('');
const sortBy = ref('name');
const formData = ref({
  name: '',
  description: '',
  url: ''
});
const formError = ref(null);
const isSaving = ref(false);
const isDeleting = ref(false);

const filteredLocations = computed(() => {
  let result = [...locations.value];

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter(
      (location) => location.name.toLowerCase().includes(term) || location.description.toLowerCase().includes(term)
    );
  }

  result.sort((a, b) => {
    if (sortBy.value === 'count') {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });

  return result;
});

const fetchLocations = async () => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    error.value = null;

    const response = await proxy.$http.get(Endpoint.getLocations);
    if (response.succeeded) {
      locations.value = response.result || [];
    } else {
      error.value = response.errors ? response.errors.join(', ') : 'Không thể tải danh sách địa điểm';
      console.error('Fetch locations error:', response);
    }
  } catch (err) {
    error.value = 'Không thể tải danh sách địa điểm';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const openModal = (location = null) => {
  editingLocation.value = location;
  formError.value = null;
  if (location) {
    formData.value = {
      name: location.name,
      description: location.description,
      url: location.url
    };
  } else {
    formData.value = {
      name: '',
      description: '',
      url: ''
    };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  if (!isSaving.value) {
    isModalOpen.value = false;
    editingLocation.value = null;
    formData.value = {
      name: '',
      description: '',
      url: ''
    };
    formError.value = null;
  }
};

const saveLocation = async () => {
  try {
    isSaving.value = true;
    formError.value = null;

    const isEdit = Boolean(editingLocation.value);
    const endpoint = isEdit ? Endpoint.updateLocation(editingLocation.value.id) : Endpoint.createLocation;
    const method = isEdit ? 'put' : 'post';

    const response = await proxy.$http[method](endpoint, {...formData.value});

    if (!response.succeeded) {
      const msg = response.errors ? response.errors.join(', ') : 'Có lỗi xảy ra khi lưu địa điểm';
      formError.value = msg;
      console.error('Save location error:', response);
      return;
    }

    isModalOpen.value = false;
    await fetchLocations();

    formData.value = {
      name: '',
      description: '',
      url: ''
    };
    editingLocation.value = null;
  } catch (err) {
    formError.value = 'Không thể lưu địa điểm. Vui lòng thử lại.';
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (location) => {
  locationToDelete.value = location;
  showDeleteConfirm.value = true;
};

const deleteLocation = async () => {
  if (!locationToDelete.value) return;

  isDeleting.value = true;
  try {
    const response = await proxy.$http.delete(Endpoint.deleteLocation(locationToDelete.value.id));

    if (!response.succeeded) {
      throw new Error(response.errors ? response.errors.join(', ') : 'Không thể xóa địa điểm');
    }

    await fetchLocations();
    showDeleteConfirm.value = false;
    locationToDelete.value = null;
  } catch (err) {
    console.error('Error deleting location:', err);
  } finally {
    isDeleting.value = false;
  }
};

onMounted(() => {
  fetchLocations();
});
</script>
