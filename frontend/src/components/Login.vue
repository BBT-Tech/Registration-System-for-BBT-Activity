<template>
  <div>
    <input-tips
      v-model="studentId"
      v-bind:err-when="!isIdValid"
    >
      <span slot="title">学号：</span>
      <span slot="tips">学号不符合格式</span>
    </input-tips>
    <input-tips
      type="password"
      v-model="password"
      v-bind:err-when="!isPswValid"
    >
      <span slot="title">密码：</span>
      <span slot="tips">密码不符合格式</span>
    </input-tips>
    <button
      v-on:click="login"
      v-if="isIdValid && isPswValid && !loading"
    >登录</button>
    <span v-if="loading">Loading...</span>
  </div>
</template>

<script>
import InputTips from './InputTips.vue'
export default {
  name: 'Login',
  components: {'input-tips': InputTips},
  data () {
    return {
      studentId: '',
      password: '',
      inputtingId: true,
      inputtingPsw: true,
      loading: false
    }
  },
  beforeCreate () {
    var vm = this
    if (vm.$root.logined) {
      vm.$root.$router.replace('/activity')
    }
  },
  mounted () {
    window.addEventListener('keydown', this.pressEnter)
  },
  computed: {
    isIdValid () {
      return this.studentId.search(/^\d{12}$/) !== -1
    },
    isPswValid () {
      return this.password !== ''
    }
  },
  methods: {
    login () {
      var vm = this
      vm.loading = true
      vm.$http.post('/api/login.php', {
        student_id: vm.studentId,
        password: vm.password
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code > 0) {
          alert(data.err_msg)
        } else if (data.err_code < 0) {
          if (confirm(data.err_msg)) {
            window.location.href = 'https://hemc.100steps.net/2013/bbter/users'
          }
        } else {
          data = data.data
          vm.$root.logined = true
          vm.$root.studentId = vm.studentId
          vm.$root.name = data.name
          vm.$root.isManager = data.is_manager
          window.removeEventListener('keydown', vm.pressEnter)
          vm.$root.$router.replace('/activity')
        }
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.loading = false
      })
    },
    pressEnter (e) {
      var vm = this
      if ((e.keyCode || e.charCode) === 13) {
        if (vm.isIdValid && vm.isPswValid) {
          vm.login()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrong {
  color: #ff0000;
}
input {
  border: 1px solid #000000;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
