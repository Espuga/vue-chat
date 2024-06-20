import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Chat.vue'),
      meta: { title: 'Accounting' }
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/'
    }
  ]
});

export default router;