<template>
    <div class="user-bar">
      <div>姓名：{{ data.name }}</div>
      <div>学号：{{ data.student_id }}</div>
      <div>部门：{{ data.department }}</div>
      <div>手机：{{ data.tele }}</div>
    </div>
</template>

<script>
export default {
  name: 'ActivityUserBar',
  props: ['data']
}
</script>

<style scoped>
.user-bar {
  border: 1px solid #000000;
  background-color: #ffffcc;
  cursor: default;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
