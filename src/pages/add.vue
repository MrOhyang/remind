<template>
<div class="add-wrapper">

  <!-- 标题 -->
  <div class="add-title-wrapper">
    <router-link to="/list" class="iconfont icon-arrow-left"></router-link>
    <h1>添加提醒</h1>
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
    <input type="time" class="input-time">
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
      content: ''
    };
  },
  components: {
    dateSelector
  },
  methods: {
    // 添加提醒事件
    addTask() {
      let phone = this.$store.state.user.phone,
          time = null;

      time = moment(this.$refs.date_selector.selected_day);

      // console.log(phone, time, this.content);
      return ;
      this.$http.post('/api/ReMind/Task/addTask', qs.stringify({
        phone_str: phone,
        send_time: '',
        send_content: this.content
      }));
    }
  }
}
</script>
