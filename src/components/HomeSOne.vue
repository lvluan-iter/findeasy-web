<template>
  <div class="px-4 sm:px-6 md:px-12 lg:px-[120px]">
    <header class="text-center mb-8 md:mb-[50px]">
      <div class="inline-block py-1.5 px-4 sm:py-2 sm:px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2">
        Agents Hub
      </div>
      <h1 class="font-bold text-[calc(1.25rem+1.2vw)] sm:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-4 sm:mb-5">
        Connect With Top Agents
      </h1>
      <p class="text-[#707070]">
        Take advantage of the opportunity to showcase your property listings and reach a wider audience.
        By listing your property with us, you gain access to a powerful platform that makes it easy to manage and
        update your ads, while reaching millions of potential buyers.
        <br>
        <strong>Get started today</strong> and see how you can elevate your online presence and attract more clients!
      </p>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      <div class="p-6 sm:p-8 md:p-10 bg-[#0a73c0] rounded-lg text-white">
        <h2 class="text-[calc(1.2rem+.8vw)] sm:text-[calc(1.325rem+.9vw)]">
          Regular Listing
        </h2>
        <p>
          List your property with us and reach a broad audience of potential buyers.
          Enjoy the benefits of our platform to manage and update your listings easily.
        </p>
        <button class="p-2 rounded-lg bg-white text-black border-none flex items-center text-base mt-4 sm:mt-5 transition duration-300 ease-in-out hover:bg-gray-200 hover:scale-105">
          <span>Get Started</span>
          <div class="w-px h-5 bg-black mx-2" />
          <i class="fa-solid fa-arrow-right" />
        </button>
      </div>

      <div class="p-6 sm:p-8 md:p-10 bg-[#212529] rounded-lg text-white">
        <h2 class="text-[calc(1.2rem+.8vw)] sm:text-[calc(1.325rem+.9vw)]">
          VIP Listing
        </h2>
        <p>
          Elevate your property's visibility with a VIP listing. Get premium
          placement, enhanced features, and increased exposure to attract more serious buyers. Stand out from the crowd and make your property shine!
        </p>
        <button class="p-2 rounded-lg bg-[#0a73c0] text-white border-none flex items-center text-base mt-4 sm:mt-5 transition duration-300 ease-in-out hover:bg-[#085a98] hover:scale-105">
          <span>Get Started</span>
          <div class="w-px h-5 bg-white mx-2" />
          <i class="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>