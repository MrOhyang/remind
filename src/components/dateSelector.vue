<template>
<div class="date-selector-wrapper">
  <!-- 星期 -->
  <div class="row week-title-wrapper">
    <span>日</span>
    <span>一</span>
    <span>二</span>
    <span>三</span>
    <span>四</span>
    <span>五</span>
    <span>六</span>
  </div>
  <!-- 日子 -->
  <div class="row day-wrapper">
    <template v-for="(day, i) in date_list">
      <template v-if="day.is_empty">
        <span :key="i"></span>
      </template>
      <template v-else>
        <span :key="i">{{ day.num }}</span>
      </template>
    </template>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      date_list: []
    }
  },
  created() {
    this.mockData();
  },
  methods: {
    // 模拟数据
    mockData() {
      let first_day = moment();
      let num_max = 0;

      first_day.add(1 - first_day.date(), 'd');
      for (let i = 0, len = first_day.day(); i < len; i++) {
        this.date_list.push({
          is_empty: true
        });
      }
      num_max = first_day.add(1, 'M').add(-1, 'd').date();
      for (let i = 1, len = num_max; i <= len; i++) {
        this.date_list.push({
          num: i
        });
      }
    }
  }
}
</script>
