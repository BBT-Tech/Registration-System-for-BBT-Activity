<template>
  <div
    class="activity-bar"
    v-on:click="$emit('click')"
  >
    <div class="img" v-bind:style="imageUrl"></div>
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="info time">
        <div v-if="data.type === 0">
          {{ data.action_time.slice(0, -3) }}
        </div>
        <div v-else-if="data.type === 1">
          {{ data.book_time.slice(0, -3) }}
        </div>
      </div>
      <div class="info member">
        <div v-if="data.type === 0">
          {{ data.current_member }}/{{ data.member }}
        </div>
        <div v-else-if="data.type === 1">
          {{ data.current_member }}/{{ data.award }}
        </div>
      </div>
    </div>
    <!--div v-if="data.type === 0">
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
    </div-->
  </div>
</template>

<script>
export default {
  name: 'ActivityBar',
  props: ['data'],
  computed: {
    imageUrl () {
      return {
        backgroundImage: 'url(' +
        (this.data.image === '' ? this.$global.defaultImg : this.data.image) +
        ')'
      }
    }
  }
}
</script>

<style scoped>
.img {
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 4.26667em;
}
.content {
  position: absolute;
  top: 0;
  left: 4.46667em;
  right: 0.2em;
  bottom: 0;
}
.title {
  padding: 0.4em 0 0.52em;
  height: 1em;
  line-height: 1em;
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 0.5em;
}
.info {
  margin-bottom: 0.26em;
  height: 0.5em;
  line-height: 0.5em;
  background-position: left;
  background-repeat: no-repeat;
  background-size: auto 100%;
  position: relative;
}
.time {
  background-image: url(../assets/clock-icon.png);
}
.member {
  background-image: url(../assets/member-icon.png);
}
.info > div {
  position: absolute;
  left: 2.28571em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.35em;
}
</style>
