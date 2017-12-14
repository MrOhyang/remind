<template>
<div class="list-page-wrapper">

  <!-- 顶部 -->
  <div class="list-page-header-wrapper">
    <i class="iconfont icon-list"></i>
    <h1>
      所有
    </h1>
    <router-link to="/add" class="add">添加</router-link>
    <!-- <em>
      <i class="iconfont icon-more"></i>
    </em> -->
  </div>

  <!-- 未提醒列表 -->
  <div class="item-list-wrapper">
    <div class="item-list-title" @click="list_folder = !list_folder">
      <span class="sp-sanjiao" :class="{ active: !list_folder }"></span>
      未提醒
    </div>
    <ul v-show="!list_folder">
      <li v-for="(item, i) in list" :key="i">
        <span class="sp-left">
          <el-checkbox v-model="item.checked" disabled></el-checkbox>
        </span>
        <span class="sp-right">
          <p>{{ item.content }}</p>
          <em class="em-time">{{ list_date[i] }}</em>
        </span>
      </li>
    </ul>
  </div>

  <!-- 已提醒列表 -->
  <div class="item-list-wrapper">
    <div class="item-list-title" @click="old_list_folder = !old_list_folder">
      <span class="sp-sanjiao" :class="{ active: !old_list_folder }"></span>
      已提醒
    </div>
    <ul v-show="!old_list_folder">
      <li v-for="(item, i) in old_list" :key="i">
        <span class="sp-left">
          <el-checkbox v-model="item.checked" disabled></el-checkbox>
        </span>
        <span class="sp-right">
          <p>{{ item.content }}</p>
          <em class="em-time">{{ old_list_date[i] }}</em>
        </span>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      list_folder: false,
      old_list_folder: false,
      list: [
        // { text: '购买机票', checked: false, send_time: 1512462600 },
        // { text: '购买机票', checked: false, send_time: 1512462900 },
        // { text: '购买机票', checked: false, send_time: 1512463200 }
      ],
      old_list: [
        // { text: '购买机票', checked: true, send_time: 1512461700 },
        // { text: '购买机票', checked: true, send_time: 1512462000 },
        // { text: '购买机票', checked: true, send_time: 1512462300 }
      ]
    };
  },
  computed: {
    list_date() {
      let now = moment();

      return this.list.map(item => {
        let time = moment.unix(item.send_time);
        let str = '';
        if (now.year() != time.year()) {
          str += String(time.year()).slice(2, 4) + '\/';
        }
        if (now.year() != time.year()
            || now.month() != time.month()
            || now.date() != time.date()) {
          str += (time.month() + 1) + '\/';
          str += time.date() + ' ';
        }
        str += time.format('HH:mm');
        return str;
      });
    },
    old_list_date() {
      let now = moment();

      return this.old_list.map(item => {
        let time = moment.unix(item.send_time);
        let str = '';
        if (now.year() != time.year()) {
          str += String(time.year()).slice(2, 4) + '\/';
        }
        if (now.year() != time.year()
            || now.month() != time.month()
            || now.date() != time.date()) {
          str += (time.month() + 1) + '\/';
          str += time.date() + ' ';
        }
        str += time.format('HH:mm');
        return str;
      });
    }
  },
  created() {
    this.getTaskList();
  },
  methods: {
    // 获取任务列表
    async getTaskList() {
      let r = null;
      try {
        r = await this.$http.get('/api/ReMind/Task/taskInfo', {
          params: {
            phone_str: this.$store.state.user.phone
          }
        });
      } catch (e) {
        this.$message({
          showClose: true,
          message: '发生错误',
          type: 'error'
        });
      }
      if (!r) return ;
      if (r.data.code == 0) {
        this.list = r.data.data.no_send.map(item => {
          return {
            content: item.content,
            send_time: item.send_time,
            checked: false
          };
        });
        this.old_list = r.data.data.has_send.map(item => {
          return {
            content: item.content,
            send_time: item.send_time,
            checked: true
          };
        });
      } else {
      }
    }
  }
}
</script>
