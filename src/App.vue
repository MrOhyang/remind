<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/fonts/iconfont.css';
export default {
  name: 'app',
  created() {
    // 测试数据
    // this.mockUser();

    if (!this.$store.state.user.token) {
      let phone = this.$getCookie('phone');
      let token = this.$getCookie('token');
      if (phone && token) {
        this.$store.commit('[user]setPhone', phone);
        this.$store.commit('[user]setToken', token);
      }
    }
  },
  methods: {
    mockUser() {
      this.$store.state.user.phone = '18665556015';
    }
  }
}
</script>

<style lang="less">
@import './assets/less/main.less';
</style>
