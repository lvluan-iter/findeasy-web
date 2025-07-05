import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    unreadCount: 0,
    conversations: []
  }),
  actions: {
    setUnreadCount(count) {
      this.unreadCount = count
    },
    setConversations(conversations) {
      this.conversations = conversations
    }
  }
})