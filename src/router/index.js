import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login.vue'
import List from '@/pages/list.vue'
import Add from '@/pages/add.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // linkActiveClass: 'active',  // 全局配置 默认 class 激活类名
  routes: [
    {
      path: '/',
      name: 'Index',
      // component: HelloWorld
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;