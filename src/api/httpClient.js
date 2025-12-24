import axios from 'axios';
import {useUserStore} from '@/stores/userStore';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

http.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.getToken();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default http;
