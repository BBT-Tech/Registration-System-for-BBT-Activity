// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './console.log'
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import Global from './global'

import App from './App'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$global = Global

router.beforeEach((() => {
  var isChecked = false
  return (to, from, next) => {
    if (!isChecked) {
      isChecked = true
      Vue.http.post(Global.urls.init()).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          data = data.data
          if (data.logined) {
            to.meta.logined = true
            to.meta.studentId = data.student_id
            to.meta.name = data.name
            // to.meta.isManager = true
            to.meta.isManager = data.is_manager
          }
        }
        if (to.fullPath === '/login') {
          if (to.meta.logined) {
            next({
              path: '/activity',
              replace: true
            })
          }
        } else {
          if (!to.meta.logined) {
            to.meta.loginToRedirect = true
            to.meta.loginRedirectPath = to.fullPath
            next({
              path: '/login',
              replace: true
            })
          } else if (to.fullPath.search(/^\/activity\/\d+\/edit$/) !== -1) {
            return Vue.http.post(Global.urls.queryA(), {
              type: 0,
              start_id: to.params.id,
              number: 1
            })
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
          data = data.data
          if (data.activities instanceof Array &&
            data.activities.length === 1 &&
            data.activities[0].id === Number(to.params.id)) {
            let activity = data.activities[0]
            let timeAccess = false
            if (activity.type === 0) {
              timeAccess = Global.compareDatetime(activity.action_time) > 0
            } else if (activity.type === 1) {
              timeAccess = Global.compareDatetime(activity.book_time) > 0
            }
            if (!(timeAccess && activity.is_publisher)) {
              return Promise.reject('你没有修改权限')
            }
          } else {
            return Promise.reject('活动不存在')
          }
        }
      }).catch(data => {
        if (data === 0) {
        } else if (typeof data === 'string') {
          alert(data)
        } else {
          alert('服务器发生错误')
          next({
            path: '/activity/' + to.params.id,
            replace: true
          })
        }
        next()
      })
    } else {
      next()
    }
  }
})())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
