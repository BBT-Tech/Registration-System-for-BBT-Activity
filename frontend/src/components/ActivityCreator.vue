<template>
  <div>
    <button v-on:click="$root.$router.push('/activity')">返回</button>
    <br/>
    活动类型：<select v-model.number="type">
      <option value="0">志愿者活动</option>
      <option value="1">福利活动</option>
    </select>
    <div v-if="type === 0 || type === 1">
      <input-tips v-model="title" v-bind:err-when="!isTitleValid">
        <span slot="title">标题：</span>
        <span slot="tips">标题不能为空</span>
      </input-tips>
      <input-tips v-model="details" v-bind:err-when="!isDetailsValid">
        <span slot="title">详情：</span>
        <span slot="tips">详情不能为空</span>
      </input-tips>
      <input-tips type="datetime-local" v-model="time" v-bind:err-when="!isTimeValid">
        <span slot="title" v-if="type === 0">志愿开始时间：</span>
        <span slot="title" v-else-if="type === 1">福利领取时间：</span>
        <span slot="tips" v-if="time === ''">时间信息不全</span>
        <span slot="tips" v-else>时间必须晚于当前</span>
      </input-tips>
      <input-tips type="number" v-model.number="number" v-bind:err-when="!isNumberValid">
        <span slot="title" v-if="type === 0">限制人数：</span>
        <span slot="title" v-else-if="type === 1">奖品总数：</span>
        <span slot="tips">数量格式不正确</span>
      </input-tips>
      <div v-if="type === 1">
        各部门人数限制：<select v-model.number="inputType">
          <option value="1">各部门相同</option>
          <option value="2">自定义</option>
        </select>
        <div v-if="inputType === 1">
          <input-tips type="number" v-model.number="same" v-bind:err-when="!isSameValid">
            <span slot="title">所有部门：</span>
            <span slot="tips">数量格式不正确</span>
          </input-tips>
        </div>
        <div v-else-if="inputType === 2">
          <div v-for="(j, i) in numberList" v-bind:key="'inputList' + i">
            <input-tips
              type="number"
              v-model.number="numberList[i]"
              v-bind:err-when="numberList[i] === '' ||
                numberList[i] < 0 ||
                numberList[i] % 1 !== 0"
            >
              <span slot="title">{{ $root.departmentList[i] }}：</span>
              <span slot="tips">数量格式不正确</span>
            </input-tips>
          </div>
        </div>
        <div class="error" v-if="isNumberValid && !isSumValid">限制总人数不小于奖品数</div>
      </div>
    </div>
    <button
      v-if="isValid && !loading"
      v-on:click="addActivity"
    >添加活动</button>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import InputTips from './InputTips.vue'
export default {
  name: 'ActivityCreator',
  props: ['meta'],
  components: {'input-tips': InputTips},
  data () {
    return {
      usedMeta: this.meta,
      type: -1,
      title: '',
      details: '',
      time: '',
      number: 0,
      inputType: 1,
      same: 0,
      numberList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      loading: false
    }
  },
  watch: {
    same () {
      var vm = this
      vm.numberList.forEach((value, index) => {
        vm.$set(vm.numberList, index, vm.same)
      })
    },
    inputType () {
      var vm = this
      if (vm.inputType === 1) {
        vm.same = vm.numberList[0]
      }
    }
  },
  computed: {
    isTitleValid () {
      return this.title !== ''
    },
    isDetailsValid () {
      return this.details !== ''
    },
    isTimeValid () {
      return this.time !== '' &&
        this.$global.compareDatetime(this.time + ':00') > 0
    },
    isNumberValid () {
      return this.number !== '' &&
        this.number > 0 &&
        this.number % 1 === 0
    },
    isSameValid () {
      return this.same >= 0 &&
        this.same % 1 === 0
    },
    isSumValid () {
      var sum = 0
      if (this.inputType === 1) {
        sum = this.same * 10
      } else if (this.inputType === 2) {
        this.numberList.forEach(value => {
          if (value !== '') {
            sum += value
          }
        })
      }
      return this.isNumberValid && sum >= this.number
    },
    isValid () {
      var isValid = this.isTitleValid && this.isDetailsValid && this.isTimeValid && this.isNumberValid
      if (!isValid) {
        return isValid
      }
      if (this.type === 0) {
        return isValid
      } else if (this.type === 1) {
        return isValid && this.isSumValid
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$emit('con-fade-out')
    setTimeout(() => {
      next()
    }, 100)
  },
  beforeCreate () {
    if (!this.$global.logined) {
      this.$root.$router.replace('/login')
    }
    if (!this.$global.isManager) {
      this.$root.$router.replace('/activity')
    }
  },
  created () {
    if (this.$global.logined && this.$global.isManager) {
      setTimeout(() => {
        this.usedMeta.queryTypes = ['发起活动']
        this.usedMeta.value = 0
        this.usedMeta.back = this.back
        this.usedMeta.flush = () => {}
      }, 100)
      setTimeout(() => {
        this.$emit('nav-fade-in')
      }, 200)
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('con-fade-in')
    }, 100)
  },
  methods: {
    back () {
      this.$root.$router.push('/activity')
    },
    addActivity () {
      var vm = this
      var url, send
      vm.loading = true
      if (vm.type === 0) {
        url = '/api/manager/publish/volunteer'
        send = {
          title: vm.title,
          details: vm.details,
          action_time: vm.$root.inputToDatetime(vm.time),
          member: vm.number
        }
      } else if (vm.type === 1) {
        url = '/api/manager/publish/award'
        send = {
          title: vm.title,
          details: vm.details,
          book_time: vm.$root.inputToDatetime(vm.time),
          award: vm.number,
          member_list: vm.numberList
        }
      }
      vm.$http.post(url, send).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        } else {
          vm.$root.$router.push('/activity/' + data.id)
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

<style scoped>
.error {
  color: #ff0000
}
</style>
