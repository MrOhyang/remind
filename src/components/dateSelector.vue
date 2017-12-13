<template>
<div class="date-selector-wrapper">

  <div class="row month-wrapper">
    十二月
  </div>

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
        <span :class="{active: day.active}" :key="i"
              @click="clickDay(day)">{{ day.num }}</span>
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
      current_year: null,  // 当前年
      current_month: null,  // 当前月

      selected_day: null,  // 选中的天
      selected_day_data: null,  // 选中的天的数据

      date_list: [],
    }
  },
  created() {
    this.initDay();
  },
  methods: {
    // 模拟数据
    initDay() {
      let first_day = moment();
      let num_max = 0;

      this.current_year = first_day.year();
      this.current_month = first_day.month();
      this.selected_day = moment();

      first_day.add(1 - first_day.date(), 'd');
      for (let i = 0, len = first_day.day(); i < len; i++) {
        this.date_list.push({
          is_empty: true
        });
      }
      while(first_day.month() == this.current_month) {
        let temp = {
          num: first_day.date(),
          time: moment(first_day)
        };
        if (first_day.month() == this.selected_day.month()
            && first_day.date() == this.selected_day.date()) {
          temp.active = true;
          this.selected_day_data = temp;
        }
        this.date_list.push(temp);
        first_day.add(1, 'd');
      }
    },
    // 选中当天
    clickDay(day) {
      console.log(day);
      if (this.selected_day.format('YYYY-MM-DD') == day.time.format('YYYY-MM-DD')) {
        return ;
      }
      this.selected_day_data.active = false;
      this.$set(day, 'active', true);
      this.selected_day = moment(day.time);
      this.selected_day_data = day;
    }
  }
}
</script>
