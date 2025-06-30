import type { RouteRecordRaw } from 'vue-router'

export const authRoutes = [
  {
    path: '/auth',
    component: () => import('@/layouts/auth/AuthLayout.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/auth/RegisterPage.vue'),
      },
      {
        path: '/',
        name: 'Get Started',
        component: () => import('@/pages/auth/GetStartedPage.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
