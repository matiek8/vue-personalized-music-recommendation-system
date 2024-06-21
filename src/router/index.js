import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore}            from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'auth',
    component: () => import('@/views/Auth.vue'),
    meta: {
      authLayout: true,
    }
  },{
    path: '/auth',
    redirect: {name: 'auth'}
  },{
    path: '/auth/signin',
    name: 'signin',
    component: () => import('@/views/Signin.vue'),
    meta: {
      authLayout: true,
    }
  },{
    path: '/auth/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
    meta: {
      authLayout: true,
    }
  },{
    path: '/main',
    name: 'main',
    props: true,
    component: () => import('@/views/Main.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/account',
    name: 'account',
    props: true,
    component: () => import('@/views/Account.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/account/edit',
    name: 'edit-account',
    props: true,
    component: () => import('@/views/EditAccount.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/account/mood-history',
    name: 'mood-history',
    props: true,
    component: () => import('@/views/MoodHistory.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/playlist',
    name: 'playlist',
    props: true,
    component: () => import('@/views/Playlist.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/search',
    name: 'search',
    props: true,
    component: () => import('@/views/Search.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  },{
    path: '/library',
    name: 'library',
    props: true,
    component: () => import('@/views/Library.vue'),
    meta: {
      requiresAuth: true,
      order: 1
    }
  }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuth) return '/auth'
})

export default router
