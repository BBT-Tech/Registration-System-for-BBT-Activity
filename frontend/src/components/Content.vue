<template>
  <div class="scroll-y-mask">
    <div class="overflow-x">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style scoped>
.scroll-y-mask {
  position: absolute;
  top: 2.1em;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.overflow-x {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  overflow-y: scroll;
}
.content {
  width: 50%;
}
</style>
