import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/canvas',
    name: 'Canvas',
    // lets keep that one for docu...
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "canvas" */ '@/views/Canvas.vue')
  },
  {
    path: '/drawing',
    name: 'Drawing',
    component: () => import(/* webpackChunkName: "drawing" */ '@/views/Drawing.vue')
  },
  {
    path: '/anime',
    name: 'Anime',
    component: () => import(/* webpackChunkName: "anime" */ '@/views/Anime.vue')
  },
  {
    path: '/elisa',
    name: 'Elisa',
    component: () => import(/* webpackChunkName: "elisa" */ '@/views/Elisa.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/* webpackChunkName: "grid" */ '@/views/Grid.vue')
  },
  {
    path: '/interact',
    name: 'Interact',
    component: () => import(/* webpackChunkName: "interact" */ '@/views/Interact.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "testing" */ '@/views/Testing.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
