<template>
  <div
    class="fixed bottom-10 right-10 z-10 w-full sm:w-96 h-[545px] max-h-[calc(100vh-5rem)] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
    @focus="onChatWindowFocus"
    @blur="onChatWindowBlur"
  >
    <!-- Improved header -->
    <div class="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div class="flex items-center">
        <img
          :src="recipientAvatar"
          alt="Avatar"
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 border-2 border-white"
        />
        <div>
          <h2 class="text-base sm:text-lg font-semibold">
            {{ recipientName }}
          </h2>
          <span class="text-xs sm:text-sm text-blue-100">{{ onlineStatus }}</span>
        </div>
      </div>
      <button class="text-white hover:text-blue-200 transition duration-200" @click="closeChat">
        <i class="fas fa-times" />
      </button>
    </div>

    <!-- Messages area -->
    <div ref="messagesContainer" class="flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['flex', message.senderId === senderId ? 'justify-end' : 'justify-start']"
      >
        <div
          :class="[
            'max-w-[75%] rounded-lg p-2 sm:p-3 shadow',
            message.senderId === senderId ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white rounded-bl-none'
          ]"
        >
          <p v-if="message.senderId !== senderId" class="text-xs font-semibold mb-1">
            {{ getSenderName(message.senderId) }}
          </p>
          <p class="text-sm">
            {{ message.content }}
          </p>
          <p class="text-xs mt-1 opacity-70 text-right">
            {{ formatTime(message.timestamp) }}
          </p>
        </div>
      </div>
      <div v-if="isLoading" class="flex justify-center items-center my-2">
        <div class="loader" />
      </div>
    </div>

    <!-- Improved input area with emote picker -->
    <div class="p-3 sm:p-4 bg-white border-t relative">
      <div class="flex items-center bg-gray-100 rounded-full overflow-hidden">
        <button
          class="text-gray-500 hover:text-blue-500 px-2 sm:px-3 py-2 transition duration-200 emote-picker-button"
          @click="toggleEmotePicker"
        >
          <i class="far fa-smile" />
        </button>
        <button
          class="text-gray-500 hover:text-blue-500 px-2 sm:px-3 py-2 transition duration-200"
          @click="openFileUpload"
        >
          <i class="fas fa-paperclip" />
        </button>
        <input
          v-model="newMessage"
          placeholder="Nhập tin nhắn..."
          class="flex-grow p-2 bg-transparent focus:outline-none text-sm sm:text-base"
          @keyup.enter="sendMessage"
        />
        <button
          class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-200 mr-1"
          @click="sendMessage"
        >
          <i class="fas fa-paper-plane" />
        </button>
      </div>

      <!-- Messenger-like Emote Picker -->
      <transition name="emote-picker">
        <div
          v-if="showEmotePicker"
          class="emote-picker absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg shadow-lg w-full max-h-48 sm:max-h-64 overflow-y-auto"
        >
          <div class="grid grid-cols-6 sm:grid-cols-8 gap-2">
            <button
              v-for="emote in emotes"
              :key="emote"
              class="text-xl sm:text-2xl hover:bg-gray-100 rounded p-1 transition duration-200"
              @click="addEmote(emote)"
            >
              {{ emote }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, nextTick, onUnmounted, getCurrentInstance} from 'vue';
import {format, parseISO} from 'date-fns';
import {webSocketService} from '@/api/websocketClient';
import {Endpoint} from '@/constants/Endpoint';

const {proxy} = getCurrentInstance();

