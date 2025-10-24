import {defineStore} from 'pinia';
import {webSocketService} from '../api/websocketClient';
import {useToast} from '@/stores/useToast';
import {Endpoint} from '@/constants/Endpoint';
import {http} from '@/api/httpClient';

const {showToast} = useToast();

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    refreshTokenTimeout: null
  }),

  actions: {
    async login(credentials) {
      this.isLoading = true;
      try {
        const res = await http.post(Endpoint.login, credentials);
        if (res.succeeded === true) {
          this.setToken(res.result.token, res.result.expire);
          this.scheduleTokenRefresh();
          await this.fetchUserInfo();

          if (this.user) webSocketService.connect(this.user.id);

          showToast('Đăng nhập thành công!', 'success');

          return true;
        }
      } catch (err) {
        showToast(err?.response?.data?.errors?.[0], 'error');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    setToken(token, expire) {
      localStorage.setItem('jwt', token);
      if (expire) localStorage.setItem('jwt_expire', expire);
    },

    getToken() {
      return localStorage.getItem('jwt');
    },

    getTokenexpire() {
      return parseInt(localStorage.getItem('jwt_expire') || '0');
    },

    scheduleTokenRefresh() {
      const token = this.getToken();
      const expire = this.getTokenexpire();
      if (!token || !expire) return;

      const timeout = expire - Date.now() - 60000;
      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
      } else {
        this.refreshToken();
      }
    },

    async refreshToken() {
      try {
        const res = await http.post(Endpoint.refreshToken);
        if (res.succeeded) {
          this.setToken(res.result.token, res.result.expire);
          this.scheduleTokenRefresh();
        }
      } catch (err) {
        showToast(err?.response?.data?.errors?.[0], 'error');
        this.logout();
      }
    },

    async fetchUserInfo() {
      const token = this.getToken();
      if (!token) return this.logout();

      this.isLoading = true;
      try {
        const res = await http.get(Endpoint.getUserInfo);
        if (res.succeeded) {
          this.user = res.result;
          this.isAuthenticated = true;
        }
      } catch (err) {
        if (err.response?.status === 401) {
          await this.refreshToken();
          return this.fetchUserInfo();
        }
        showToast(err?.response?.data?.errors?.[0], 'error');
        this.logout();
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('jwt_expire');
      this.user = null;
      this.isAuthenticated = false;
      webSocketService.disconnect();
      if (this.refreshTokenTimeout) clearTimeout(this.refreshTokenTimeout);
      showToast('Logout successfully!', 'info');
    },

    async initializeAuth() {
      const token = this.getToken();
      if (!token) return;
      this.scheduleTokenRefresh();
      await this.fetchUserInfo();
      if (this.user) webSocketService.connect(this.user.id);
    },

    updateUser(updatedUser) {
      this.user = {...this.user, ...updatedUser};
    }
  }
});
