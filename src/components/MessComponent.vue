<template>
  <div class="relative z-10">
    <Transition name="fade">
      <div v-if="showNotification" class="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl p-4 w-64">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-gray-800">New Message</span>
          <button class="text-gray-500 hover:text-gray-700" @click="dismissNotification">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600">You have {{ unreadCount }} new messages</p>
      </div>
    </Transition>

    <button
      class="fixed bottom-6 right-6 z-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      :class="{
        'animate-bounce': isAnimating,
        pulse: unreadCount > 0 && !isMessengerOpen,
        'scale-effect': isMessengerOpen
      }"
      @click="toggleMessenger"
      @mouseenter="isAnimating = true"
      @mouseleave="isAnimating = false"
    >
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <Transition name="scale">
          <div
            v-if="unreadCount > 0 && !isMessengerOpen"
            class="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ unreadCount }}
          </div>
        </Transition>
      </div>
    </button>
    <ConversationManagement ref="conver" :is-open="isMessengerOpen" @close="closeMessenger" />
  </div>
</template>

<script setup>
import {ref, watch, onMounted, onUnmounted} from 'vue';
import {webSocketService} from '@/api/websocketClient';
import ConversationManagement from './ConversationManagement.vue';
import {useUserStore} from '@/stores/userStore';

const userStore = useUserStore();
const unreadCount = ref(0);
const isAnimating = ref(false);
const showNotification = ref(false);
const isMessengerOpen = ref(false);
let notificationTimer = null;
const conver = ref(null);

function subscribeToWebSocketUpdates() {
  webSocketService.addSubscription(`/user/${userStore.user.id}/queue/initial-data`, handleInitialData);
  webSocketService.addSubscription(`/user/${userStore.user.id}/queue/unread`, handleUnreadCount);
}

function handleInitialData(data) {
  unreadCount.value = data.unreadCount;
  showNotificationIfNeeded();
}

function handleUnreadCount(unread) {
  unreadCount.value = unread.unreadCount;
  showNotificationIfNeeded();
}

function showNotificationIfNeeded() {
  if (unreadCount.value > 0 && !isMessengerOpen.value) {
    showNotification.value = true;
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
      showNotification.value = false;
    }, 5000);
  }
}

function toggleMessenger() {
  isMessengerOpen.value = !isMessengerOpen.value;
}

function closeMessenger() {
  isMessengerOpen.value = false;
}

function dismissNotification() {
  showNotification.value = false;
}

onMounted(() => {
  if (userStore.isAuthenticated) {
    subscribeToWebSocketUpdates();
  }
});

watch(
  () => userStore.isAuthenticated,
  (newValue) => {
    if (newValue) {
      subscribeToWebSocketUpdates();
    }
  }
);

onUnmounted(() => {
  clearTimeout(notificationTimer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease-out;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(94, 150, 203, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(72, 187, 120, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

.scale-effect {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}
</style>
