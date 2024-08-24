<template>
  <div id="latest-articles" class="bg-[#0a73c0] rounded-2xl 
    p-12 
    m-4 sm:m-6 md:m-8 lg:m-[40px_60px] xl:m-[40px_60px]
    bg-[url('@/assets/house.png')] bg-right bg-no-repeat bg-contain text-center">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8 sm:mb-12">
        <span class="inline-block px-4 py-2 bg-white rounded-full text-[#0a73c0] text-sm mb-4">Our Latest Articles</span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Want To Join Us?</h2>
        <p class="text-white text-sm sm:text-base md:text-lg">Sign up to never miss important news, articles, and updates from us.</p>
      </div>

      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
        <div class="relative w-full sm:w-[calc(50%-0.5rem)] md:w-auto">
          <input 
            type="text" 
            id="fullName" 
            v-model="fullName" 
            @focus="isFocusedFullname = true"
            @blur="isFocusedFullname = false" 
            class="w-full md:w-56 lg:w-64 h-12 px-4 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
            required
          >
          <label 
            for="fullName"
            :class="{'transform -translate-y-8 scale-75': fullName.length > 0 || isFocusedFullname}"
            class="absolute left-4 top-3 text-white transition-all duration-300 pointer-events-none"
          >
            Full Name
          </label>
        </div>

        <div class="relative w-full sm:w-[calc(50%-0.5rem)] md:w-auto">
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            @focus="isFocusedEmail = true"
            @blur="isFocusedEmail = false" 
            class="w-full md:w-56 lg:w-64 h-12 px-4 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
            required
          >
          <label 
            for="email"
            :class="{'transform -translate-y-8 scale-75': email.length > 0 || isFocusedEmail}"
            class="absolute left-4 top-3 text-white transition-all duration-300 pointer-events-none"
          >
            Enter Email
          </label>
        </div>

        <button type="submit" class="w-full sm:w-full md:w-auto px-6 py-3 bg-white text-[#0a73c0] rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">
          Join Us
        </button>
      </form>

      <p class="text-white text-xs sm:text-sm">
        Rest assured, all of our latest updates and news <br class="hidden sm:inline">will be delivered to you swiftly!
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const fullName = ref('')
    const email = ref('')
    const isFocusedEmail = ref(false)
    const isFocusedFullname = ref(false)

    const subscribe = () => {
      alert(`Thank you, ${fullName.value}! You 've been subcribed`)
    }

    return {
    fullName,
    email,
    isFocusedEmail,
    isFocusedFullname,
    subscribe
    }
  }
}
</script>