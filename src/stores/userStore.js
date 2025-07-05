import { defineStore } from 'pinia'
import { webSocketService } from '../services/websocketService'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    refreshTokenTimeout: null,
  }),
  actions: {
    async login(credentials) {
      this.isLoading = true
      try {
        const response = await fetch('https://roombooking-fa3a.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        this.setToken(data.token)
        this.scheduleTokenRefresh()
        
        await this.fetchUserInfo()
        
        if (this.user) {
          webSocketService.connect(this.user.id)
        }
        
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      } finally {
        this.isLoading = false
      }
    },
    setToken(token) {
      localStorage.setItem('jwt', token)
    },
    getToken() {
      return localStorage.getItem('jwt')
    },
    scheduleTokenRefresh() {
      const token = this.getToken()
      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          const expiresIn = decodedToken.exp * 1000 - Date.now() - 60000
          this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), expiresIn)
        } catch (error) {
          console.error('Error decoding token:', error)
          this.logout() 
        }
      }
    },
    async refreshToken() {
      try {
        const response = await fetch('https://roombooking-fa3a.onrender.com/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.getToken()}`,
          },
        })

        if (!response.ok) {
          throw new Error('Token refresh failed')
        }

        const data = await response.json()
        this.setToken(data.token)
        this.scheduleTokenRefresh()
      } catch (error) {
        console.error('Token refresh error:', error)
        this.logout()
      }
    },
    async fetchUserInfo() {
      const token = this.getToken()
      if (!token) {
        this.user = null
        this.isAuthenticated = false
        return
      }
      
      this.isLoading = true
      try {
        const response = await fetch('https://roombooking-fa3a.onrender.com/api/users/info', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          this.user = await response.json()
          this.isAuthenticated = true
        } else if (response.status === 401) {
          await this.refreshToken()
          return this.fetchUserInfo() 
        } else {
          throw new Error('Failed to fetch user info')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
        this.logout()
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      localStorage.removeItem('jwt')
      this.user = null
      this.isAuthenticated = false
      webSocketService.disconnect()
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout)
      }
    },
    async initializeAuth() {
      const token = this.getToken()
      if (token) {
        this.scheduleTokenRefresh()
        await this.fetchUserInfo()
        if (this.user) {
          webSocketService.connect(this.user.id)
        }
      }
    },
    updateUser(updatedUser) {
      this.user = { ...this.user, ...updatedUser };
    }
  },
})