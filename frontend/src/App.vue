<template>
  <div id="app">
    <div id="global-bg"></div>
    <router-view
      class="main"
      v-bind:style="{fontSize: appWidth + 'px'}"
      v-bind:class="{'show': !loading}"
      v-on:main-fade-in="loading = false"
      v-on:main-fade-out="loading = true"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      appWidth: undefined,
      loading: true
    }
  },
  created () {
    this.flushSize()
    window.addEventListener('resize', this.flushSize)
  },
  methods: {
    flushSize () {
      var width = document.body.clientWidth
      if (width < 300) {
        width = 300
      } else if (width > 450) {
        width = 450
      }
      this.appWidth = width / 1080 * 100
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: '微软雅黑';
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
input {
  border: none;
  outline: none;
  -webkit-appearance: none;
}
#app {
  position: relative;
  margin: auto;
  width: 500px;
  height: 100%;
}
@media screen and (max-width: 500px) {
  #app {
    width: 100%;
  }
}
#global-bg {
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(145deg, #a1dd93, #16a086);
}
</style>
<style scoped>
.main {
  opacity: 0;
  transition: opacity 0.1s;
}
.main.show {
  opacity: 1;
}
</style>
