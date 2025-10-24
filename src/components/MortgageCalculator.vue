<template>
  <div class="mortgage-calculator-container bg-white shadow-lg rounded-lg p-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Tính toán khoản vay mua nhà</h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cột bên trái: Thông tin đầu vào -->
      <div class="space-y-6">
        <div>
          <label for="property-price" class="block text-sm font-medium text-gray-700 mb-1">
            Giá trị bất động sản (VNĐ)
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="property-price"
              v-model="localPropertyPrice"
              type="number"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">VNĐ</span>
            </div>
          </div>
        </div>
        <div>
          <label for="loan-amount" class="block text-sm font-medium text-gray-700 mb-1"> Số tiền vay (VNĐ) </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="loan-amount"
              v-model="loanAmount"
              type="number"
              :max="localPropertyPrice"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">VNĐ</span>
            </div>
          </div>
          <input
            v-model="loanAmount"
            type="range"
            :max="localPropertyPrice"
            step="1000000"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        <div>
          <label for="interest-rate" class="block text-sm font-medium text-gray-700 mb-1">
            Lãi suất hàng năm (%)
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="interest-rate"
              v-model="annualInterestRate"
              type="number"
              step="0.1"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          <input
            v-model="annualInterestRate"
            type="range"
            :max="20"
            step="0.1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        <div>
          <label for="loan-term" class="block text-sm font-medium text-gray-700 mb-1"> Thời hạn vay (năm) </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="loan-term"
              v-model="loanTerm"
              type="number"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">năm</span>
            </div>
          </div>
          <input
            v-model="loanTerm"
            type="range"
            :max="30"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>

      <!-- Cột giữa: Kết quả tính toán -->
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Kết quả tính toán</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-sm font-medium text-blue-800 mb-1">Thanh toán hàng tháng</p>
            <p class="text-2xl font-bold text-blue-900">
              {{ formatCurrency(monthlyPayment) }}
            </p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-sm font-medium text-green-800 mb-1">Tổng tiền phải trả</p>
            <p class="text-2xl font-bold text-green-900">
              {{ formatCurrency(totalPayment) }}
            </p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <p class="text-sm font-medium text-red-800 mb-1">Tổng tiền lãi</p>
            <p class="text-2xl font-bold text-red-900">
              {{ formatCurrency(totalInterest) }}
            </p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <p class="text-sm font-medium text-yellow-800 mb-1">Tỷ lệ vay trên giá trị</p>
            <p class="text-2xl font-bold text-yellow-900">{{ loanToValueRatio.toFixed(2) }}%</p>
          </div>
        </div>
      </div>

      <!-- Cột bên phải: Biểu đồ -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Phân bổ khoản vay</h3>
        <Chart class="w-full h-64" :option="chartOption" autoresize />
      </div>
    </div>

    <!-- Bảng lịch trả nợ -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Lịch trả nợ</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Năm
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gốc còn lại
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiền lãi
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiền gốc
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(year, index) in amortizationSchedule" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatCurrency(year.remainingPrincipal) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatCurrency(year.interestPaid) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatCurrency(year.principalPaid) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {LegendComponent, TooltipComponent, TitleComponent} from 'echarts/components';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart, LegendComponent, TooltipComponent, TitleComponent]);

const props = defineProps({
  propertyPrice: {
    type: Number,
    required: true
  }
});

const Chart = VChart;

const localPropertyPrice = ref(props.propertyPrice);
const loanAmount = ref(localPropertyPrice.value * 0.7);
const annualInterestRate = ref(7.5);
const loanTerm = ref(20);

watch(
  () => props.propertyPrice,
  (newValue) => {
    localPropertyPrice.value = newValue;
    if (loanAmount.value > newValue) {
      loanAmount.value = newValue;
    }
  }
);

const monthlyPayment = computed(() => {
  const monthlyRate = annualInterestRate.value / 100 / 12;
  const numberOfPayments = loanTerm.value * 12;
  return (
    (loanAmount.value * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
});

const totalPayment = computed(() => monthlyPayment.value * loanTerm.value * 12);
const totalInterest = computed(() => totalPayment.value - loanAmount.value);
const loanToValueRatio = computed(() => (loanAmount.value / localPropertyPrice.value) * 100);

const amortizationSchedule = computed(() => {
  const schedule = [];
  let remainingPrincipal = loanAmount.value;
  const monthlyRate = annualInterestRate.value / 100 / 12;

  for (let year = 1; year <= loanTerm.value; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let month = 1; month <= 12; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = monthlyPayment.value - interestPayment;

      yearlyInterest += interestPayment;
      yearlyPrincipal += principalPayment;
      remainingPrincipal -= principalPayment;
    }

    schedule.push({
      remainingPrincipal: Math.max(0, remainingPrincipal),
      interestPaid: yearlyInterest,
      principalPaid: yearlyPrincipal
    });
  }

  return schedule;
});

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Khoản vay',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {value: loanAmount.value, name: 'Số tiền gốc'},
        {value: totalInterest.value, name: 'Tiền lãi'}
      ]
    }
  ]
}));

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
};
</script>

<style scoped>
.mortgage-calculator-container {
  font-family: 'Inter', sans-serif;
}

input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}

input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}

.shadow-custom {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@media (max-width: 640px) {
  .mortgage-calculator-container {
    padding: 1rem;
  }
}
</style>
