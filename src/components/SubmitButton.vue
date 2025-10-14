<template>
    <button :disabled="loading" type="submit"
        class="w-full py-3 px-6 flex justify-center items-center gap-2 rounded-lg text-white text-sm md:text-lg font-medium transition-all duration-300 ease-in-out
           bg-[rgb(10,115,192)] hover:bg-[rgb(8,100,170)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
        <svg v-if="loading" class="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span>{{ loading ? loadingText : text }}</span>
    </button>
</template>

<script setup>
defineProps({
    loading: Boolean,
    text: {
        type: String,
        default: 'Submit',
    },
    loadingText: {
        type: String,
        default: 'Đang xử lý...',
    }
});
</script>