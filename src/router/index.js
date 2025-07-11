import { createRouter, createWebHistory } from 'vue-router';
import WebHome from '@/views/WebHome.vue';
import WebLogin from '@/views/WebLogin.vue';
import WebRegister from '@/views/WebRegister.vue';
import WebProfile from '@/views/WebProfile.vue';
import WUpNew from '@/views/WUpNew.vue';
import DetailProperty from '@/views/DetailProperty.vue';
import WebPassword from '@/views/WebPassword.vue';
import WebReset from '@/views/WebReset.vue';
import WebSearch from '@/views/WebSearch.vue';
import WebDashboard from '@/views/WebDashboard.vue';
import WebRequest from '@/views/WebRequest.vue';
import ClientRequests from '@/views/ClientRequests.vue';
import UserProperty from '@/views/UserProperty.vue';
import WMyProperty from '@/views/WMyProperty.vue';

const routes = [
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
  },
  {
    path: '/search',
    name: 'WebSearch',
    component: WebSearch,
  },
  {
    path: '/dashboard',
    name: 'WebDashboard',
    component: WebDashboard
  },
  {
    path: '/tourrequest',
    name: 'WebRequest',
    component: WebRequest
  },
  {
    path: '/client-requests',
    name: 'ClientRequests',
    component: ClientRequests
  },
  {
    path: '/user-property/:id',
    name: 'UserProperty',
    component: UserProperty,
    props: true
  },
  {
    path: '/compare/:ids',
    name: 'WebCompare',
    component: () => import('@/views/WebCompare.vue')
  },
  {
    path: '/yourproperty',
    name: 'WMyProperty',
    component: WMyProperty
  },
  {
    path: '/payment-result',
    component: () => import('@/components/PaymentResult.vue')
  },
  {
    path: '/edit-property/:id',
    name: 'EditProperty',
    component: () => import('@/components/EditProperty.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/admin',
    component: () => import('@/views/WebAdmin.vue'),
    children: [
      {
        path: '', 
        redirect: '/admin/adashboard'
      },
      {
        path: '/admin/location',
        component: () => import('@/components/LocationList.vue')
      },
      {
        path: '/admin/categories',
        component: () => import('@/components/CategorieList.vue')
      },
      {
        path: '/admin/amenities',
        component: () => import('@/components/AmenityList.vue')
      },
      {
        path: '/admin/users',
        component: () => import('@/components/UserList.vue')
      },
      {
        path: '/admin/properties',
        component: () => import('@/components/PropertyList.vue')
      },
      {
        path: '/admin/adashboard',
        component: () => import('@/components/DashBoardList.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
