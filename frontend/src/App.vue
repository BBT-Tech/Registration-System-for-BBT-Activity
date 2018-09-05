<template>
  <div id="app">
    <router-view
      v-bind:style="{fontSize: appWidth + 'px'}"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      appWidth: undefined
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
    background: linear-gradient(145deg, #a1dd93, #16a086) fixed;
  }
  body {
    width: 100%;
    height: 100%;
  }
  input {
    border: none;
    outline: none;
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
</style>
