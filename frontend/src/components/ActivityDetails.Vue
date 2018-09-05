<template>
  <div>
    <div>
      <button v-on:click="back">返回</button>
      <div v-if="isActivityExist && !loading">
        <div v-if="data.type === 0">
          <h3>{{ data.title }}</h3>
          <div>类型：志愿者活动</div>
          <div>详情：{{ data.details }}</div>
          <div>志愿开始时间：{{ data.action_time }}</div>
          <div>已报名人数：{{ data.current_member }}/{{ data.member }}</div>
          <div>状态：<span
              v-if="data.registered"
            >已报名</span><span
              v-else-if="!timeAccess"
            >活动已开始，不予报名</span><span
              v-else-if="data.member === data.current_member"
            >报名人数已满</span><span
              v-else
            >可报名</span>
          </div>
          <button
            v-if="timeAccess &&
              data.member > data.current_member &&
              !data.registered"
            v-on:click="register"
          >报名</button>
          <div v-if="data.is_publisher">
            <button v-on:click="roll">随机取满</button>
            <button v-on:click="delActivity">删除</button>
            <button
              v-if="timeAccess"
              v-on:click="$root.$router.push('/activity/' + data.id + '/edit')"
            >编辑</button>
          </div>
        </div>
        <div v-else-if="data.type === 1">
          <h3>{{ data.title }}</h3>
          <div>类型：福利活动</div>
          <div>详情：{{ data.details }}</div>
          <div>领取时间：{{ data.book_time }}</div>
          <div>已领取人数：{{ data.current_member }}/{{ data.award }}</div>
          <div>状态：<span
              v-if="data.registered"
            >已领奖</span><span
              v-else-if="!timeAccess"
            >领奖时间未到</span><span
              v-else-if="data.award === data.current_member"
            >奖品已被领完</span><span
              v-else-if="data.is_department_full"
            >所在部门领取人数已满</span><span
              v-else
            >可领取</span>
          </div>
          <button
            v-if="timeAccess &&
              data.award > data.current_member &&
              !data.is_department_full &&
              !data.registered"
            v-on:click="register"
          >领取</button>
          <div v-if="data.is_publisher">
            <button v-on:click="delActivity">删除</button>
            <button
              v-if="!timeAccess"
              v-on:click="$root.$router.push('/activity/' + data.id + '/edit')"
            >编辑</button>
          </div>
        </div>
        <div v-if="$global.isManager">
          <button v-on:click="getFile">导出参与用户信息</button>
          <br/>
          <span
            v-for="queryType in queryTypes"
            v-bind:key="'queryDepartment' + queryType.type"
            class="button"
            v-bind:class="{'button-active': queryType.type === currentQueryType}"
            v-on:click="currentQueryType = queryType.type"
          >{{ queryType.name }}</span>
          <activity-department
            v-if="currentQueryType === 1"
            v-bind:data="data"
            v-on:fold="currentQueryType = 0"
          />
          <activity-user
            v-if="currentQueryType === 2"
            v-bind:data="data"
            v-on:fold="currentQueryType = 0"
          />
          <br/>
          <button
            v-if="currentQueryType !== 0"
            v-on:click="currentQueryType = 0"
          >收起</button>
        </div>
      </div>
      <div v-else-if="!isActivityExist && !loading">
        <h3>你访问的活动已被删除</h3>
      </div>
      <div v-else-if="loading">Loading...</div>
    </div>
    <!--activity-editor/-->
  </div>
</template>

<script>
import ActivityDepartment from './ActivityDepartment.vue'
import ActivityUser from './ActivityUser.vue'
export default {
  name: 'ActivityDetails',
  components: {
    'activity-department': ActivityDepartment,
    'activity-user': ActivityUser
  },
  data () {
    return {
      queryTypes: [
        {name: '各部门情况', type: 1},
        {name: '参与人信息', type: 2}
      ],
      currentQueryType: 0,
      isActivityExist: true,
      timeAccess: false,
      loading: false,
      data: {}
    }
  },
  watch: {
    '$route.params.id' () {
      this.getDetails()
    }
  },
  beforeCreate () {
    if (!this.$global.logined) {
      this.$root.$router.replace('/login')
    }
  },
  created () {
    if (this.$global.logined) {
      this.getDetails()
    }
  },
  methods: {
    back () {
      this.$emit('fade-out')
      this.$root.$router.push('/activity')
    },
    getDetails () {
      var vm = this
      vm.loading = true
      vm.$http.post('/api/get-activity.php', {
        type: 0,
        start_id: vm.$route.params.id,
        number: 1
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        } else {
          data = data.data
          vm.isActivityExist = data.activities instanceof Array &&
            data.activities.length === 1 &&
            data.activities[0].id === Number(vm.$route.params.id)
          if (vm.isActivityExist) {
            vm.data = data.activities[0]
            if (vm.data.type === 0) {
              vm.timeAccess = vm.$global.compareDatetime(vm.data.action_time) >= 0
            } else if (vm.data.type === 1) {
              vm.timeAccess = vm.$global.compareDatetime(vm.data.book_time) < 0
            }
          } else {
            vm.data = {}
          }
        }
        vm.$emit('fade-in')
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.$emit('fade-in')
        vm.loaing = false
      })
    },
    simplePost (route, fn) {
      var vm = this
      vm.$http.post(route + vm.data.id).then(data => {
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
      })
    },
    register () {
      var vm = this
      vm.simplePost('/api/user/register/', () => {
        vm.getDetails()
      })
    },
    roll () {
      var vm = this
      vm.simplePost('/api/publisher/roll/', () => {
        vm.getDetails()
      })
    },
    delActivity () {
      var vm = this
      vm.simplePost('/api/publisher/delete/', () => {
        vm.$root.$router.replace('/activity')
      })
    },
    getFile () {
      var vm = this
      vm.simplePost('/api/manager/download/')
    }
  }
}
</script>

<style>
button {
  margin: 3px;
}
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
