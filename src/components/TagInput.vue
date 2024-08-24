<template>
  <div class="flex flex-wrap items-center gap-2 w-full border-none outline-none text-[#222]">
    <div v-for="(tag, index) in tagsArray" :key="index" class="bg-blue-500 text-white rounded px-2 flex items-center gap-1">
      {{ tag }}
      <button @click="removeTag(index)" class="text-xs text-white hover:text-red-400">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <input
      v-model="inputValue"
      @keyup.enter="addTag"
      placeholder="Keywords"
      class="border-none outline-none flex-grow text-sm rounded-md shadow-sm"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inputValue: '',
      tagsArray: [...this.value],
    };
  },
  watch: {
    value(newVal) {
      this.tagsArray = [...newVal];
    },
  },
  methods: {
    addTag() {
      const trimmedValue = this.inputValue.trim();
      if (trimmedValue && !this.tagsArray.includes(trimmedValue)) {
        this.tagsArray.push(trimmedValue);
        this.updateTags();
      }
      this.inputValue = '';
    },
    removeTag(index) {
      this.tagsArray.splice(index, 1);
      this.updateTags();
    },
    updateTags() {
      this.$emit('input', this.tagsArray);
    },
  },
};
</script>
