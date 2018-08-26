<template>
  <div>
    <button v-on:click="signout">退出</button>
    <button
      v-if="$root.isManager"
      v-on:click="$root.$router.push('/activity/publish')"
    >添加活动</button>
    <br/>
    <span
      v-for="queryType in queryTypes"
      v-if="queryType.type !== 3 || $root.isManager"
      v-bind:key="'queryActivity' + queryType.type"
      class="button"
      v-bind:class="{'button-active': currentQueryType === queryType.type}"
      v-on:click="flushActivity(queryType.type)"
    >{{ queryType.name }}</span>
    <br/>
    <activity-bar
      v-for="activity in activities"
      v-bind:key="'activity' + activity.id"
      v-bind:data="activity"
    />
    <button
      v-on:click="getActivity"
      v-if="!isQueryEnd && !loading"
    >查看更多</button>
    <span v-if="loading">Loading...</span>
  </div>
</template>

<script>
import ActivityBar from './ActivityBar.vue'
export default {
  name: 'Activity',
  components: {'activity-bar': ActivityBar},
  beforeCreate () {
    if (!this.$root.logined) {
      this.$root.$router.replace('/login')
    }
  },
  created () {
    if (this.$root.logined) {
      this.getActivity()
    }
  },
  data () {
    return {
      queryTypes: [
        {name: '所有活动', type: 0},
        {name: '未参与的', type: 1},
        {name: '我参与的', type: 2},
        {name: '我发起的', type: 3}
      ],
      currentQueryType: 0,
      currentStartId: 0,
      queryNumber: 5,
      isQueryEnd: true,
      loading: false,
      activities: []
    }
  },
  methods: {
    signout () {
      var vm = this
      vm.$http.post('/api/signout.php').then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        } else {
          vm.$root.logined = false
          vm.$root.studentId = ''
          vm.$root.name = ''
          vm.$root.isManager = false
          vm.$root.$router.replace('/login')
        }
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.saving = false
      })
    },
    getActivity () {
      var vm = this
      vm.loading = true
      vm.$http.post('/api/get-activity.php', {
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
          vm.activities = vm.activities.concat(data.activities)
          vm.currentStartId = data.activities.slice(-1)[0].id - 1
          vm.isQueryEnd = data.is_end
        }
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.saving = false
      })
    },
    flushActivity (queryType) {
      if (this.currentQueryType !== queryType) {
        this.currentQueryType = queryType
        this.activities = []
        this.currentStartId = 0
        this.isQueryEnd = true
        this.getActivity()
      }
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  color: #0000FF;
  text-decoration: underline;
  margin-left: 5px;
  margin-right: 5px;
}
.button-active {
  cursor: default;
  color: #000000;
  text-decoration: none;
}
</style>
