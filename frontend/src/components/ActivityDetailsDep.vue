<template>
  <div>
    <div class="content">
      <div class="button-export" v-on:click="getFile">
        <div>导出参与用户信息</div>
      </div>
      <div
        class="dep-part"
        v-for="(current, index) in data.current_member_list"
        v-bind:key="'dep' + index"
      >
        <div class="dep">
          <div
            class="text"
            v-if="data.type === 0"
          >{{ $global.departmentList[index] }}：{{ current }}</div><div
            class="text"
            v-else-if="data.type === 1"
          >{{ $global.departmentList[index] }}：{{ current }}/{{ data.member_list[index] }}</div><div
            v-if="current !== 0"
            class="dep-button"
            v-on:click="foldSwitch(index)"
          ><img src="@/assets/arrow.png" v-bind:class="{'opened': openedList[index]}"/></div>
        </div>
        <div v-if="openedList[index]">
          <div v-if="!loadingList[index]">
            <div
              class="info"
              v-for="(user, userIndex) in userList[index]"
              v-bind:key="index + 'user' + userIndex"
            >
              <div class="text">姓名：{{ user.name }}</div>
              <div class="text">学号：{{ user.student_id }}</div>
              <div class="text">手机：{{ user.tele }}</div>
            </div>
          </div>
          <div v-else>
            <div class="info loading">
              <div class="loading-box">
                <loading number="3"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  name: 'DetailsDep',
  props: ['data'],
  components: {'loading': Loading},
  data () {
    return {
      usedData: this.data,
      loading: true,
      openedList: [],
      loadingList: [],
      userList: []
    }
  },
  created () {
    this.$global.departmentList.forEach(() => {
      this.openedList.push(false)
      this.userList.push([])
      this.loadingList.push(false)
    })
  },
  mounted () {
    setTimeout(() => {
      this.$emit('con-fade-in')
    }, 100)
  },
  methods: {
    foldSwitch (dep) {
      if (this.openedList[dep]) {
        this.$set(this.openedList, dep, false)
      } else {
        this.$set(this.loadingList, dep, true)
        this.$set(this.openedList, dep, true)
        setTimeout(() => {
          this.getUserInfo(dep)
        }, 100)
      }
    },
    getUserInfo (dep) {
      var vm = this
      vm.$http.post('/api/get-department-user.php', {
        department: dep
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          return Promise.reject('服务器发生错误')
        } else if (data.err_code) {
          return Promise.reject(data.err_msg)
        } else {
          vm.$set(vm.userList, dep, data.data.users)
          vm.$set(vm.loadingList, dep, false)
        }
      }).catch(data => {
        console.log(data)
        if (data instanceof String) {
          alert(data)
        } else {
          alert('404！该服务暂时不可用')
        }
        vm.$set(vm.openedList, dep, false)
        vm.$set(vm.loadingList, dep, false)
      })
    },
    getFile () {
      var vm = this
      vm.$parent.simplePost('/api/manager/download/')
    }
  }
}
</script>

<style scoped>
.content {
  margin: 0 0.96em;
}
.button-export {
  margin: 0.4em 0;
  width: 5.2em;
  height: 0.92em;
  border-radius: 0.25em;
  box-shadow: 0.05em 0.05em 0.05em rgba(0, 0, 0, 0.3);
  background-color: #fff;
  position: relative;
}
.button-export > div {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: #a1de93;
  font-size: 0.6em;
  width: 100%;
  text-align: center;
}
.dep-part {
  margin-bottom: 0.6em;
}
.dep {
  height: 0.6em;
}
.dep > .text {
  display: inline-block;
  vertical-align: top;
  font-size: 0.6em;
  margin-right: 1em;
  height: 1em;
  line-height: 1em;
  font-weight: bold;
  color: #fff;
}
.dep-button {
  display: inline-block;
  vertical-align: top;
  height: 0.6em;
  width: 0.6em;
  border-radius: 0.05em;
  background-color: #fff;
  position: relative;
  box-shadow: 0.05em 0.05em 0.05em rgba(0, 0, 0, 0.3);
}
.dep-button > img {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 0.27em;
  width: 0.47em;
  transform: translate(-50%, -50%);
  transition: transform 0.2s;
}
.dep-button > img.opened {
  transform: translate(-50%, -50%) rotate(180deg);
}
.info {
  margin-top: 0.15em;
  padding: 0.15em 0;
  width: 100%;
  background-color: rgba(49, 49, 49, 0.4);
  border-radius: 0.05em;
  position: relative;
}
.info.loading {
  height: 1.75em;
}
.info > .text {
  font-size: 0.45em;
  margin: 0 0.33333em 0.33333em;
  height: 1em;
  line-height: 1em;
  color: #fff;
}
.info > .text:last-of-type {
  margin-bottom: 0;
}
.loading-box {
  position: absolute;
  height: 0.4em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
