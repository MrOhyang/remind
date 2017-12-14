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
      redirect: '/list'
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
  let phone = Vue.$getCookie('phone');
  let token = Vue.$getCookie('token');

  if (/\/login/.test(to.path)) {
    // 已经登录过的跳转列表页
    if (phone && token) {
      next('/list');
      return ;
    } else {
    }
  } else {
    // 需要判断登录
    if (phone && token) {
    } else {
      // 需要登录，但是用户没有登录
      next('/login');
      return ;
    }
  }
  next();
});

export default router;