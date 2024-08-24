<template>
    <div class="profile-page">
        <div class="profile-header">
            <div class="profile-picture" @click="triggerFileInput">
                <img :src="selectedAvatar || user.avatar" alt="Avatar">
                <div v-if="isEditing" class="overlay-icon">
                    <i class="fa-solid fa-camera"></i>
                </div>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
            </div>
            <div class="profile-info">
                <h1>{{ user.fullname }}</h1>
                <p>{{ user.email }}</p>
                <div v-if="!isEditing" class="action-buttons">
                    <button @click="startEditing" class="edit-button">Chỉnh sửa thông tin</button>
                </div>
                <div v-else class="action-buttons">
                    <button @click="saveProfile" class="save-button">Lưu</button>
                    <button @click="cancelEditing" class="cancel-button">Hủy</button>
                </div>
            </div>
        </div>

        <div class="profile-details">
            <h2>Thông tin chi tiết</h2>
            <div class="detail-item">
                <i class="fa-solid fa-user"></i>
                <span>Giới tính:</span>
                <span v-if="!isEditing">{{ user.gender }}</span>
                <select v-else v-model="user.gender">
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                </select>
            </div>
            <div class="detail-item">
                <i class="fa-solid fa-birthday-cake"></i>
                <span>Ngày sinh:</span>
                <span v-if="!isEditing">{{ user.birthdate }}</span>
                <input v-else type="date" v-model="user.birthdate">
            </div>
            <div class="detail-item">
                <i class="fa-solid fa-phone"></i>
                <span>Số điện thoại:</span>
                <span v-if="!isEditing">{{ user.phoneNumber }}</span>
                <input v-else type="tel" v-model="user.phoneNumber">
            </div>
            <div class="detail-item">
                <i class="fa-solid fa-calendar-day"></i>
                <span>Ngày tạo:</span>
                <span>{{ formattedDate(user.createdAt) }}</span>
            </div>
            <div class="detail-item">
                <i class="fa-solid fa-clock"></i>
                <span>Cập nhật lần cuối:</span>
                <span>{{ formattedDate(user.updatedAt) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        fuser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: {},
            isEditing: false,
            originalUser: {},
            selectedAvatar: null
        };
    },
    watch: {
        fuser(newuser) {
            this.user = newuser;
        }
    },
    methods: {
        startEditing() {
            this.isEditing = true;
            this.originalUser = { ...this.user };
        },
        cancelEditing() {
            this.isEditing = false;
            this.user = { ...this.originalUser };
            this.selectedAvatar = null;
        },
        async saveProfile() {
            try {
                if (this.selectedAvatarFile) {
                    const formData = new FormData();
                    formData.append('images', this.selectedAvatarFile);

                    const uploadResponse = await fetch('http://localhost:8080/api/upload-images', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        },
                        body: formData
                    });

                    if (uploadResponse.ok) {
                        const result = await uploadResponse.json();
                        this.user.avatar = result[0];
                    } else {
                        alert("Có lỗi xảy ra khi tải lên ảnh.");
                        return;
                    }
                }

                const response = await fetch(`http://localhost:8080/api/users/${this.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    },
                    body: JSON.stringify(this.user)
                });

                if (response.ok) {
                    this.isEditing = false;
                    alert("Thông tin đã được cập nhật!");
                    this.selectedAvatar = null; // Reset selected avatar
                } else {
                    alert("Có lỗi xảy ra khi cập nhật thông tin.");
                }
            } catch (error) {
                console.error("Lỗi trong quá trình xử lý dữ liệu", error);
            }
        },
        triggerFileInput() {
            if (this.isEditing) {
                this.$refs.fileInput.click();
            }
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedAvatar = URL.createObjectURL(file);
                this.selectedAvatarFile = file;
            }
        },
        formattedDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
    }
};
</script>

<style scoped>
.profile-page {
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    max-height: 430px;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.profile-picture {
    position: relative;
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e6e6e6;
    cursor: pointer;
}

.profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.overlay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    pointer-events: none;
}

.profile-info {
    flex-grow: 1;
}

.profile-info h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.profile-info p {
    margin: 5px 0;
    color: #666;
}

.action-buttons {
    margin-top: 15px;
}

.edit-button,
.save-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-button {
    background-color: #4682B4;
    color: #fff;
}

.edit-button:hover {
    background-color: #5a9bd4;
}

.save-button {
    background-color: #4CAF50;
    color: #fff;
}

.save-button:hover {
    background-color: #45a049;
}

.cancel-button {
    background-color: #f44336;
    color: #fff;
    margin-left: 10px;
}

.cancel-button:hover {
    background-color: #e53935;
}

.profile-details {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.profile-details h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 22px;
}

.detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: #666;
}

.detail-item svg {
    margin-right: 10px;
    color: #4682B4;
}

.detail-item span {
    margin-left: 5px;
}

input[type="text"],
input[type="date"],
input[type="tel"],
select {
    width: calc(100% - 30px);
    padding: 8px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

input:focus,
select:focus {
    border-color: #4682B4;
    outline: none;
    box-shadow: 0 0 8px rgba(110, 142, 251, 0.5);
}
</style>
