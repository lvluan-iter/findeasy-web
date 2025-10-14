import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './assets/styles/global.css';
import http from '@/api/httpClient.js';

const app = createApp(App);

app.config.globalProperties.$http = http;

app.use(router).use(createPinia()).mount('#app');
