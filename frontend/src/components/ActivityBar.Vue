<template>
  <div
    class="activity-bar"
    v-bind:class="{'activity-error': isError}"
    v-on:click="$root.$router.push('/activity/' + data.id)"
  >
    <div v-if="data.type === 0">
      <div>志愿活动标题：{{ data.title }}</div>
      <div>详情：{{ data.details }}</div>
      <div>志愿开始时间：{{ data.action_time }}</div>
      <div>已报名人数：{{ data.current_member }}/{{ data.member }}</div>
      <div
        class="activity-error-tip"
        v-if="$root.compareDatetime(data.action_time) < 0"
      >活动已开始，不予报名</div>
      <div
        class="activity-error-tip"
        v-else-if="data.member === data.current_member"
      >报名人数已满</div>
    </div>
    <div v-else-if="data.type === 1">
      <div>福利活动标题：{{ data.title }}</div>
      <div>详情：{{ data.details }}</div>
      <div>领取时间：{{ data.book_time }}</div>
      <div>已领取人数：{{ data.current_member }}/{{ data.award }}</div>
      <div
        class="activity-error-tip"
        v-if="$root.compareDatetime(data.book_time) >= 0"
      >领奖时间未到</div>
      <div
        class="activity-error-tip"
        v-else-if="data.award === data.current_member"
      >奖品已被领完</div>
      <div
        class="activity-error-tip"
        v-else-if="data.is_department_full"
      >所在部门领取人数已满</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityBar',
  props: ['data'],
  data () {
    return {
      usedData: this.data
    }
  },
  computed: {
    isError () {
      var data = this.usedData
      if (data.type === 0) {
        return data.member === data.current_member ||
          this.$root.compareDatetime(data.action_time) < 0
      } else if (data.type === 1) {
        return data.is_department_full ||
          data.award === data.current_member ||
          this.$root.compareDatetime(data.book_time) >= 0
      }
    }
  }
}
</script>

<style scoped>
.activity-bar {
  border: 1px solid #000000;
  background-color: #cccccc;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
}
.activity-error {
  background-color: #ffcccc;
}
.activity-error-tip {
  color: #ff0000;
}
</style>
