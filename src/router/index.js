import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/HomeView.vue'

const routes = [

  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddProductView.vue')
  },
  {
    path: '/editProduct',
    name: 'editProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProductView.vue')
  },
  {
    path: '/caja',
    name: 'caja',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CajaView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