const props = defineProps({
  senderId: {
    type: [String, Number],
    required: true
  },
  recipientId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['close']);

const messages = ref([]);
const newMessage = ref('');
const conversationId = ref(null);
const chatWindowFocused = ref(false);
const isLoading = ref(false);
const messagesContainer = ref(null);

const recipientName = ref('');
const recipientAvatar = ref('');
const onlineStatus = ref('');

const showEmotePicker = ref(false);
const emotes = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '🤣',
  '😂',
  '🙂',
  '🙃',
  '😉',
  '😊',
  '😇',
  '🥰',
  '😍',
  '🤩',
  '😘',
  '😗',
  '☺️',
  '😚',
  '😙',
  '🥲',
  '😋',
  '😛',
  '😜',
  '🤪',
  '😝',
  '🤑',
  '🤗',
  '🤭',
  '🤫',
  '🤔',
  '🤐',
  '🤨',
  '😐',
  '😑',
  '😶',
  '😶‍🌫️',
  '😏',
  '😒',
  '🙄',
  '😬',
  '😮‍💨',
  '🤥',
  '😌',
  '😔',
  '😪',
  '🤤',
  '😴',
  '😷',
  '🤒',
  '🤕',
  '🤢',
  '🤮',
  '🤧',
  '🥵',
  '🥶',
  '🥴',
  '😵',
  '😵‍💫',
  '🤯',
  '🤠',
  '🥳',
  '🥸',
  '😎',
  '🤓',
  '🧐',
  '😕',
  '😟',
  '🙁',
  '☹️',
  '😮',
  '😯',
  '😲',
  '😳',
  '🥺',
  '😦',
  '😧',
  '😨',
  '😰',
  '😥',
  '😢',
  '😭',
  '😱',
  '😖',
  '😣',
  '😞',
  '😓',
  '😩',
  '😫',
  '🥱',
  '😤',
  '😡',
  '😠',
  '🤬',
  '😈',
  '👿',
  '💀',
  '☠️',
  '💩',
  '🤡',
  '👹',
  '👺',
  '👻',
  '👽',
  '👾',
  '🤖',
  '😺',
  '😸',
  '😹',
  '😻',
  '😼',
  '😽',
  '🙀',
  '😿',
  '😾',
  '🙈',
  '🙉',
  '🙊',
  '💋',
  '💌',
  '💘',
  '💝',
  '💖',
  '💗',
  '💓',
  '💞',
  '💕',
  '💟',
  '❣️',
  '💔',
  '❤️‍🔥',
  '❤️‍🩹',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🤎',
  '🖤',
  '🤍',
  '💯',
  '💢',
  '💥',
  '💫',
  '💦',
  '💨',
  '🕳️',
  '💣',
  '💬',
  '👁️‍🗨️',
  '🗨️',
  '🗯️',
  '💭',
  '💤'
];

onMounted(() => {
  loadConversation();
  subscribeToTopics();
  updateConversationStatus('READ');
  fetchRecipientUser();
  document.addEventListener('click', closeEmotePickerOutside);
});

function subscribeToTopics() {
  webSocketService.addSubscription(`/user/${props.senderId}/topic/messages`, handleNewMessage);
  webSocketService.addSubscription(`/user/${props.senderId}/topic/message-status`, handleMessageStatusUpdate);
  webSocketService.addSubscription('/topic/user-status', handleUserStatus);
}

function handleNewMessage(message) {
  const receivedMessage = message;
  const existingMessageIndex = messages.value.findIndex((m) => m.id === receivedMessage.id);

  if (existingMessageIndex !== -1) {
    messages.value[existingMessageIndex] = {
      ...receivedMessage,
      createdAt: format(parseISO(receivedMessage.createdAt), 'HH:mm')
    };
  } else {
    messages.value.push({
      ...receivedMessage,
      createdAt: format(parseISO(receivedMessage.createdAt), 'HH:mm')
    });
  }

  updateMessageStatus(receivedMessage.id, 'RECEIVED');
  scrollToBottom();
}

function handleMessageStatusUpdate(statusUpdate) {
  const updatedMessage = JSON.parse(statusUpdate.body);
  const messageIndex = messages.value.findIndex((m) => m.id === updatedMessage.id);
  if (messageIndex !== -1) {
    messages.value[messageIndex] = {
      ...updatedMessage,
      createdAt: format(parseISO(updatedMessage.createdAt), 'HH:mm')
    };
  }
}

function handleUserStatus(message) {
  const statusUpdate = message;
  if (statusUpdate.userId === props.recipientId) {
    const status = statusUpdate.status?.status ?? statusUpdate.status;
    onlineStatus.value = status || 'offline';
  }
}

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    isLoading.value = true;
    conversationId.value = generateConversationId(props.senderId, props.recipientId);
    const message = {
      id: Date.now(),
      senderId: props.senderId,
      recipientId: props.recipientId,
      conversationId: conversationId.value,
      content: newMessage.value,
      createdAt: new Date().toISOString(),
      status: 'SENT'
    };

    webSocketService.sendMessage(message.conversationId, message.content, message.recipientId);

    messages.value.push({
      ...message,
      createdAt: format(parseISO(message.createdAt), 'HH:mm')
    });

    newMessage.value = '';
    showEmotePicker.value = false;

    setTimeout(() => {
      isLoading.value = false;
      scrollToBottom();
    }, 1000);
  }
}

