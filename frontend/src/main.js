// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'

import App from './App'

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
    logined: false,
    studengId: '',
    name: '',
    isManager: false,
    departmentList: [
      '编辑部',
      '综合管理部',
      '综合新闻部',
      '外联部',
      '策划推广部',
      '节目部',
      '人力资源部',
      '技术部',
      '视频部',
      '视觉设计部'
    ]
  },
  router,
  components: {App},
  template: '<App/>',
  beforeCreate () {
    var vm = this
    vm.$http.post('/api/init.php').then(data => {
      data = data.body
      if (!(data instanceof Object)) {
        alert('服务器发生错误')
      } else if (data.err_code) {
        alert(data.err_msg)
      } else {
        data = data.data
        if (data.logined) {
          vm.logined = true
          vm.studentId = data.student_id
          vm.name = data.name
          vm.isManager = data.is_manager
        }
      }
      var path = vm.$router.history.current.path
      if (path === '/login') {
        if (vm.logined) {
          vm.$router.replace('/activity')
        }
      } else {
        if (!vm.logined) {
          vm.$router.replace('/login')
        } else if (path.search(/^\/activity\/\d+\/edit$/) !== -1) {
          vm.$http.post('/api/get-activity.php', {
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
              if (data.activities instanceof Array &&
                data.activities.length === 1 &&
                data.activities[0].id === Number(vm.$route.params.id)) {
                let activity = data.activities[0]
                let timeAccess = false
                if (activity.type === 0) {
                  timeAccess = vm.compareDatetime(activity.action_time) > 0
                } else if (activity.type === 1) {
                  timeAccess = vm.compareDatetime(activity.book_time) > 0
                }
                if (!(timeAccess && activity.is_publisher)) {
                  return Promise.reject('你没有修改权限')
                }
              } else {
                return Promise.reject('活动不存在')
              }
            }
          }).catch(data => {
            if (typeof data === 'string') {
              alert(data)
            } else {
              alert('服务器发生错误')
              vm.$router.replace('/activity/' + vm.$route.params.id)
            }
          })
        }
      }
      vm.$mount('#app')
    })
  },
  methods: {
    compareDatetime (datetime) {
      var now = new Date()
      var comparison = [
        [datetime.slice(0, 4), now.getFullYear()],
        [datetime.slice(5, 7), now.getMonth() + 1],
        [datetime.slice(8, 10), now.getDate()],
        [datetime.slice(11, 13), now.getHours()],
        [datetime.slice(14, 16), now.getMinutes()],
        [datetime.slice(17, 19), now.getSeconds()]
      ]
      for (let i = 0; i < 6; i++) {
        comparison[i][0] = Number(comparison[i][0])
        if (comparison[i][0] !== comparison[i][1]) {
          return comparison[i][0] - comparison[i][1]
        }
      }
      return 0
    },
    datetimeToInput (datetime) {
      return datetime.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}$/, '$1T$2')
    },
    inputToDatetime (input) {
      return input.slice(0, 10) + ' ' + input.slice(11) + ':00'
    }
  }
})
