import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Manage from '../components/Manage'
import LoginForm from '../views/account/LoginForm.vue';
import RegistrationForm from '../views/account/RegistrationForm.vue';
import Calendar from '../views/Calendar.vue'
import store from '../store/index';
import core from '../core/core';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },  
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationForm,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: { requiresAuth: true },
    props: (route) => ({ type: route.query.type, id: route.query.id})  
  },
  {
    path: '/manage/:asset/:action?',
    name: 'manage',
    component: Manage,
    meta: { requiresAuth: true },
    props: true
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record)) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters['auth/isAuthenticated']) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
          next();
      }
    } else {
      if (store.getters['auth/isAuthenticated'] && (to.name === "register" || to.name === "login")) {
        core.go('/')
      } else {
        next();
      }
    }
  } else {
    core.go('/')
  } 
});

export default router