function updateMessageStatus(messageId, status) {
  webSocketService.updateMessageStatus(messageId, status);
}

function updateConversationStatus(status) {
  conversationId.value = generateConversationId(props.senderId, props.recipientId);
  webSocketService.updateConversationStatus(conversationId.value, props.senderId, status);
}

async function loadConversation() {
  conversationId.value = generateConversationId(props.senderId, props.recipientId);
  try {
    const response = await proxy.$http.get(Endpoint.getConversation(conversationId.value));
    if (response.succeeded) {
      messages.value = response.result.map((msg) => ({
        ...msg,
        createdAt: format(parseISO(msg.createdAt), 'HH:mm')
      }));
      scrollToBottom();
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to load conversation');
    }
  } catch (error) {
    console.error('Error loading conversation:', error);
  }
}

async function fetchRecipientUser() {
  try {
    const response = await proxy.$http.get(Endpoint.getUserById(props.recipientId));
    if (response.succeeded) {
      const userData = response.result;
      recipientName.value = userData.fullname;
      recipientAvatar.value = userData.avatar;
      onlineStatus.value = userData.status || 'offline';
    } else {
      throw new Error(response.errors ? response.errors.join(', ') : 'Failed to fetch recipient user');
    }
  } catch (error) {
    console.error('Error fetching user contact:', error);
  }
}

function generateConversationId(userId1, userId2) {
  return `${Math.min(userId1, userId2)}_${Math.max(userId1, userId2)}`;
}

function getSenderName(senderId) {
  return senderId === props.senderId ? 'Bạn' : 'Người nhận';
}

function formatTime(timestamp) {
  if (!timestamp) return '';

  try {
    const date = parseISO(timestamp);
    return format(date, 'HH:mm');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

function closeChat() {
  emit('close');
}

function onChatWindowFocus() {
  chatWindowFocused.value = true;
  updateConversationStatus('READ');
}

function onChatWindowBlur() {
  chatWindowFocused.value = false;
}

function toggleEmotePicker() {
  showEmotePicker.value = !showEmotePicker.value;
}

function addEmote(emote) {
  newMessage.value += emote;
}

function openFileUpload() {
  console.log('Open file upload');
}

function closeEmotePickerOutside(event) {
  const emotePickerButton = document.querySelector('.emote-picker-button');
  const emotePicker = document.querySelector('.emote-picker');
  if (showEmotePicker.value && !emotePickerButton.contains(event.target) && !emotePicker.contains(event.target)) {
    showEmotePicker.value = false;
  }
}

onUnmounted(() => {
  document.removeEventListener('click', closeEmotePickerOutside);
});
</script>

<style scoped>
.messages {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
}

.messages::-webkit-scrollbar {
  width: 4px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 2px;
}

.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Thêm hiệu ứng xuất hiện cho tin nhắn mới */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.messages > div:last-child {
  animation: fadeIn 0.3s ease-out;
}

/* Hiệu ứng cho emote picker */
.emote-picker-enter-active,
.emote-picker-leave-active {
  transition: all 0.3s ease-out;
}

.emote-picker-enter-from,
.emote-picker-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Tùy chỉnh scrollbar cho bảng emote */
.emote-picker {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.emote-picker::-webkit-scrollbar {
  width: 6px;
}

.emote-picker::-webkit-scrollbar-track {
  background: transparent;
}

.emote-picker::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
  border: 2px solid transparent;
}

@media (max-width: 640px) {
  .messages > div:last-child {
    animation: none; /* Disable animation on small screens for better performance */
  }

  .emote-picker {
    max-height: 40vh; /* Limit height on small screens */
  }
}

@media (max-height: 600px) {
  .fixed {
    position: absolute; /* Change to absolute for very short screens */
  }
}
</style>
