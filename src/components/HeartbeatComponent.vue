<template>
  <div>
    <!-- Không cần UI elements -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { webSocketService } from '../api/websocketClient'
import { useUserStore } from '../stores/userStore'  // Import userStore

const userStore = useUserStore()  // Use the userStore

const handleVisibilityChange = () => {
  if (userStore.user) {
    webSocketService.sendUserStatus(document.hidden ? 'offline' : 'online')
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>