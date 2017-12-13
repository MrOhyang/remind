import Vue from 'vue'

export default {
  state: {
    phone: null,  // 用户 电话
    token: null,  // 用户 token 信息
  },
  mutations: {
    // 存储 phone
    '[user]setPhone': function(state, data) {
      state.phone = data;
    },
    // 存储 token
    '[user]setToken': function(state, data) {
      state.token = data;
    }
  },
  actions: {
  }
}