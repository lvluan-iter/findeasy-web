<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Chọn Gói Đăng Tin</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="plan in plans"
        :key="plan.id"
        :class="[
          'relative p-6 rounded-xl border-2 transition-all duration-300',
          modelValue === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
        ]"
      >
        <div class="absolute -top-3 -right-3">
          <input
            :id="plan.id"
            class="sr-only"
            type="radio"
            :name="name"
            :value="plan.id"
            :checked="modelValue === plan.id"
            @change="$emit('update:modelValue', plan.id)"
          />
          <label
            :for="plan.id"
            :class="[
              'w-6 h-6 rounded-full border-2 flex items-center justify-center',
              modelValue === plan.id ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
            ]"
          >
            <div v-if="modelValue === plan.id" class="w-2 h-2 rounded-full bg-white" />
          </label>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ plan.name }}
          </h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-bold text-gray-900">{{ plan.price }}</span>
            <span class="ml-1 text-gray-500">VND</span>
          </div>
          <p class="mt-1 text-sm text-gray-500">Có hiệu lực trong {{ plan.duration }}</p>
        </div>

        <ul class="space-y-3">
          <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start gap-3">
            <i v-if="feature.included" class="fas fa-check text-green-500 mt-1" />
            <i v-else class="fas fa-times text-gray-300 mt-1" />
            <span :class="feature.included ? 'text-gray-700' : 'text-gray-400'">
              {{ feature.text }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'plan'
  }
});

defineEmits(['update:modelValue']);

const plans = [
  {
    id: 'free',
    name: 'Miễn phí',
    price: '0',
    duration: '7 ngày',
    features: [
      {text: 'Hiển thị định dạng tin cơ bản', included: true},
      {text: 'Vị trí tìm kiếm chuẩn', included: true},
      {text: 'Bộ siêu tập (tối đa 5 ảnh)', included: true},
      {text: 'Thông tin cơ bản về bất động sản', included: true},
      {text: 'Phê duyệt thủ công', included: true},
      {text: 'Hỗ trợ ưu tiên', included: false},
      {text: 'Nhãn tin nổi bật', included: false},
      {text: 'Thời gian hiển thị kéo dài', included: false}
    ]
  },
  {
    id: 'premium',
    name: 'Cao cấp',
    price: '100,000',
    duration: '30 ngày + 7 ngày(miễn phí)',
    features: [
      {text: 'Hiển thị định dạng tin nâng cao', included: true},
      {text: 'Vị trí tìm kiếm ưu tiên', included: true},
      {text: 'Bộ siêu tập không giới hạn', included: true},
      {text: 'Thông tin chi tiết về bất động sản', included: true},
      {text: 'Phê duyệt tức thì', included: true},
      {text: 'Hỗ trợ ưu tiên 24/7', included: true},
      {text: 'Nhãn tin nổi bật', included: true},
      {text: 'Thời gian hiển thị kéo dài', included: true}
    ]
  }
];
</script>
