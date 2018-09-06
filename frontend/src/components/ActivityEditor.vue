<template>
  <div>
    <button v-on:click="back">返回</button>
    <div v-if="loading">
      <div v-if="type === 0">类型：志愿者活动</div>
      <div v-else-if="type === 1">类型：福利活动</div>
      <div>标题：{{ title }}</div>
      <input-tips v-model="crn.details" v-bind:err-when="!isDetailsValid">
        <span slot="title">详情：</span>
        <span slot="tips">详情不能为空</span>
      </input-tips>
      <input-tips type="datetime-local" v-model="crn.time" v-bind:err-when="!isTimeValid">
        <span slot="title" v-if="type === 0">志愿开始时间：</span>
        <span slot="title" v-else-if="type === 1">福利领取时间：</span>
        <span slot="tips" v-if="crn.time === ''">时间信息不全</span>
        <span slot="tips" v-else>时间必须晚于当前</span>
      </input-tips>
      <input-tips type="number" v-model.number="crn.number" v-bind:err-when="!isNumberValid">
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
          <input-tips
            type="number"
            v-on:input="checkList(toSame(same = Number($event)))"
            v-bind:value="same"
            v-bind:err-when="!isSameValid"
          >
            <span slot="title">所有部门：</span>
            <span slot="tips">数量格式不正确</span>
          </input-tips>
        </div>
        <div v-else-if="inputType === 2">
          <div v-for="(j, i) in crn.numberList" v-bind:key="'inputList' + i">
            <input-tips
              type="number"
              v-on:input="checkList($set(crn.numberList, i, Number($event)))"
              v-bind:value="crn.numberList[i]"
              v-bind:err-when="crn.numberList[i] === '' ||
                crn.numberList[i] < 0 ||
                crn.numberList[i] % 1 !== 0"
            >
              <span slot="title">{{ $root.departmentList[i] }}：</span>
              <span slot="tips">数量格式不正确</span>
            </input-tips>
          </div>
        </div>
        <div class="error" v-if="isNumberValid && !isSumValid">限制总人数不小于奖品数</div>
      </div>
      <button v-if="edited && isValid && !saving" v-on:click="saveActivity">保存</button>
      <div v-if="saving">Loading...</div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import InputTips from './InputTips.vue'
export default {
  name: 'ActivityEditor',
  components: {'input-tips': InputTips},
  data () {
    return {
      id: 0,
      type: -1,
      title: '',
      inputType: 1,
      same: 0,
      isListEdited: false,
      prev: {
        details: '',
        time: '',
        number: 0,
        numberList: []
      },
      crn: {
        details: '',
        time: '',
        number: 0,
        numberList: []
      },
      loading: false,
      saving: false
    }
  },
  watch: {
    inputType () {
      var vm = this
      if (vm.inputType === 1) {
        vm.same = vm.crn.numberList[0]
        vm.toSame()
      }
    }
  },
  computed: {
    isDetailsValid () {
      return this.crn.details !== ''
    },
    isTimeValid () {
      return this.time !== '' &&
        this.$global.compareDatetime(this.crn.time + ':00') > 0
    },
    isNumberValid () {
      return this.crn.number > 0 &&
        this.crn.number % 1 === 0
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
        this.crn.numberList.forEach(value => {
          if (value !== '') {
            sum += value
          }
        })
      }
      return this.isNumberValid && sum >= this.crn.number
    },
    isValid () {
      var vm = this
      var isValid = vm.isDetailsValid &&
        vm.isTimeValid &&
        vm.isNumberValid
      if (!isValid) {
        return isValid
      }
      if (vm.type === 0) {
        return isValid
      } else if (vm.type === 1) {
        return isValid && vm.isSumValid
      }
    },
    edited () {
      var vm = this
      var edited = vm.crn.details !== vm.prev.details ||
        vm.crn.time !== vm.prev.time ||
        vm.crn.number !== vm.prev.number
      if (vm.type === 0) {
        return edited
      } else if (vm.type === 1) {
        return edited || vm.isListEdited
      }
    }
  },
  beforeCreate () {
    if (!this.$global.logined) {
      this.$root.$router.replace('/login')
    }
    if (!this.$global.isManager) {
      this.$root.$router.replace('/activity/' + this.$route.params.id)
    }
  },
  created () {
    if (this.$global.logined && this.$global.isManager) {
      this.checkActivity()
    }
  },
  methods: {
    toSame () {
      var vm = this
      vm.crn.numberList.forEach((value, index) => {
        vm.$set(vm.crn.numberList, index, vm.same)
      })
    },
    checkList () {
      var vm = this
      if (vm.type === 1) {
        let i
        for (i = 0; i < 10; i++) {
          if (vm.prev.numberList[i] !== vm.crn.numberList[i]) {
            vm.isListEdited = true
            return
          }
        }
      }
      vm.isListEdited = false
    },
    back () {
      this.$root.$router.push('/activity/' + this.$route.params.id)
    },
    saveActivity () {
      var vm = this
      var url, send
      vm.saving = true
      if (vm.type === 0) {
        url = '/api/publisher/modify/volunteer/' + vm.$route.params.id
        send = {
          details: vm.crn.details,
          action_time: vm.$root.inputToDatetime(vm.crn.time),
          member: vm.crn.number
        }
      } else if (vm.type === 1) {
        url = '/api/publisher/modify/award/' + vm.$route.params.id
        send = {
          details: vm.crn.details,
          book_time: vm.$root.inputToDatetime(vm.crn.time),
          award: vm.crn.number,
          member_list: vm.crn.numberList
        }
      }
      vm.$http.post(url, send).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
        } else if (data.err_code) {
          alert(data.err_msg)
        } else {
          vm.$root.$router.push('/activity/' + vm.$route.params.id)
        }
        vm.saving = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.saving = false
      })
    },
    checkActivity () {
      var vm = this
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
              timeAccess = vm.$global.compareDatetime(activity.action_time) > 0
            } else if (activity.type === 1) {
              timeAccess = vm.$global.compareDatetime(activity.book_time) > 0
            }
            if (!(timeAccess && activity.is_publisher)) {
              return Promise.reject('你没有修改权限')
            }
            vm.id = activity.id
            vm.type = activity.type
            vm.title = vm.title = activity.title
            vm.prev.details = vm.crn.details = activity.details
            if (vm.type === 0) {
              vm.prev.time = vm.crn.time = vm.$root.datetimeToInput(activity.action_time)
              vm.prev.number = vm.crn.number = activity.member
              return Promise.reject(0)
            } else if (vm.type === 1) {
              vm.prev.time = vm.crn.time = vm.$root.datetimeToInput(activity.book_time)
              vm.prev.number = vm.crn.number = activity.award
              return vm.$http.post('/api/department.php', {id: vm.id})
            }
          } else {
            return Promise.reject('活动不存在')
          }
        }
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          data = data.data
          vm.prev.numberList = data.member_list.slice()
          vm.crn.numberList = data.member_list.slice()
          let lastValue = data.member_list[0]
          let isSame = true
          for (let value of vm.crn.numberList) {
            if (lastValue !== value) {
              vm.inputType = 2
              isSame = false
              break
            }
            lastValue = value
          }
          if (isSame) {
            vm.same = data.member_list[0]
          }
          return Promise.reject(0)
        }
      }).catch(data => {
        if (data === 0) {
          vm.loading = true
          return
        } else if (typeof data === 'string') {
          alert(data)
        } else {
          alert('服务器发生错误')
        }
        vm.$root.$router.replace('/activity/' + vm.$route.params.id)
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
