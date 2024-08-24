<template>
  <footer class="bg-[#212529] bg-no-repeat text-gray-300 font-sans">
    <div class="container mx-auto px-4 py-12">
      <!-- Logo và thông tin công ty -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="mb-6 md:mb-0">
          <img src="@/assets/logo1.png" alt="FindEasy Logo" class="w-48 h-auto mb-4">
          <p class="text-sm max-w-md">
            FindEasy - Nền tảng hàng đầu trong lĩnh vực đặt phòng trọ và nhà ở, mang đến giải pháp tối ưu cho việc tìm kiếm và đặt chỗ trên toàn quốc.
          </p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
        </div>
      </div>

      <!-- Các cột thông tin -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="font-bold text-yellow-500 mb-4 uppercase">Giới thiệu</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Về chúng tôi</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Quy chế hoạt động</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Chính sách bảo vệ thông tin</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Blog</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Tuyển dụng</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-yellow-500 mb-4 uppercase">Liên hệ</h4>
          <ul class="space-y-2">
            <li>Công ty TNHH FIND EASY VN</li>
            <li>123 Đường ABC, Quận 1, TP.HCM</li>
            <li>Điện thoại: 0000 444 333</li>
            <li>Email: findeasy@gmail.com</li>
            <li>Hỗ trợ: 24/7</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-yellow-500 mb-4 uppercase">Hỗ trợ</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Câu hỏi thường gặp</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Hướng dẫn sử dụng</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Chính sách hoàn tiền</a></li>
            <li><a href="#" class="hover:text-yellow-500 transition-colors duration-300">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-yellow-500 mb-4 uppercase">Tải ứng dụng</h4>
          <div class="space-y-2">
            <a href="#" class="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.27 6.73l-4.54 4.54a1 1 0 01-1.41 0L6.73 6.73a1 1 0 00-1.41 1.41L10 13l-4.68 4.86a1 1 0 101.41 1.41l4.54-4.54a1 1 0 011.41 0l4.54 4.54a1 1 0 001.41-1.41L13 13l4.86-4.86a1 1 0 00-1.41-1.41z"/></svg>
                App Store
              </div>
            </a>
            <a href="#" class="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v14.25C1.5 20.16 2.34 21 3.375 21h17.25c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 1.5h17.25c.207 0 .375.168.375.375v14.25a.375.375 0 01-.375.375H3.375A.375.375 0 013 19.125V4.875C3 4.668 3.168 4.5 3.375 4.5zm4.125 5.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm8.25 0a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75z"/></svg>
                Google Play
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Phương thức thanh toán và chứng nhận -->
      <div class="flex flex-wrap justify-between items-center border-t border-gray-700 pt-8">
        <div class="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <h4 class="font-bold text-yellow-500 mb-2 uppercase">Phương thức thanh toán</h4>
          <div class="flex space-x-2">
            <img src="@/assets/visa.png" alt="Visa" class="h-8">
            <img src="@/assets/mastercard.png" alt="Mastercard" class="h-8">
            <img src="@/assets/paypal.png" alt="PayPal" class="h-8">
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <h4 class="font-bold text-yellow-500 mb-2 uppercase">Chứng nhận</h4>
          <div class="flex space-x-2">
            <img src="@/assets/iso.png" alt="ISO Certified" class="h-12">
            <img src="@/assets/gdpr.png" alt="GDPR Compliant" class="h-12">
          </div>
        </div>
      </div>

      <!-- Bản quyền -->
      <div class="mt-8 border-t border-gray-700 pt-8 text-sm text-center">
        <p>&copy; 2024 FindEasy.vn. Tất cả quyền được bảo lưu.</p>
        <div class="mt-2">
          <a href="#" class="text-gray-400 hover:text-yellow-500 transition-colors duration-300 mr-4">Điều khoản sử dụng</a>
          <a href="#" class="text-gray-400 hover:text-yellow-500 transition-colors duration-300">Chính sách bảo mật</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-image: url(../assets/wall.png);
}
</style>