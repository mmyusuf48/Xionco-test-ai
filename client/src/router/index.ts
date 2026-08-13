import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import Chat from '../pages/Chat.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
    },
  ],
})

export default router