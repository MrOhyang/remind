<template>
<div class="list-page-wrapper">

  <!-- 顶部 -->
  <div class="list-page-header-wrapper">
    <i class="iconfont icon-list"></i>
    <h1>
      所有
    </h1>
    <em>
      <i class="iconfont icon-more"></i>
    </em>
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
          <el-checkbox v-model="item.checked"></el-checkbox>
        </span>
        <span class="sp-right">
          <p>购买机票</p>
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
          <el-checkbox v-model="item.checked"></el-checkbox>
        </span>
        <span class="sp-right">
          <p>购买机票</p>
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
        { text: '购买机票', checked: false, date: 1512462600 },
        { text: '购买机票', checked: false, date: 1512462900 },
        { text: '购买机票', checked: false, date: 1512463200 }
      ],
      old_list: [
        { text: '购买机票', checked: true, date: 1512461700 },
        { text: '购买机票', checked: true, date: 1512462000 },
        { text: '购买机票', checked: true, date: 1512462300 }
      ]
    };
  },
  computed: {
    list_date() {
      return this.list.map(item => {
        return moment.unix(item.date).format('HH:mm');
      });
    },
    old_list_date() {
      return this.old_list.map(item => {
        return moment.unix(item.date).format('HH:mm');
      });
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
