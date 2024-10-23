<template>
  <div
    v-if="props.isOpen"
    class="fixed bottom-10 right-10 z-10 w-full sm:w-96 h-[545px] max-h-[calc(100vh-5rem)] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex justify-between items-center">
      <h2 class="text-white font-bold text-lg">
        Tin nhắn
      </h2>
      <button
        class="text-white hover:text-gray-200 focus:outline-none"
        @click="$emit('close')"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Search Bar -->
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm cuộc hội thoại..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Conversation List -->
    <div
      class="flex-1 overflow-y-auto"
    >
      <div
        v-for="conversation in filteredConversations"
        :key="conversation.conversationId"
        class="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
        @click="selectConversation(conversation)"
      >
        <div class="flex-shrink-0 mr-3 relative">
          <img
            class="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
            :src="getAvatarUrl(conversation.otherUserId)"
            alt="User avatar"
          >
          <div
            v-if="conversation.isOnline"
            class="absolute bottom-0 right-0 bg-green-400 rounded-full h-3 w-3 border-2 border-white"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-baseline">
            <p class="text-sm font-semibold text-gray-900 truncate">
              {{ conversation.otherUserName }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatTime(conversation.latestMessageTime) }}
            </p>
          </div>
          <p 
            class="text-sm truncate mt-1"
            :class="{
              'text-gray-600': conversation.unreadCount === 0,
              'text-gray-900 font-semibold': conversation.unreadCount > 0
            }"
          >
            {{ conversation.latestMessageContent }}
          </p>
        </div>
        <div
          v-if="conversation.unreadCount > 0"
          class="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1"
        >
          {{ conversation.unreadCount }}
        </div>
      </div>
    </div>
    <ChatComponent
      v-if="showChat"
      :sender-id="userStore.user.id"
      :recipient-id="selectedRecipientId"
      @close="showChat = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { format, isToday, isYesterday } from 'date-fns';
import ChatComponent from './ChatComponent.vue';
import { webSocketService } from '@/services/websocketService';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'selectConversation', 'newMessage']);

const userStore = useUserStore();
const conversations = ref([]);
const searchQuery = ref('');
const showChat = ref(false);
const selectedRecipientId = ref(null);

const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value;
  return conversations.value.filter(conv => 
    conv.otherUserName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    conv.latestMessageContent.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function getAvatarUrl(userId) {
  return `https://api.dicebear.com/6.x/avataaars/svg?seed=${userId}`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd/MM/yyyy');
  }
}

function selectConversation(conversation) {
  selectedRecipientId.value = conversation.otherUserId;
  showChat.value = true;
  emit('selectConversation', conversation);
}

function handleInitialData(data) {
  conversations.value = data.conversations;
}

function handleConversationsUpdate(updatedConversations) {
  conversations.value = updatedConversations;
}

function subscribeToWebSocketUpdates() {
  webSocketService.addSubscription(`/user/${userStore.user.id}/queue/initial-data`, handleInitialData);
  webSocketService.addSubscription(`/user/${userStore.user.id}/queue/conversations`, handleConversationsUpdate);
}

onMounted(() => {
  if (userStore.isAuthenticated) {
    subscribeToWebSocketUpdates();
  }
});

watch(() => userStore.isAuthenticated, (newValue) => {
  if (newValue) {
    subscribeToWebSocketUpdates();
  }
});
</script>