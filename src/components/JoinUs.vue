<template>
  <div
    id="latest-articles"
    class="bg-[#0a73c0] rounded-2xl p-12 m-4 sm:m-6 md:m-8 lg:m-[40px_60px] xl:m-[40px_60px] bg-[url('@/assets/house.png')] bg-right bg-no-repeat bg-contain text-center"
  >
    <div class="max-w-3xl mx-auto">
      <div class="mb-8 sm:mb-12">
        <span class="inline-block px-4 py-2 bg-white rounded-full text-[#0a73c0] text-sm mb-4">Our Latest Articles</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Want To Join Us?
        </h2>
        <p class="text-white text-sm sm:text-base md:text-lg">
          Sign up to never miss important news, articles, and updates from us.
        </p>
      </div>

      <form
        class="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8"
        @submit.prevent="subscribe"
      >
        <InputField
          id="fullName"
          v-model="fullName"
          label="Full Name"
          type="text"
        />

        <InputField
          id="email"
          v-model="email"
          label="Enter Email"
          type="email"
        />

        <button
          type="submit"
          class="w-full sm:w-full md:w-auto px-6 py-3 bg-white text-[#0a73c0] rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
        >
          Join Us
        </button>
      </form>

      <p class="text-white text-xs sm:text-sm">
        Rest assured, all of our latest updates and news <br class="hidden sm:inline">will be delivered to you swiftly!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue'

const fullName = ref('')
const email = ref('')

const subscribe = () => {
  alert(`Thank you, ${fullName.value}! You've been subscribed`)
}
</script>