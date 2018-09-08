<template>
  <div class="login">
    <div class="title-box">
      <div class="title">
        <div>百步梯</div>
        <div>福利报名系统</div>
      </div>
    </div>
    <div class="input-box">
      <input-tips
        class="login-input"
        v-model="studentId"
        v-bind:err-when="!isIdValid"
      >
        <template slot="title">学号</template>
        <div slot="tips">学号不符合格式</div>
      </input-tips>
      <input-tips
        class="login-input"
        type="password"
        v-model="password"
        v-bind:err-when="!isPswValid"
      >
        <template slot="title">密码</template>
        <div slot="tips">密码不能为空</div>
      </input-tips>
    </div>
    <div
      class="button"
      v-bind:class="{
        'button-dis': !isIdValid || !isPswValid || loading
      }"
      v-on:click="login"
    >
      <div class="button-text">登 录</div>
    </div>
  </div>
</template>

<script>
import InputTips from './InputTips1.vue'
export default {
  name: 'Login',
  components: {
    'input-tips': InputTips
  },
  data () {
    return {
      studentId: '',
      password: '',
      loading: false
    }
  },
  beforeCreate () {
    var vm = this
    if (vm.$global.logined) {
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
    },
    isValid () {
      return this.isIdValid && this.isPswValid
    }
  },
  methods: {
    login () {
      if (!this.isValid) {
        return
      }
      var vm = this
      vm.loading = true
      vm.$http.post(vm.$global.urls.login(), {
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
          vm.$global.logined = true
          vm.$global.studentId = vm.studentId
          vm.$global.name = data.name
          vm.$global.isManager = data.is_manager
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
.login {
  margin: auto;
  height: 100%;
  width: 70%;
  min-width: 225px;
}
.title-box {
  height: 30%;
  min-height: 5.2em;
  position: relative;
}
.title {
  position: absolute;
  left: 0;
  bottom: 1em;
  font-size: 1em;
  line-height: 1.2em;
  color: #ffffff;
  font-weight: bold;
}
.input-box {
  margin-bottom: 0.96em;
}
.button {
  cursor: default;
  margin: auto;
  box-shadow: 0.1em 0.1em 0.25em rgba(80, 80, 80, 0.5);
  background-color: #fff;
  width: 6em;
  height: 1.46em;
  border-radius: 0.73em;
  font-size: 0.72em;
  font-weight: bold;
  word-spacing: 0.25em;
  color: #9dd98b;
  position: relative;
}
.button-text {
  height: 1em;
  line-height: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button-dis {
  background-color: #e5e5e5;
}
</style>
