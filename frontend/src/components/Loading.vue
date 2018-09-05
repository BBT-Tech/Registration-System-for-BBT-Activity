<template>
  <div class="loading">
    <div
      class="ball-container"
      v-for="i in Number(number)"
      v-bind:key="'ball' + i"
    >
      <div
        class="ball"
        v-bind:style="{animationDelay: - i / 10 + 's'}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['number']
}
</script>

<style scoped>
.loading {
  height: 0.4em;
}
.ball-container {
  width: 0.4em;
  height: 0.4em;
  display: inline-block;
  margin-left: 0.4em;
  position: relative;
  vertical-align: top;
}
.ball-container:first-child {
  margin-left: 0;
}
.ball {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0em;
  width: 0em;
  border-radius: 50%;
  animation: loading 0.5s infinite;
  background-color: #fff;
}
@keyframes loading {
  0% {height: 0; width: 0;}
  50% {height: 0.4em; width: 0.4em;}
  100% {height: 0; width: 0;}
}
</style>
