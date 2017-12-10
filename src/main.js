// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import _ from 'lodash'
import myCookie from '@/plugins/myCookie/myCookie.js'

import {
  Input,
  Checkbox,     // 多选框
  CheckboxButton,
  CheckboxGroup,
  Message
} from 'element-ui'

Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
Vue.$http = Vue.prototype.$http = Axios;
Vue.use(myCookie);

// Axios 拦截器设置
Axios.interceptors.request.use(config => {
  // 如果 接口路径 不是 auth 开头的那么都需要加个 token
  // if (!/^\/auth/.test(config.url)) {
  //   config.headers.Authorization = 'Bearer ' + store.state.user.token;
  // }
  return config;
});
Axios.interceptors.response.use(res => {
  // 如果 接口提示 没有登录的话，就删除 本地数据并跳转首页
  // if (res.data.code == 6) {
  //   localStorage.removeItem('user-token');
  //   localStorage.removeItem('user-token-time');
  //   window.location.href = window.location.origin;
  // }
  return res;
});

import router from '@/router'
import store from '@/store'
import App from '@/App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
