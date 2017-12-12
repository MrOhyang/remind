import Vue from 'vue'

export default {
  state: {
    token: null,  // 用户 token 信息
  },
  mutations: {
    // 存储 token
    '[user]setToken': function(state, data) {
      state.token = data;
    }
  },
  actions: {
  }
}