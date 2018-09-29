<template>
  <div id="activity-creater">
    <div class="image">
      <input-image
        v-on:change="image = $event"
        v-bind:first="true"
      >
        <template slot="before">上传图片</template>
        <template slot="after">轻触取消上传</template>
      </input-image>
    </div>
    <div class="content">
      <input-tips type="select" v-model.number="type" v-bind:err-when="false">
        <template slot="title">活动类型：</template>
        <template slot="options">
          <option value="-1" disabled>请选择</option>
          <option value="0">志愿者活动</option>
          <option value="1">福利活动</option>
        </template>
      </input-tips>
      <div v-if="type === 0 || type === 1">
        <input-tips v-model="title" v-bind:err-when="!isTitleValid">
          <template slot="title">标题：</template>
          <span slot="err" v-if="title === ''">标题不能为空</span>
          <span slot="err" v-else>标题应不超过{{ $global.limits.titleMax }}字符</span>
        </input-tips>
        <input-tips v-model="details" v-bind:err-when="!isDetailsValid">
          <template slot="title">详情：</template>
          <span slot="cor" v-if="type === 0">建议包含活动开始时间</span>
          <span slot="err" v-if="details === ''">详情不能为空</span>
          <span slot="err" v-else>详情应不超过{{ $global.limits.detailsMax }}字符</span>
        </input-tips>
        <input-tips type="datetime-local" v-model="time" v-bind:err-when="!isTimeValid">
          <template slot="title">时间：</template>
          <span slot="cor" v-if="type === 0">输入报名截止时间</span>
          <span slot="cor" v-else-if="type === 1">输入领取时间</span>
          <span slot="err" v-if="time === ''">时间信息不全</span>
          <span slot="err" v-else>时间必须晚于当前</span>
        </input-tips>
        <input-tips type="number" v-model.number="number" v-bind:err-when="!isNumberValid">
          <span slot="title" v-if="type === 0">限制人数：</span>
          <span slot="title" v-else-if="type === 1">奖品总数：</span>
          <span slot="err">数量应为正整数</span>
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
              v-model.number="same"
              v-bind:err-when="!isSameValid"
            >
              <span slot="title">各个部门：</span>
              <span slot="err" v-if="!isNumberValid || isSumValid">数量应为正整数</span>
            </input-tips>
          </div>
          <div v-else-if="inputType === 2">
            <div v-for="(j, i) in numberList" v-bind:key="'inputList' + i">
              <input-tips
                type="number"
                v-model.number="numberList[i]"
                v-bind:err-when="!isPosInt(numberList[i])"
              >
                <span slot="title">{{ $global.departmentList[i] }}：</span>
                <span
                  slot="err"
                  v-if="i !== 9 || (!isNumberValid || isSumValid)"
                >数量应为正整数</span>
              </input-tips>
            </div>
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
        v-if="type !== -1"
        class="button"
        v-bind:class="{
          'button-dis': !isValid || loading
        }"
        v-on:click="!isValid || loading || addActivity()"
      >
        <div class="button-text">发 布</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputImage from './InputImage.vue'
import InputTips from './InputTips2.vue'
export default {
  name: 'ActivityCreator',
  props: ['meta'],
  components: {
    'input-tips': InputTips,
    'input-image': InputImage
  },
  data () {
    return {
      image: '',
      usedMeta: this.meta,
      type: -1,
      title: '',
      details: '',
      time: '',
      number: 0,
      inputType: 1,
      same: 0,
      numberList: [],
      loading: false,
      saved: false,
      id: 0
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
      return this.title !== '' && this.title.length <= this.$global.limits.titleMax
    },
    isDetailsValid () {
      return this.details !== '' && this.details.length <= this.$global.limits.detailsMax
    },
    isTimeValid () {
      return this.time !== '' &&
        this.$global.compareDatetime(this.time + ':00') > 0
    },
    isNumberValid () {
      return this.isPosInt(this.number)
    },
    isSameValid () {
      return this.isPosInt(this.same)
    },
    isSumValid () {
      var sum = 0
      if (this.inputType === 1) {
        sum = this.same * this.$global.departmentList.length
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
    if (to.name === 'Login') {
      next(false)
    }
    if (this.saved || (this.type === -1 && this.image === '') ||
      confirm('确定放弃当前工作？')) {
      this.$emit('con-fade-out')
      setTimeout(() => {
        next()
      }, 100)
    } else {
      next(false)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!to.meta.isManager) {
      next(false)
    } else {
      next()
    }
  },
  created () {
    this.$global.departmentList.forEach(value => {
      this.numberList.push(0)
    })
    setTimeout(() => {
      this.usedMeta.queryTypes = ['发起活动']
      this.usedMeta.value = 0
      this.usedMeta.back = this.back
      this.usedMeta.flush = () => {}
    }, 100)
    setTimeout(() => {
      this.$emit('nav-fade-in')
    }, 200)
  },
  mounted () {
    setTimeout(() => {
      this.$emit('con-fade-in')
    }, 100)
  },
  methods: {
    isPosInt (number) {
      return number !== '' &&
        number > 0 &&
        number % 1 === 0
    },
    back () {
      this.$root.$router.push('/activity')
    },
    addActivity () {
      var vm = this
      var url, send
      vm.loading = true
      if (vm.type === 0) {
        url = this.$global.apis.publishV()
        send = {
          title: vm.title,
          details: vm.details,
          action_time: vm.$global.inputToDatetime(vm.time),
          member: vm.number
        }
      } else if (vm.type === 1) {
        url = this.$global.apis.publishA()
        send = {
          title: vm.title,
          details: vm.details,
          book_time: vm.$global.inputToDatetime(vm.time),
          award: vm.number,
          member_list: vm.numberList
        }
      }
      vm.$http.post(url, send).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          vm.id = data.id
          if (vm.image !== '') {
            var fd = new FormData()
            fd.append('image', vm.image)
            return vm.$http.post(this.$global.apis.image(vm.id), fd)
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
          vm.$root.$router.replace('/activity/' + vm.id)
        } else if (typeof data === 'string') {
          alert(data)
        } else {
          alert('404！该服务暂时不可用')
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../assets/css/CreatorEditor.css';
</style>
