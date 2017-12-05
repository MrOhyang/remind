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
    <div class="item-list-title">
      <span class="sp-sanjiao"></span>
      未提醒
    </div>
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <span class="sp-left">
          <el-checkbox v-model="checked"></el-checkbox>
        </span>
        <span class="sp-right">
          购买机票
        </span>
      </li>
    </ul>
  </div>

  <!-- 已提醒列表 -->
  <div class="item-list-wrapper">
    <div class="item-list-title">
      <span class="sp-sanjiao"></span>
      已提醒
    </div>
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <span class="sp-left">
          <el-checkbox checked="true"></el-checkbox>
        </span>
        <span class="sp-right">
          购买机票
        </span>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { text: '购买机票', checked: false },
        { text: '购买机票', checked: false },
        { text: '购买机票', checked: false }
      ]
    };
  },
  created() {
  },
  methods: {
  }
}
</script>
