<template>
  <div class="creative-input">
    <div class="flex items-end h-6">
      <label :for="id" class="block text-sm font-medium" :class="labelClass">{{ label }}</label>
      <div v-if="showTooltip" class="relative ml-2 group tooltip-container">
        <i :class="[iconClass, 'text-sm cursor-help']" />
        <div class="tooltip" :class="tooltipClass">
          <slot name="tooltip">
            {{ tooltipContent }}
          </slot>
        </div>
      </div>
    </div>
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i :class="[inputIconClass, 'group-focus-within:text-blue-500 transition duration-300']" />
      </div>
      <slot>
        <select
          v-if="isSelect"
          :id="id"
          :value="modelValue"
          :required="required"
          :class="[
            inputClass,
            'block w-full pl-10 pr-3 py-2 h-9 text-sm border-b focus:outline-none transition duration-300 bg-transparent'
          ]"
          @change="handleChange"
        >
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <input
          v-else
          :id="id"
          :type="type"
          :value="modelValue"
          :required="required"
          :class="[
            inputClass,
            'block w-full pl-10 pr-3 py-2 h-9 text-sm border-b focus:outline-none transition duration-300 bg-transparent'
          ]"
          :placeholder="placeholder"
          @input="handleInput"
          @blur="handleBlur"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreativeInput',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    tooltipContent: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: 'fas fa-lightbulb text-yellow-400'
    },
    inputIconClass: {
      type: String,
      default: 'fas fa-font text-gray-400'
    },
    labelClass: {
      type: String,
      default: 'text-gray-700'
    },
    inputClass: {
      type: String,
      default: 'border-gray-300 focus:border-blue-500'
    },
    tooltipClass: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'blur'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleBlur(event) {
      this.$emit('blur', event);
    }
  }
};
</script>

<style scoped>
.tooltip {
  visibility: hidden;
  width: 200px;
  background-color: #f9fafb;
  color: #4b5563;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 0.75rem;
  line-height: 1.2;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: #f9fafb transparent transparent transparent;
}

.group:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
