import type { RouteRecordRaw } from 'vue-router'

export const profileRoutes = [
  {
    path: '/profile',
    component: () => import('@/layouts/profile/ProfileLayout.vue'),
    children: [
      {
        path: '',
        name: 'My Profile',
        component: () => import('@/pages/profile/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        name: 'User Profile',
        component: () => import('@/pages/profile/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
] as RouteRecordRaw[]
