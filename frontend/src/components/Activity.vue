<template>
  <div id="activity">
    <div id="loading-con" v-bind:class="{'hidden': !loading}">
      <loading class="loading" number="5"/>
    </div>
    <query-nav
      v-bind:options="meta.queryTypes"
      v-bind:disabled="false"
      v-bind:nav-visible="navVisible"
      v-model="meta.value"
      v-on:back="meta.back()"
      v-on:switch="loading = true"
      v-on:after-switch="meta.flush($event)"
    />
    <div id="query-con" v-bind:class="{'visible': !loading}">
      <router-view
        v-bind:meta="meta"
        v-on:con-fade-in="loading = false"
        v-on:con-fade-out="loading = true"
        v-on:nav-fade-in="navVisible = true"
        v-on:nav-fade-out="navVisible = false"
      />
    </div>
  </div>
</template>

<script>
import Nav from './Navigator.vue'
import Loading from './Loading.vue'
export default {
  name: 'Activity',
  components: {
    'query-nav': Nav,
    'loading': Loading
  },
  data () {
    return {
      meta: {
        queryTypes: 0,
        value: 0,
        back: null,
        flush: null
      },
      navVisible: false,
      loading: true
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name !== from.name) {
        this.navVisible = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!to.meta.logined) {
      next({
        path: '/login',
        replace: true
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Login') {
      if (to.meta.logined) {
        next(false)
      } else {
        this.$emit('main-fade-out')
        setTimeout(() => {
          next()
        }, 200)
      }
    } else {
      next()
    }
  },
  created () {
    setTimeout(() => {
      this.$emit('main-fade-in')
    }, 200)
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
#loading-con.hidden {
  opacity: 0;
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
#query-con.visible {
  opacity: 1;
}
</style>
