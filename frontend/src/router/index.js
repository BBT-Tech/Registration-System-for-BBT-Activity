import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const Activity = () => import('@/components/Activity')
const ActivityHome = () => import('@/components/ActivityHome')
const ActivityDetails = () => import('@/components/ActivityDetails')
const ActivityCreator = () => import('@/components/ActivityCreator')
const ActivityEditor = () => import('@/components/ActivityEditor')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/activity',
      component: Activity,
      children: [
        {
          path: '',
          name: 'ActivityHome',
          component: ActivityHome,
          meta: {
            queryTypes: ['所有', '我参与', '未参与']
          }
        },
        {
          path: 'publish',
          name: 'ActivityCreator',
          component: ActivityCreator,
          meta: {
            queryTypes: ['发起活动']
          }
        },
        {
          path: ':id/edit',
          name: 'ActivityEditor',
          component: ActivityEditor,
          meta: {
            queryTypes: ['修改活动']
          }
        },
        {
          path: ':id',
          name: 'ActivityDetails',
          component: ActivityDetails,
          meta: {
            queryTypes: ['活动详情', '各部门情况']
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
