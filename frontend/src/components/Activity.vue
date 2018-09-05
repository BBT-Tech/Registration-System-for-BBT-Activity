<template>
  <div id="activity">
    <div id="loading-con">
      <loading class="loading" number="5"/>
    </div>
    <query-nav
      v-bind:options="meta.queryTypes"
      v-bind:disabled="false"
      v-bind:nav-visible="navVisible"
      v-model="meta.value"
      v-on:back="meta.back()"
      v-on:switch="fadeOut"
      v-on:after-switch="meta.flush($event)"
    />
    <div id="query-con">
      <router-view
        v-bind:meta="meta"
        v-on:con-fade-in="fadeIn"
        v-on:con-fade-out="fadeOut"
        v-on:nav-fade-in="navVisible = true"
        v-on:nav-fade-out="navVisible = false"
      />
    </div>
  </div>
</template>

<script>
import Nav from './Navigator.vue'
import Con from './Content.vue'
import Loading from './Loading.vue'
export default {
  name: 'Activity',
  data () {
    return {
      meta: {
        queryTypes: 0,
        value: 0,
        back: null,
        flush: null
      },
      navVisible: false
    }
  },
  components: {
    'query-nav': Nav,
    'query-con': Con,
    'loading': Loading
  },
  methods: {
    fadeOut () {
      document.getElementById('query-con').style.opacity = ''
      document.getElementById('loading-con').style.opacity = ''
    },
    fadeIn () {
      document.getElementById('query-con').style.opacity = '1'
      document.getElementById('loading-con').style.opacity = '0'
    }
  }
}
</script>

<style scoped>
#activity {
  height: 100%;
}
#loading-con {
  z-index: -1;
  position: fixed;
  width: 100%;
  top: 2.1em;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.1s;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
#query-con {
  width: 100%;
  padding-top: 2.1em;
  opacity: 0;
  transition: opacity 0.1s;
}
</style>
