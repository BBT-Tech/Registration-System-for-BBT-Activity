import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const Activity = () => import('@/components/Activity')
const ActivityHome = () => import('@/components/ActivityHome')
const ActivityDetails = () => import('@/components/ActivityDetails')
const ActivityCreator = () => import('@/components/ActivityCreator')
const ActivityEditor = () => import('@/components/ActivityEditor')

Vue.use(Router)

const Meta = {
  logined: false,
  studengId: '',
  name: '',
  isManager: false
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: Meta
    },
    {
      path: '/activity',
      component: Activity,
      children: [
        {
          path: '',
          name: 'ActivityHome',
          component: ActivityHome,
          meta: Meta
        },
        {
          path: 'publish',
          name: 'ActivityCreator',
          component: ActivityCreator,
          meta: Meta
        },
        {
          path: ':id/edit',
          name: 'ActivityEditor',
          component: ActivityEditor,
          meta: Meta
        },
        {
          path: ':id',
          name: 'ActivityDetails',
          component: ActivityDetails,
          meta: Meta
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
