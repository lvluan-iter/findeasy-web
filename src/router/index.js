import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/UserPage.vue'),
    children: [
      {
        path: '',
        name: 'WebHome',
        component: () => import('@/views/WebHome.vue')
      },
      {
        path: 'login',
        name: 'WebLogin',
        component: () => import('@/layouts/LoginLayout.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/layouts/RegisterLayout.vue')
      },
      {
        path: 'profile',
        name: 'WebProfile',
        component: () => import('@/views/WebProfile.vue')
      },
      {
        path: 'upnew',
        name: 'WUpNew',
        component: () => import('@/views/WUpNew.vue')
      },
      {
        path: 'propertydetail/:id',
        name: 'DetailProperty',
        component: () => import('@/views/DetailProperty.vue'),
        props: true
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/layouts/ForgotPasswordLayout.vue')
      },
      {
        path: 'reset-password',
        name: 'WebReset',
        component: () => import('@/views/WebReset.vue')
      },
      {
        path: 'search',
        name: 'WebSearch',
        component: () => import('@/views/WebSearch.vue')
      },
      {
        path: 'dashboard',
        name: 'WebDashboard',
        component: () => import('@/views/WebDashboard.vue')
      },
      {
        path: 'tourrequest',
        name: 'WebRequest',
        component: () => import('@/views/WebRequest.vue')
      },
      {
        path: 'client-requests',
        name: 'ClientRequests',
        component: () => import('@/views/ClientRequests.vue')
      },
      {
        path: 'user-property/:id',
        name: 'UserProperty',
        component: () => import('@/views/UserProperty.vue'),
        props: true
      },
      {
        path: 'compare/:ids',
        name: 'WebCompare',
        component: () => import('@/views/WebCompare.vue')
      },
      {
        path: 'yourproperty',
        name: 'WMyProperty',
        component: () => import('@/views/WMyProperty.vue')
      },
      {
        path: 'payment-result',
        name: 'PaymentResult',
        component: () => import('@/components/PaymentResult.vue')
      },
      {
        path: 'edit-property/:id',
        name: 'EditProperty',
        component: () => import('@/components/EditProperty.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
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
      }
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
      return {top: 0};
    }
  }
});

export default router;
