<template>
    <div class="form-group relative mb-6 text-left animate-fade-in-up">

        <div class="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base box-border transition-colors duration-300 cursor-pointer flex justify-between items-center focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
            @click="toggleDropdown" tabindex="0" @focus="isFocused = true" @blur="closeDropdown">
            <label :for="id" :class="{ 'active': modelValue?.length > 0 || isFocused }"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-1.5 transition-all duration-300 pointer-events-none text-sm md:text-base">
                {{ label }}
            </label>
            <i class="fa-solid fa-chevron-down text-gray-500 ml-2"></i>
        </div>

        <ul v-if="isOpen"
            class="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <li v-for="(option, index) in options" :key="index" @click="selectOption(option)"
                class="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm md:text-base"
                :class="{ 'bg-blue-500 text-white': modelValue === option.value }">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    id: String,
    label: String,
    required: {
        type: Boolean,
        default: false,
    },
    modelValue: String,
    options: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const isOpen = ref(false);

const selectedLabel = computed(() => {
    const found = props.options.find((o) => o.value === props.modelValue);
    return found ? found.label : "";
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
    isFocused.value = false;
    setTimeout(() => (isOpen.value = false), 200);
};

const selectOption = (option) => {
    emit("update:modelValue", option.value);
    isOpen.value = false;
};
</script>

<style scoped>
.form-group label.active {
    top: -8px;
    left: 12px;
    font-size: 12px;
    color: #6e8efb;
}
</style>
