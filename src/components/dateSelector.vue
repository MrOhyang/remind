<template>
<div class="date-selector-wrapper">

  <div class="row month-wrapper">
    <span class="iconfont icon-arrow-left-circle"
          @click="nextMonth(-1)"></span>
    {{ title }}
    <span class="iconfont icon-arrow-right-circle"
          @click="nextMonth(1)"></span>
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
  computed: {
    title() {
      let str = 
        this.current_year + ' '
        + ['一', '二', '三', '四',
           '五', '六', '七', '八',
           '九', '十', '十一', '十二'][this.current_month]
        + '月';
      return str;
    }
  },
  created() {
    let now = moment();

    this.current_year = now.year();
    this.current_month = now.month();
    this.selected_day = now;
    this.initDay();
  },
  methods: {
    // 模拟数据
    initDay() {
      let str = this.current_year + '-';
      if ((this.current_month + 1) < 10) {
        str += '0';
      }
      str += (this.current_month + 1) + '-01 00:00:00';
      console.log(str);
      let first_day = moment(str);
      console.log(first_day);
      let num_max = 0;

      first_day.add(1 - first_day.date(), 'd');
      this.date_list = [];
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
    },
    // 进入上一个月或者下一个月
    nextMonth(diff) {
      this.current_month += diff;
      if (this.current_month == -1) {
        this.current_month = 11;
        this.current_year--;
      } else if (this.current_month == 12) {
        this.current_month = 0;
        this.current_year++;
      }
      this.initDay();
    }
  }
}
</script>
