<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 sm:py-8 md:py-10 lg:py-12">
    <BackHeader title="Trang cá nhân" />

    <div class="flex flex-col lg:flex-row gap-5">
      <div class="w-full lg:w-1/3 bg-white rounded-xl shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
          <div class="flex flex-col items-center">
            <div class="relative w-32 h-32 mb-4 group" @click="openAvatarModal">
              <img
                :src="selectedAvatar || user.avatar"
                alt="Avatar"
                class="w-full h-full object-cover rounded-full border-4 border-white"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <i class="fas fa-camera text-2xl" />
              </div>
            </div>
            <h1 class="text-2xl font-bold mb-1">
              {{ user.fullname }}
            </h1>
            <p class="text-sm opacity-90">
              {{ user.email }}
            </p>
          </div>
        </div>

        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Thông Tin Cá Nhân</h2>
          <div class="space-y-4">
            <div class="flex items-center text-gray-700">
              <i class="fas fa-user w-6 text-blue-500" />
              <span class="font-medium mr-2">Giới tính:</span>
              <span>{{ user.gender }}</span>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-birthday-cake w-6 text-blue-500" />
              <span class="font-medium mr-2">Ngày sinh:</span>
              <span>{{ user.birthdate }}</span>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-phone w-6 text-blue-500" />
              <span class="font-medium mr-2">Số điện thoại:</span>
              <span>{{ user.phoneNumber }}</span>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-calendar-day w-6 text-blue-500" />
              <span class="font-medium mr-2">Ngày tạo:</span>
              <span>{{ formattedDate(user.createdAt) }}</span>
            </div>
            <div class="flex items-center text-gray-700">
              <i class="fas fa-clock w-6 text-blue-500" />
              <span class="font-medium mr-2">Cập nhật lần cuối:</span>
              <span>{{ formattedDate(user.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-2/3">
        <div>
          <div
            class="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-200 rounded-t-xl"
          >
            <div class="text-lg font-semibold text-gray-800">Chỉnh Sửa Thông Tin</div>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span>{{ currentDate }}</span>
              <i class="fas fa-calendar-alt text-blue-600" />
            </div>
          </div>
          <div class="p-6 space-y-8 bg-white rounded-b-xl shadow-md">
            <section>
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Thông Tin Cơ Bản</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="fullname" class="block text-sm font-medium text-gray-700">Họ và Tên</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-user text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
                    </div>
                    <input
                      id="fullname"
                      v-model="user.fullname"
                      type="text"
                      required
                      class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i
                        class="fas fa-envelope text-gray-400 group-focus-within:text-blue-500 transition duration-300"
                      />
                    </div>
                    <input
                      id="email"
                      v-model="user.email"
                      type="email"
                      required
                      disabled
                      readonly
                      class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent cursor-not-allowed opacity-75"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="gender" class="block text-sm font-medium text-gray-700">Giới Tính</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i
                        class="fas fa-venus-mars text-gray-400 group-focus-within:text-blue-500 transition duration-300"
                      />
                    </div>
                    <select
                      id="gender"
                      v-model="user.gender"
                      class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent appearance-none"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="birthdate" class="block text-sm font-medium text-gray-700">Ngày Sinh</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i
                        class="fas fa-birthday-cake text-gray-400 group-focus-within:text-blue-500 transition duration-300"
                      />
                    </div>
                    <input
                      id="birthdate"
                      v-model="user.birthdate"
                      type="date"
                      class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-phone text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
                    </div>
                    <input
                      id="phoneNumber"
                      v-model="user.phoneNumber"
                      type="tel"
                      class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Cài Đặt Bảo Mật</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Hiển thị email công khai</span>
                  <label class="switch">
                    <input v-model="user.publicEmail" type="checkbox" />
                    <span class="slider round" />
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Hiển thị số điện thoại công khai</span>
                  <label class="switch">
                    <input v-model="user.publicPhone" type="checkbox" />
                    <span class="slider round" />
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Hiển thị ngày sinh công khai</span>
                  <label class="switch">
                    <input v-model="user.publicProfile" type="checkbox" />
                    <span class="slider round" />
                  </label>
                </div>
              </div>
            </section>

            <div class="flex justify-end space-x-4">
              <button
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                @click="cancelEditing"
              >
                <i class="fas fa-times mr-2" /> Hủy
              </button>
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                @click="saveProfile"
              >
                <i class="fas fa-save mr-2" /> Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
        <div class="h-5" />

        <div class="mt-5">
          <div
            class="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-200 rounded-t-xl"
          >
            <h1 class="text-xl font-semibold text-gray-800">Đổi Mật Khẩu</h1>
          </div>
          <div class="p-6 space-y-6 bg-white rounded-b-xl shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="currentPassword" class="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-lock text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
                  </div>
                  <input
                    id="currentPassword"
                    v-model="passwordChange.currentPassword"
                    type="password"
                    class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                    placeholder="Current Password"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="newPassword" class="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-key text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
                  </div>
                  <input
                    id="newPassword"
                    v-model="passwordChange.newPassword"
                    type="password"
                    class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                    placeholder="New Password"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-check text-gray-400 group-focus-within:text-blue-500 transition duration-300" />
                  </div>
                  <input
                    id="confirmPassword"
                    v-model="passwordChange.confirmPassword"
                    type="password"
                    class="block w-full pl-10 pr-3 py-2 text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 bg-transparent"
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
            </div>
            <div v-if="passwordChangeError" class="text-red-500 text-sm mt-2 animate-fade-in">
              {{ passwordChangeError }}
            </div>
            <div class="flex justify-end">
              <button
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                @click="changePassword"
              >
                <i class="fas fa-key mr-2" /> Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Modal -->
    <div v-if="showAvatarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Update Avatar</h2>

        <div class="mb-4">
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelected" />
          <button
            class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            @click="$refs.fileInput.click()"
          >
            Select Image
          </button>
        </div>

        <div v-if="imageUrl" class="mb-4 max-h-96 overflow-auto">
          <img
            ref="imageElement"
            :src="imageUrl"
            alt="To be cropped"
            class="max-w-full max-h-80 object-contain mx-auto border"
          />
        </div>

        <div class="flex justify-end space-x-2">
          <button
            class="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
            @click="closeAvatarModal"
          >
            Cancel
          </button>
          <button
            class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            @click="cropImage"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, watch, onMounted, getCurrentInstance} from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {useUserStore} from '../stores/userStore';
import {Endpoint} from '@/constants/Endpoint';
import BackHeader from '@/components/BackHeader.vue';

const userStore = useUserStore();
const {proxy} = getCurrentInstance();

const user = reactive({});
const isEditing = ref(false);
const originalUser = ref({});
const selectedAvatar = ref(null);
const selectedAvatarFile = ref(null);
const currentDate = ref('');
const showAvatarModal = ref(false);
const imageUrl = ref(null);
const cropper = ref(null);
const passwordChangeError = ref('');

const passwordChange = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const setCurrentDate = () => {
  const today = new Date();
  currentDate.value = today.toLocaleDateString('vi-VN', {year: 'numeric', month: 'long', day: 'numeric'});
};

watch(
  () => userStore.user,
  (newUser) => {
    Object.assign(user, newUser);
  },
  {deep: true}
);

onMounted(() => {
  Object.assign(user, userStore.user);
  setCurrentDate();
});

const cancelEditing = () => {
  isEditing.value = false;
  Object.assign(user, originalUser.value);
  selectedAvatar.value = null;
  console.log(privacySettings);
};

const saveProfile = async () => {
  try {
    if (selectedAvatarFile.value) {
      const formData = new FormData();
      formData.append('images', selectedAvatarFile.value);

      const uploadResponse = await proxy.$http.post(Endpoint.uploadImages, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.success) {
        user.avatar = uploadResponse.data[0];
      } else {
        alert('Có lỗi xảy ra khi tải lên ảnh.');
        return;
      }
    }

    const profileResponse = await fetch(`https://roombooking-fa3a.onrender.com/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(user)
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to update profile');
    }

    isEditing.value = false;
    alert('Thông tin cá nhân đã được cập nhật!');
    userStore.updateUser(user);
    selectedAvatar.value = null;
  } catch (error) {
    console.error('Lỗi trong quá trình xử lý dữ liệu', error);
    alert('Có lỗi xảy ra khi cập nhật thông tin.');
  }
};

const changePassword = async () => {
  if (passwordChange.newPassword !== passwordChange.confirmPassword) {
    passwordChangeError.value = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
    return;
  }

  try {
    const response = await proxy.$http.put(Endpoint.updateUserPassword(user.id), {
      currentPassword: passwordChange.currentPassword,
      newPassword: passwordChange.newPassword
    });

    if (!response.success) {
      throw new Error(response.message || 'Đã xảy ra lỗi khi thay đổi mật khẩu.');
    }

    passwordChangeError.value = '';
    alert('Mật khẩu đã được thay đổi thành công!');
    passwordChange.currentPassword = '';
    passwordChange.newPassword = '';
    passwordChange.confirmPassword = '';
  } catch (error) {
    passwordChangeError.value = error.message;
  }
};

const openAvatarModal = () => {
  showAvatarModal.value = true;
};

const closeAvatarModal = () => {
  showAvatarModal.value = false;
  imageUrl.value = null;
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    nextTick(() => {
      cropper.value = new Cropper(imageElement.value, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1
      });
    });
  }
};

const cropImage = () => {
  if (cropper.value) {
    const canvas = cropper.value.getCroppedCanvas();
    canvas.toBlob((blob) => {
      selectedAvatar.value = URL.createObjectURL(blob);
      selectedAvatarFile.value = new File([blob], 'avatar.jpg', {type: 'image/jpeg'});
      closeAvatarModal();
    }, 'image/jpeg');
  }
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
