import Vue from 'vue'
import Router from 'vue-router'

import List from '@/pages/list.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // linkActiveClass: 'active',  // 全局配置 默认 class 激活类名
  routes: [
    {
      path: '/',
      name: 'Index',
      // component: HelloWorld
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;