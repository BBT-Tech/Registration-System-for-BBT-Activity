<template>
  <div id="activity-editor">
    <div class="image">
      <input-image
        v-on:change="crn.image = $event"
        v-bind:first="false"
        v-bind:src="prev.image"
      >
        <template slot="before">轻触以修改</template>
        <template slot="after">轻触取消修改</template>
      </input-image>
    </div>
    <div class="content">
      <div class="uneditable">
        <div class="flex-title">
          <div class="title">活动类型：</div>
        </div>
        <div class="flex-value">
          <div class="value" v-if="type === 0">志愿者活动</div>
          <div class="value" v-else-if="type === 1">福利活动</div>
        </div>
      </div>
      <div class="uneditable">
        <div class="flex-title">
          <div class="title">标题：</div>
        </div>
        <div class="flex-value">
          <div class="value">{{ title }}</div>
        </div>
      </div>
      <input-tips v-model="crn.details" v-bind:err-when="!isDetailsValid">
        <template slot="title">详情：</template>
        <span slot="tips" v-if="crn.details === ''">详情不能为空</span>
        <span slot="tips" v-else>详情应不超过{{ $global.limits.detailsMax }}字符</span>
      </input-tips>
      <input-tips type="datetime-local" v-model="crn.time" v-bind:err-when="!isTimeValid">
        <template slot="title">时间：</template>
        <span slot="tips" v-if="crn.time === ''">时间信息不全</span>
        <span slot="tips" v-else>时间必须晚于当前</span>
      </input-tips>
      <input-tips type="number" v-model.number="crn.number" v-bind:err-when="!isNumberValid">
        <span slot="title" v-if="type === 0">限制人数：</span>
        <span slot="title" v-else-if="type === 1">奖品总数：</span>
        <span slot="tips" v-if="type === 0 && crn.number < prev.number">志愿人数不应减少</span>
        <span slot="tips" v-else>数量应为正整数</span>
      </input-tips>
      <div v-if="type === 1">
        <input-tips type="select" v-model.number="inputType" v-bind:err-when="false">
          <template slot="title">各部门人数限制：</template>
          <template slot="options">
            <option value="1">各部门相同</option>
            <option value="2">自定义</option>
          </template>
        </input-tips>
        <div v-if="inputType === 1">
          <input-tips
            type="number"
            v-on:input="checkList(toSame(same = Number($event)))"
            v-bind:value="same"
            v-bind:err-when="!isSameValid"
          >
            <span slot="title">各个部门：</span>
            <span slot="tips" v-if="!isNumberValid || isSumValid">数量应为正整数</span>
          </input-tips>
        </div>
        <div v-else-if="inputType === 2">
          <div v-for="(j, i) in crn.numberList" v-bind:key="'inputList' + i">
            <input-tips
              type="number"
              v-on:input="checkList($set(crn.numberList, i, Number($event)))"
              v-bind:value="crn.numberList[i]"
              v-bind:err-when="!isPosInt(crn.numberList[i])"
            >
              <span slot="title">{{ $global.departmentList[i] }}：</span>
              <span
                slot="tips"
                v-if="i !== 9 || (!isNumberValid || isSumValid)"
              >数量应为正整数</span>
            </input-tips>
          </div>
        </div>
      </div>
      <div
        class="sum-error"
        v-if="type === 1 && isNumberValid && !isSumValid"
      >限制总人数应不小于奖品数</div>
    </div>
    <div class="button-content">
      <div
        class="button"
        v-bind:class="{
          'button-dis': !edited || !isValid || loading
        }"
        v-on:click="!edited || !isValid || loading || saveActivity()"
      >
        <div class="button-text">保 存</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputTips from './InputTips2.vue'
