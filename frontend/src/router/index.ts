import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Suscribe',
    component: () => import(/* webpackChunkName: "about" */ '../views/SuscribeView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
    
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostView.vue'),
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
