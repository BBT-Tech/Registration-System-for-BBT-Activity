<template>
  <div id="activity-home">
    <div id="activities">
      <div
        class="activity-bar"
        v-if="$route.meta.isManager && currentQueryType === 3"
        v-on:click="$root.$router.push('/activity/publish')"
      >
        <img id="add-icon" src="@/assets/img/add-icon.png"/>
        <div id="add-text-box">
          <div id="add-text">添加活动</div>
        </div>
      </div>
      <activity-bar
        class="activity-bar"
        v-for="activity in activities"
        v-bind:key="'activity' + activity.id"
        v-bind:data="activity"
        v-on:click="toDetails(activity.id)"
      />
      <div
        id="get-activity"
        v-on:click="getActivity(false)"
        v-if="!isQueryEnd"
      >
        <div class="get-activity-box" v-if="!loading">
          <div class="get-activity-text">加载更多</div><div class="get-activity-img"></div>
        </div>
        <div class="loading-box" v-else>
          <loading number="3"/>
        </div>
      </div>
    </div>
    <div class="center-tips" v-if="activities.length === 0">
      <div v-if="currentQueryType === 2">
        你还没有参加任何活动哦
      </div>
      <div v-else-if="currentQueryType === 3">
        空空如也<br/><span>╰(￣▽￣)╮</span>快发起活动吧
      </div>
      <div v-else>
        暂时还没有活动哦<br/>请耐心等待~
      </div>
    </div>
  </div>
</template>

<script>
import ActivityBar from './ActivityBar.vue'
import Loading from './Loading.vue'
export default {
  name: 'ActivityHome',
  props: ['meta'],
  components: {
    'activity-bar': ActivityBar,
    'loading': Loading
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'Login') {
      this.$emit('con-fade-out')
      setTimeout(() => {
        next()
      }, 100)
    } else {
      next()
    }
  },
  created () {
    this.getActivity(false)
    setTimeout(() => {
      this.usedMeta.queryTypes = ['所有', '未参与', '我参与']
      this.usedMeta.value = this.currentQueryType
      this.usedMeta.back = this.signOut
      this.usedMeta.flush = this.flushActivity
      if (this.$route.meta.isManager) {
        this.usedMeta.queryTypes.push('我发起')
      }
    }, 100)
    setTimeout(() => {
      this.$emit('nav-fade-in')
    }, 200)
  },
  data () {
    return {
      usedMeta: this.meta,
      currentQueryType: this.getCookieQueryType(),
      currentStartId: 0,
      queryNumber: 6,
      isQueryEnd: true,
      activities: [],
      loading: true
    }
  },
  methods: {
    getCookieQueryType () {
      var result = Number(this.$global.getCookie('query_type'))
      if (isNaN(result) || result % 1 !== 0 || result < 0 || result > 3) {
        return 0
      } else if (!this.$route.meta.isManager && result === 3) {
        return 0
      } else {
        return result
      }
    },
    signOut () {
      if (confirm('确定退出？')) {
        var vm = this
        vm.$global.removeCookie('query_type')
        vm.$http.post(vm.$global.urls.signout()).then(data => {
          data = data.body
          if (!(data instanceof Object)) {
            alert('服务器发生错误')
          } else if (data.err_code) {
            alert(data.err_msg)
          } else {
            vm.$route.meta.logined = false
            vm.$route.meta.studentId = ''
            vm.$route.meta.name = ''
            vm.$route.meta.isManager = false
            vm.$root.$router.replace('/login')
          }
        }).catch(data => {
          alert('404！该服务暂时不可用')
          vm.saving = false
        })
      }
    },
    getActivity (flushed, index) {
      var vm = this
      vm.loading = true
      if (flushed) {
        document.cookie = 'query_type=' + index
        vm.currentQueryType = index
        vm.currentStartId = 0
      }
      vm.$http.post(vm.$global.urls.queryA(), {
        type: vm.currentQueryType,
        start_id: vm.currentStartId,
        number: vm.queryNumber
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        } else {
          data = data.data
          if (flushed) {
            vm.currentQueryType = index
            vm.activities = []
            vm.currentStartId = 0
            vm.isQueryEnd = true
          }
          if (data.activities.length > 0) {
            vm.activities = vm.activities.concat(data.activities)
            vm.currentStartId = data.activities.slice(-1)[0].id - 1
          }
          vm.isQueryEnd = data.is_end
          setTimeout(() => {
            vm.$emit('con-fade-in')
          }, 100)
        }
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.saving = false
      })
    },
    flushActivity (index) {
      this.getActivity(true, index)
    },
    toDetails (id) {
      this.$root.$router.push('/activity/' + id)
    }
  }
}
</script>

<style scoped>
@import '../assets/css/CenterTips.css';
#activities {
  margin: 0 0.96em;
  padding-bottom: 0.6em;
}
.activity-bar {
  min-width: 8.88em;
  cursor: default;
  margin-top: 0.6em;
  width: 100%;
  height: 2.4em;
  border-radius: 0.24em;
  background-color: #fff;
  box-shadow: 0.1em 0.1em 0.25em rgba(80, 80, 80, 0.5);
  position: relative;
  color: #a1de93;
  overflow: hidden;
}
#add-icon {
  position: absolute;
  top: 22.5%;
  height: 38.3333%;
  left: 50%;
  transform: translateX(-50%);
}
#add-text-box {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  font-size: 2.4em;
}
#add-text {
  font-size: 0.16em;
}
#get-activity {
  margin-top: 0.9em;
  height: 0.6em;
  position: relative;
}
#get-activity > div {
  cursor: default;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.get-activity-box {
  height: 0.6em;
  top: 0;
  text-shadow: 0.1em 0.1em 0.1em rgba(80, 80, 80, 0.35);
}
.loading-box {
  height: 0.4em;
  top: 0.1em;
}
.get-activity-text {
  display: inline-block;
  vertical-align: top;
  height: 1em;
  line-height: 1em;
  color: #fff;
  font-size: 0.6em;
  font-weight: bold;
  margin-right: 0.33333em;
}
.get-activity-img {
  display: inline-block;
  vertical-align: top;
  background-image: url(../assets/img/down.png);
  background-position: 0 0.05em;
  background-size: auto 97.1831%;
  background-repeat: no-repeat;
  height: 0.71em;
  width: 0.64em;
}
</style>