import InputImage from './InputImage.vue'
export default {
  name: 'ActivityEditor',
  props: ['meta'],
  components: {
    'input-tips': InputTips,
    'input-image': InputImage
  },
  data () {
    return {
      usedMeta: this.meta,
      id: 0,
      type: -1,
      title: '',
      inputType: 1,
      same: 0,
      isListEdited: false,
      prev: {
        image: '',
        details: '',
        time: '',
        number: 0,
        numberList: []
      },
      crn: {
        image: '',
        details: '',
        time: '',
        number: 0,
        numberList: []
      },
      loading: false,
      saved: false
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
      return this.crn.details !== '' && this.crn.details.length <= this.$global.limits.detailsMax
    },
    isTimeValid () {
      return this.time !== '' &&
        this.$global.compareDatetime(this.crn.time + ':00') > 0
    },
    isNumberValid () {
      if (this.type === 0) {
        return this.isPosInt(this.crn.number) && this.crn.number >= this.prev.number
      } else if (this.type === 1) {
        return this.isPosInt(this.crn.number)
      }
    },
    isSameValid () {
      return this.isPosInt(this.same)
    },
    isSumValid () {
      var sum = 0
      if (this.inputType === 1) {
        sum = this.same * this.$global.departmentList.length
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
        vm.crn.number !== vm.prev.number ||
        vm.crn.image !== ''
      if (vm.type === 0) {
        return edited
      } else if (vm.type === 1) {
        return edited || vm.isListEdited
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Login') {
      next(false)
    }
    if (this.saved || !this.edited ||
      confirm('确定放弃当前更改？')) {
      this.$emit('con-fade-out')
      setTimeout(() => {
        next()
      }, 100)
    } else {
      next(false)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.meta.isManager) {
      next()
    } else {
      next(false)
    }
  },
  created () {
    this.checkActivity()
    setTimeout(() => {
      this.usedMeta.queryTypes = ['修改活动']
      this.usedMeta.value = 0
      this.usedMeta.back = this.back
      this.usedMeta.flush = () => {}
    }, 100)
    setTimeout(() => {
      this.$emit('nav-fade-in')
    }, 200)
  },
  methods: {
    isPosInt (number) {
      return number !== '' &&
        number > 0 &&
        number % 1 === 0
    },
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
        for (i = 0; i < this.$global.departmentList.length; i++) {
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
      vm.loading = true
      if (vm.type === 0) {
        url = vm.$global.apis.editV(vm.$route.params.id)
        send = {
          details: vm.crn.details,
          action_time: vm.$global.inputToDatetime(vm.crn.time),
          member: vm.crn.number
        }
      } else if (vm.type === 1) {
        url = vm.$global.apis.editA(vm.$route.params.id)
        send = {
          details: vm.crn.details,
          book_time: vm.$global.inputToDatetime(vm.crn.time),
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
          if (vm.crn.image !== '') {
            var fd = new FormData()
            fd.append('image', vm.crn.image)
            return vm.$http.post(vm.$global.apis.image(vm.id), fd)
          } else {
            return Promise.reject(0)
          }
        }
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          return Promise.reject(0)
        }
      }).catch(data => {
        vm.loading = false
        if (data === 0) {
          vm.saved = true
          vm.$root.$router.push('/activity/' + vm.$route.params.id)
        } else if (typeof data === 'string') {
          alert(data)
        } else {
          alert('404！该服务暂时不可用')
        }
      })
    },
    checkActivity () {
      var vm = this
      vm.$http.post(vm.$global.apis.queryA(), {
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
            vm.prev.image = activity.image
            if (vm.type === 0) {
              vm.prev.time = vm.crn.time = vm.$global.datetimeToInput(activity.action_time)
              vm.prev.number = vm.crn.number = activity.member
              return Promise.reject(0)
            } else if (vm.type === 1) {
              vm.prev.time = vm.crn.time = vm.$global.datetimeToInput(activity.book_time)
              vm.prev.number = vm.crn.number = activity.award
              return vm.$http.post(vm.$global.apis.queryD(vm.id))
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
          setTimeout(() => {
            vm.$emit('con-fade-in')
          }, 100)
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
@import '../assets/css/CreatorEditor.css';
.uneditable {
  display: flex;
  width: 100%;
  margin-bottom: 0.6em;
}
.flex-title {
  flex-shrink: 0;
}
.title {
  color: #fff;
  font-size: 0.6em;
  font-weight: bold;
  height: 1em;
  line-height: 1em;
  padding: 0.25em 0;
}
.flex-value {
  color: #fff;
  width: 100%;
  flex-shrink: 1;
  padding: 0.07em 0;
}
.value {
  width: 100%;
  font-size: 0.6em;
  line-height: 1.266667em;
  word-wrap: break-word;
}
</style>
