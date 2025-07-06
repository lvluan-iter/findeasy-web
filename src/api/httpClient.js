import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  },
  (error) => {
    return Promise.reject({
      success: false,
      status: error?.response?.status || 500,
      data: error?.response?.data || { message: error.message || 'Unknown error' }
    });
  }
);

export default http;