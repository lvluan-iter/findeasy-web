import Vue from 'vue';
import Router from 'vue-router';
import WebHome from '../views/WebHome.vue';
import WebLogin from '../views/WebLogin';
import WebRegister from '../views/WebRegister';
import WebProfile from '../views/WebProfile';
import WUpNew from '../views/WUpNew';
import DetailProperty from '../views/DetailProperty';
import WebPassword from '../views/WebPassword';
import WebReset from '../views/WebReset';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WebHome',
      component: WebHome
    },
    {
      path: '/login',
      name: 'WebLogin',
      component: WebLogin
    },
    {
      path: '/register',
      name: 'WebRegister',
      component: WebRegister
    },
    {
      path: '/profile',
      name: 'WebProfile',
      component: WebProfile
    },
    {
      path: '/upnew',
      name: 'WUpNew',
      component: WUpNew
    },
    {
      path: '/propertydetail/:id',
      name: 'DetailProperty',
      component: DetailProperty,
      props: true
    },
    {
      path: '/forgot-password',
      name: 'WebPassword',
      component: WebPassword
    },
    {
      path: '/reset-password',
      name: 'WebReset',
      component: WebReset,
    }
  ]
});
