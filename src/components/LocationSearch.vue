<template>
    <div class="inline-block shadow-[0_0_0_12px_rgba(10,115,192,0.08)] border border-gray-200 rounded-xl py-5 px-7 bg-white">
        <div class="text-base font-semibold flex items-center gap-5">
            <i class="fa-solid fa-sliders"></i>
            Use Quick Search
        </div>
        <hr class="mt-2 mb-2.5">
        <div class="flex gap-1.5 mb-2.5">
            <div class="flex">
                <div class="py-2.5 px-10 border border-gray-200 text-xs rounded-sm">
                    SALE
                </div>
                <div class="py-2.5 px-10 border border-gray-200 text-xs rounded-sm">
                    RENT
                </div>
            </div>
            <div class="py-2.5 px-2.5 border border-gray-200 text-xs rounded-sm">
                <i class="fa-solid fa-rotate"></i>
            </div>
        </div>
        <div class="py-2.5 px-2.5 flex gap-2.5 items-center border border-gray-200 mb-2.5 text-xs rounded-sm">
            <i class="fa-solid fa-location-dot"></i>
            <input class="w-full border-none outline-none" type="search" placeholder="Nhập địa chỉ cần tìm ...">
        </div>
        <div class="flex items-center justify-between py-2.5 px-2.5 border border-gray-200 text-xs mb-2.5 rounded-sm">
            <div class="flex gap-2.5 items-center">
                <i class="fa-solid fa-layer-group"></i>
                All Categories
            </div>
            <div>
                <i class="fa-solid fa-angle-down"></i>
            </div>
        </div>
        <div class="flex items-center gap-5 py-2.5 px-2.5 border border-gray-200 text-xs mb-2.5 rounded-sm">
            Price Range
            <div class="rangebar">
                <SliderComponent/>
            </div>
        </div>
        <div class="flex items-center justify-center p-2.5 bg-[#0a73c0] border border-[#0a73c0] rounded-sm text-white text-xs cursor-pointer">
            Search
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
    }
};
</script>

<style scoped>
svg {
    color: rgb(10 115 192);
}
</style>
