<template>
<div class="add-wrapper">

  <!-- 标题 -->
  <div class="add-title-wrapper">
    <em class="iconfont icon-arrow-left"></em>
    <h1>添加提醒</h1>
  </div>

  <!-- 日期选择 -->
  <!-- <div class="select-date-wrapper">
  </div> -->
  <dateSelector></dateSelector>

</div>
</template>

<script>
import dateSelector from '@/components/dateSelector.vue';
export default {
  components: {
    dateSelector
  }
}
</script>
