import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const Activity = () => import('@/components/Activity')
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
      path: '/activity/publish',
      name: 'ActivityCreator',
      component: ActivityCreator
    },
    {
      path: '/activity/:id/edit',
      name: 'ActivityEditor',
      component: ActivityEditor
    },
    {
      path: '/activity/:id',
      name: 'ActivityDetails',
      component: ActivityDetails
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
