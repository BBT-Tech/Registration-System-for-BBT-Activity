<template>
  <div>
    <h4>参与用户列表</h4>
    <activity-user-bar
      v-for="(user, ord) in users"
      v-bind:key="'user' + ord"
      v-bind:data="user"
    />
    <div v-if="loading">Loading...</div>
    <button
      v-if="!loading && !isQueryEnd"
      v-on:click="getUserInfo"
    >查看更多</button>
    <div
      v-if="!loading && isQueryEnd && currentStartOrd === 0"
    >暂无用户参与</div>
  </div>
</template>

<script>
import ActivityUserBar from './ActivityUserBar.vue'
export default {
  name: 'ActivityUser',
  props: ['data'],
  components: {'activity-user-bar': ActivityUserBar},
  data () {
    return {
      currentStartOrd: 0,
      queryNumber: 3,
      isQueryEnd: true,
      loading: true,
      users: []
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      var vm = this
      vm.loading = true
      vm.$http.post('/api/get-user-info.php', {
        start_ord: vm.currentStartOrd,
        number: vm.queryNumber
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
          vm.$emit('fold')
        } else if (data.err_code) {
          alert(data.err_msg)
          vm.$emit('fold')
        } else {
          data = data.data
          vm.users = vm.users.concat(data.users)
          vm.currentStartOrd += data.users.length
          vm.isQueryEnd = data.is_end
        }
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.loading = false
      })
    }
  }
}
</script>
