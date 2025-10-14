import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/UserPage.vue'),
    children: [
      {
        path: '',
        name: 'WebHome',
        component: () => import('@/layouts/HomeLayout.vue')
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
        component: () => import('@/layouts/UserProfileLayout.vue')
      },
      {
        path: 'upnew',
        name: 'WUpNew',
        component: () => import('@/layouts/PushPropertyLayout.vue')
      },
      {
        path: 'propertydetail/:id',
        name: 'DetailProperty',
        component: () => import('@/layouts/PropertyDetailLayout.vue'),
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
        component: () => import('@/layouts/ResetPasswordLayout.vue')
      },
      {
        path: 'search',
        name: 'WebSearch',
        component: () => import('@/layouts/SearchLayout.vue')
      },
      {
        path: 'dashboard',
        name: 'WebDashboard',
        component: () => import('@/layouts/DashBoardLayout.vue')
      },
      {
        path: 'tourrequest',
        name: 'WebRequest',
        component: () => import('@/layouts/TourRequestLayout.vue')
      },
      {
        path: 'client-requests',
        name: 'ClientRequests',
        component: () => import('@/layouts/ClientRequestsLayout.vue')
      },
      {
        path: 'user-property/:id',
        name: 'UserProperty',
        component: () => import('@/layouts/CustomerProfileLayout.vue'),
        props: true
      },
      {
        path: 'compare/:ids',
        name: 'WebCompare',
        component: () => import('@/layouts/PropertyCompareLayout.vue')
      },
      {
        path: 'yourproperty',
        name: 'WMyProperty',
        component: () => import('@/layouts/MyPropertyLayout.vue')
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
    component: () => import('@/pages/AdminPage.vue'),
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
