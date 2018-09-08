<template>
  <div>
    <div class="not-exist" v-if="!isActivityExist">
      你访问的活动已被删除
    </div>
    <details-main
      v-else-if="currentQueryType === 0 && inited"
      v-bind:data="data"
      v-bind:before="timeBefore"
      v-on:con-fade-in="$emit('con-fade-in')"
      v-on:con-fade-out="$emit('con-fade-out')"
    />
    <details-dep
      v-else-if="currentQueryType === 1 && inited"
      v-bind:data="depData"
      v-on:con-fade-in="$emit('con-fade-in')"
      v-on:con-fade-out="$emit('con-fade-out')"
    />
  </div>
</template>

<script>
import DetailsMain from './ActivityDetailsMain.vue'
import DetailsDep from './ActivityDetailsDep.vue'
export default {
  name: 'ActivityDetails',
  components: {
    'details-main': DetailsMain,
    'details-dep': DetailsDep
  },
  props: ['meta'],
  data () {
    return {
      usedMeta: this.meta,
      currentQueryType: 0,
      isActivityExist: true,
      timeBefore: false,
      data: {},
      depData: {},
      inited: false
    }
  },
  watch: {
    '$route.params.id' () {
      this.$emit('con-fade-out')
      this.getDetails()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$emit('con-fade-out')
    setTimeout(() => {
      next()
    }, 100)
  },
  beforeCreate () {
    if (!this.$global.logined) {
      this.$root.$router.replace('/login')
    }
  },
  created () {
    if (this.$global.logined) {
      this.getDetails()
      setTimeout(() => {
        this.usedMeta.queryTypes = ['活动详情']
        this.usedMeta.value = 0
        this.usedMeta.back = this.back
        this.usedMeta.flush = this.query
        if (this.$global.isManager) {
          this.usedMeta.queryTypes.push('各部门情况')
        }
      }, 100)
      setTimeout(() => {
        this.$emit('nav-fade-in')
      }, 200)
    }
  },
  methods: {
    back () {
      this.$root.$router.push('/activity')
    },
    query (type) {
      this.currentQueryType = type
      if (!this.ActivityExist) {
        setTimeout(() => {
          this.$emit('con-fade-in')
        }, 100)
      }
    },
    getDetails (fn) {
      var vm = this
      vm.$http.post(vm.$global.urls.queryA(), {
        type: 0,
        start_id: vm.$route.params.id,
        number: 1
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          data = data.data
          vm.isActivityExist = data.activities instanceof Array &&
            data.activities.length === 1 &&
            data.activities[0].id === Number(vm.$route.params.id)
          if (vm.isActivityExist) {
            vm.data = data.activities[0]
            if (vm.data.type === 0) {
              vm.timeBefore = vm.$global.compareDatetime(vm.data.action_time) > 0
            } else if (vm.data.type === 1) {
              vm.timeBefore = vm.$global.compareDatetime(vm.data.book_time) > 0
            }
            if (vm.$global.isManager) {
              return vm.$http.post(vm.$global.urls.queryD(vm.$route.params.id))
            }
          } else {
            vm.data = {}
          }
        }
        return Promise.reject(0)
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          vm.depData = data.data
          vm.$set(vm.depData, 'type', vm.data.type)
        }
        return Promise.reject(0)
      }).catch(data => {
        if (fn !== undefined) {
          fn()
        }
        if (data === 0) {
          setTimeout(() => {
            vm.$emit('con-fade-in')
          }, 100)
          vm.inited = true
        } else if (data instanceof String) {
          alert(data)
        } else {
          alert('404！该服务暂时不可用')
        }
      })
    },
    simplePost (route, fn) {
      var vm = this
      vm.$http.post(route).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        }
        if (fn !== undefined) {
          fn()
        }
      }).catch(data => {
        alert('404！该服务暂时不可用')
        if (fn !== undefined) {
          fn()
        }
      })
    }
  }
}
</script>

<style scoped>
.not-exist {
  margin: 0.6em 1.37143em 0;
  font-size: 0.7em;
  font-weight: bold;
  color: #fff;
  line-height: 1em;
}
</style>
