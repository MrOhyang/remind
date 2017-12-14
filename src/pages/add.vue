<template>
<div class="add-wrapper">

  <!-- 标题 -->
  <div class="add-title-wrapper">
    <router-link to="/list" class="iconfont icon-arrow-left"></router-link>
    <h1>添加提醒{{ this.time }}</h1>
  </div>

  <div class="main-input-wrapper">
    <el-input type="text" placeholder="输入您要提醒的事" v-model.trim="content"></el-input>
  </div>

  <!-- 日期选择 -->
  <!-- <div class="select-date-wrapper">
  </div> -->
  <dateSelector ref="date_selector"></dateSelector>

  <!-- 设置时间按钮 -->
  <div class="list-wrapper">
    设置提醒时间：
    <input type="time" class="input-time" step="300"
           v-model="time"
           @input="transferInputTime()">
  </div>

  <button class="btn-save" @click="addTask()">保存</button>

</div>
</template>

<script>
import qs from 'qs';
import moment from 'moment';
import dateSelector from '@/components/dateSelector.vue';
export default {
  data() {
    return {
      content: '',  // 用户输入要提醒是事
      time: null,   // 用户输入要提醒的时间

      is_sending: false,  // 是否正在发送
    };
  },
  components: {
    dateSelector
  },
  methods: {
    // 初始化数据
    initData() {
      this.content = '';
    },
    // 添加提醒事件
    addTask() {
      if (this.is_sending) return ;

      let phone = this.$store.state.user.phone,
          ymd = this.$refs.date_selector.selected_day.format('YYYY-MM-DD'),
          time = `${ymd} ${this.time}:00`;

      // 校验
      if (this.content.length <= 0) {
        this.$message({
          showClose: true,
          message: '您未输入要提醒的事',
          type: 'error'
        });
        return ;
      }
      if (this.time == null) {
        this.$message({
          showClose: true,
          message: '请输入提醒时间',
          type: 'error'
        });
        return ;
      }

      time = moment(time).unix();

      // console.log(phone, time, this.content);
      this.is_sending = true;
      this.$http.post('/api/ReMind/Task/addTask', qs.stringify({
        phone_str: phone,
        send_time: time,
        send_content: this.content
      })).then(r => {
        this.is_sending = false;
        if (r.code == 0) {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.initData();
        } else {
          this.$message({
            showClose: true,
            message: r.msg,
            type: 'error'
          });
        }
      }).catch(e => {
        this.is_sending = false;
        this.$message({
          showClose: true,
          message: '发生错误',
          type: 'error'
        });
      });
    },
    // 控制input在5min倍数
    transferInputTime() {
    },
  }
}
</script>
