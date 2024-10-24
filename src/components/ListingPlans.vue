<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Select Listing Plan</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="plan in plans"
        :key="plan.id"
        :class="[
          'relative p-6 rounded-xl border-2 transition-all duration-300',
          modelValue === plan.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
      >
        <!-- Radio button -->
        <div class="absolute -top-3 -right-3">
          <input
            type="radio"
            :name="name"
            :id="plan.id"
            :value="plan.id"
            :checked="modelValue === plan.id"
            @change="$emit('update:modelValue', plan.id)"
            class="sr-only"
          >
          <label
            :for="plan.id"
            :class="[
              'w-6 h-6 rounded-full border-2 flex items-center justify-center',
              modelValue === plan.id
                ? 'bg-blue-500 border-blue-500'
                : 'bg-white border-gray-300'
            ]"
          >
            <div
              v-if="modelValue === plan.id"
              class="w-2 h-2 rounded-full bg-white"
            />
          </label>
        </div>

        <!-- Plan header -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ plan.name }}</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-bold text-gray-900">{{ plan.price }}</span>
            <span class="ml-1 text-gray-500">VND</span>
          </div>
          <p class="mt-1 text-sm text-gray-500">Valid for {{ plan.duration }}</p>
        </div>

        <!-- Features list -->
        <ul class="space-y-3">
          <li
            v-for="(feature, index) in plan.features"
            :key="index"
            class="flex items-start gap-3"
          >
            <i
              v-if="feature.included"
              class="fas fa-check text-green-500 mt-1"
            />
            <i
              v-else
              class="fas fa-times text-gray-300 mt-1"
            />
            <span :class="feature.included ? 'text-gray-700' : 'text-gray-400'">
              {{ feature.text }}
            </span>
          </li>
        </ul>

        <!-- Select button -->
        <button
          :class="[
            'mt-6 w-full py-2 px-4 rounded-lg font-medium transition-colors duration-300',
            modelValue === plan.id
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
          @click="$emit('update:modelValue', plan.id)"
        >
          Select {{ plan.name }} Plan
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

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
    name: 'Free',
    price: '0',
    duration: '7 days',
    features: [
      { text: 'Basic listing visibility', included: true },
      { text: 'Standard search placement', included: true },
      { text: 'Photo gallery (max 5 photos)', included: true },
      { text: 'Basic property details', included: true },
      { text: 'Manual approval process', included: true },
      { text: 'Priority support', included: false },
      { text: 'Featured listing badge', included: false },
      { text: 'Extended visibility period', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '500,000',
    duration: '30 days + 7 days(free)',
    features: [
      { text: 'Enhanced listing visibility', included: true },
      { text: 'Priority search placement', included: true },
      { text: 'Unlimited photo gallery', included: true },
      { text: 'Detailed property showcase', included: true },
      { text: 'Instant approval', included: true },
      { text: '24/7 Priority support', included: true },
      { text: 'Featured listing badge', included: true },
      { text: 'Extended visibility period', included: true },
    ],
  },
];
</script>