<template>
<div class="login-wrapper">

  <!-- 登录头部标题 -->
  <div class="login-title">
    <h1>登录</h1>
  </div>

  <!-- 电话号码输入等等 -->
  <div class="form-wrapper">
    <div class="form-row">
      <i class="iconfont icon-user"></i>
      <el-input size="small" placeholder="手机号" v-model.trim="phone"></el-input>
    </div>
    <div class="form-row clearfix">
      <button class="btn-yzm" :class="{sended: sended_yzm}" @click="clickSendYzm()">
        {{ {true: `${btn_yzm_val}s后可重新发送`, false: '获取短信验证码'}[sended_yzm] }}
      </button>
    </div>
    <div class="form-row" :class="{visihide: !show_input_yzm}">
      <i class="iconfont icon-pwd"></i>
      <el-input size="small" placeholder="请输入您收到的短信验证码"
                ref="input_yzm"
                v-model.trim="yzm"></el-input>
    </div>

    <button class="btn-submit" @click="login">登录</button>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      btn_yzm_val: '',  // 秒

      phone: '',     // 手机号码
      yzm: '',       // 短信验证码
      phone_bk: '',  // 手机号码备份

      sended_yzm: false,  // 是否发送了验证码
      show_input_yzm: false,  // 显示填入短信验证码

      sended_yzm_timer: null,  // 发送验证码计时器
    }
  },
  methods: {
    // 发送验证码
    clickSendYzm() {
      if (!this.sended_yzm) {
        if (!this.checkPhone()) {
          return ;
        }
        this.sendGetYzm();
        this.sended_yzm = true;
        this.btn_yzm_val = 60;
        this.sended_yzm_timer = window.setInterval(() => {
          if (this.btn_yzm_val <= 0) {
            window.clearInterval(this.sended_yzm_timer);
            this.sended_yzm = false;
            return ;
          }
          this.btn_yzm_val--;
        }, 1000);
      } else {
        return ;
      }
    },
    // 检查手机是否合法
    checkPhone() {
      if (/^1[0-9]{10}/.test(this.phone)) {
        return true;
      } else {
        this.$message({
          showClose: true,
          message: '手机号码不正确',
          type: 'error'
        });
        return false;
      }
    },
    // 发送获取验证码请求
    sendGetYzm() {
      this.$http.get('/api/ReMind/User/phoneCode', {
        params: {
          phone: this.phone
        }
      }).then(r => {
        if (r.data.code == 0) {
          this.show_input_yzm = true;
          this.phone_bk = this.phone;
          this.$nextTick(() => {
            this.$refs.input_yzm.focus();
          });
        } else {
          throw Error(r.msg);
        }
      }).catch(e => {
        window.clearInterval(this.sended_yzm_timer);
        this.sended_yzm = false;
        this.$message({
          showClose: true,
          message: '发生错误',
          type: 'error'
        });
      });
    },
    // 验证登录
    login() {
      if (!this.show_input_yzm) {
        return ;
      }
      if (this.phone != this.phone_bk) {
        window.clearInterval(this.sended_yzm_timer);
        this.sended_yzm = false;
        this.$message({
          showClose: true,
          message: '手机号码已被修改，请重新收取验证码信息',
          type: 'error'
        });
        return ;
      }
      if (this.yzm == '') {
        this.$message({
          showClose: true,
          message: '短信验证码不能为空',
          type: 'error'
        });
        return ;
      }
      this.$http.get('/api/ReMind/User/checkLogin', {
        params: {
          phone: this.phone,
          code: this.yzm
        }
      }).then(r => {
        if (r.data.code == 0) {
          this.$message({
            showClose: true,
            message: '登录成功，2s后跳转至消息中心',
            type: 'success'
          });
          window.setTimeout(() => {
            this.$router.push({ path: '/list' });
          }, 2000);
        } else {
        }
      }).catch(e => {
        this.$message({
          showClose: true,
          message: '发生错误',
          type: 'error'
        });
      });
    }
  }
}
</script>
