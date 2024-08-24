<template>
    <div class="px-4 sm:px-6 md:px-8 lg:px-[120px]">
        <div class="text-center mb-[50px]">
            <div class="inline-block p-2.5 px-5 bg-[rgba(10,115,192,0.08)] rounded-full text-[#0a73c0] mb-2.5">
                <span>Featured Properties</span>
            </div>
            <p
                class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[calc(1.375rem+1.5vw)] text-[#212529] m-0 mb-5">
                Explore Our Top Featured Properties</p>
            <span class="description-text text-sm sm:text-base">Discover the best properties currently available on the
                market. From luxurious homes to prime commercial spaces, our featured listings showcase exceptional
                opportunities for buyers and
                investors. Browse through our top selections and find your ideal property today.
            </span>
        </div>
        <AvaibleProperty/>
    </div>
</template>

<script>
import AvaibleProperty from './AvaibleProperty.vue';

export default {
    components: {
        AvaibleProperty
    }
}
</script>
