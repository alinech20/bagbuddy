import type { RouteRecordRaw } from 'vue-router'

export const listsRoutes = [
  {
    path: '/lists',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '/create',
        name: 'Create Packing List',
        component: () => import('@/pages/lists/CreateListPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
] as RouteRecordRaw[]
