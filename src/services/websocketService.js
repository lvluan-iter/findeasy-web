import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { ref, reactive } from 'vue'

const stompClient = ref(null)
const connectionStatus = ref('disconnected')
const maxReconnectAttempts = 5
let reconnectAttempts = 0
let userId = null

const state = reactive({
  conversations: [],
  unreadCount: {},
  userStatuses: {}
})

const subscriptions = []

const createWebSocketService = () => {
  const connect = (newUserId) => {
    if (userId === newUserId && connectionStatus.value === 'connected') {
      return
    }

    userId = newUserId
    if (connectionStatus.value !== 'disconnected') {
      disconnect()
    }

    connectionStatus.value = 'connecting'
    const socket = new SockJS('https://roombooking-fa3a.onrender.com/ws')
    stompClient.value = Stomp.over(() => socket)

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'User-ID': userId.toString()
    }

    stompClient.value.connect(headers, onConnected, onError)
  }

  const onConnected = (frame) => {
    console.log('Connected: ' + frame)
    connectionStatus.value = 'connected'
    reconnectAttempts = 0
    sendUserStatus('online')
    subscribeToChannels()

    stompClient.value.send("/app/get-initial-data", {}, JSON.stringify({}))
  }

  const onError = (error) => {
    console.log('STOMP error ' + error)
    connectionStatus.value = 'disconnected'
    reconnect()
  }

  const subscribeToChannels = () => {
    if (!stompClient.value?.connected) return

    const defaultSubscriptions = [
      { topic: '/topic/user-status', handler: handleUserStatus },
      { topic: `/user/${userId}/queue/unread`, handler: handleUnreadMessages },
      { topic: `/user/${userId}/queue/conversations`, handler: handleConversationsUpdate },
      { topic: `/user/${userId}/queue/initial-data`, handler: handleInitialData },
      { topic: `/user/${userId}/queue/messages`, handler: handleNewMessage }
    ]

    defaultSubscriptions.concat(subscriptions).forEach(({ topic, handler }) => {
      stompClient.value.subscribe(topic, message => {
        handler(JSON.parse(message.body))
      })
    })
  }

  const handleUserStatus = (statusUpdate) => {
    state.userStatuses = statusUpdate.status
  }

  const handleUnreadMessages = (unreadNotification) => {
    state.unreadCount = unreadNotification
  }

  const handleConversationsUpdate = (conversations) => {
    state.conversations = conversations
  }

  const handleInitialData = (initialData) => {
    state.unreadCount = initialData.unreadCount
    state.conversations = initialData.conversations
    state.userStatuses = initialData.userStatuses
  }

  const handleNewMessage = (message) => {
    const conversationIndex = state.conversations.findIndex(c => c.id === message.conversationId)
    if (conversationIndex !== -1) {
      state.conversations[conversationIndex].lastMessage = message
      state.conversations[conversationIndex].unreadCount++
    }
    state.unreadCount++
  }

  const reconnect = () => {
    if (reconnectAttempts++ < maxReconnectAttempts) {
      setTimeout(() => connect(userId), 5000)
    } else {
      console.log('Max reconnect attempts reached')
    }
  }

  const sendUserStatus = (status) => {
    if (stompClient.value?.connected && userId) {
      stompClient.value.send("/app/user-status", {}, JSON.stringify({ userId, status }))
    }
  }

  const disconnect = () => {
    if (stompClient.value?.connected) {
      sendUserStatus('offline')
      stompClient.value.disconnect()
      connectionStatus.value = 'disconnected'
    }
  }

  const sendMessage = (conversationId, content, recipientId) => {
    if (stompClient.value?.connected) {
      const message = {
        id: Date.now(),
        senderId: userId,
        recipientId,
        conversationId,
        content,
        createdAt: new Date().toISOString(),
        status: 'SENT'
      }
      stompClient.value.send("/app/chat", {}, JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected. Cannot send message.')
    }
  }

  const updateMessageStatus = (messageId, status) => {
    if (stompClient.value?.connected) {
      stompClient.value.send("/app/chat/message/status", {}, JSON.stringify({ messageId, status }))
    }
  }

  const updateConversationStatus = (conversationId, recipientId, status) => {
    if (stompClient.value?.connected) {
      console.log("Sending update for conversation:", conversationId, "recipient:", recipientId, "status:", status);
      stompClient.value.send("/app/chat/conversation/status", {}, JSON.stringify({
        conversationId,
        recipientId,
        status
      }));
    } else {
      console.warn('Không thể cập nhật trạng thái, kết nối WebSocket chưa sẵn sàng');
    }
  }

  const addSubscription = (topic, handler) => {
    subscriptions.push({ topic, handler })
    if (stompClient.value?.connected) {
      stompClient.value.subscribe(topic, message => {
        console.log(`Received message on ${topic}:`, message.body)
        handler(JSON.parse(message.body))
      })
    }
  }

  const getConversations = () => state.conversations
  const getUnreadCount = () => state.unreadCount
  const getUserStatus = (userId) => state.userStatuses[userId]

  return {
    connect,
    disconnect,
    sendMessage,
    sendUserStatus,
    updateMessageStatus,
    updateConversationStatus,
    addSubscription,
    getConversations,
    getUnreadCount,
    getUserStatus,
    connectionStatus
  }
}

export const webSocketService = createWebSocketService()