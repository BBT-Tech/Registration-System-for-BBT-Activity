<template>
  <div id="details-main">
    <div class="image">
      <img
        v-bind:src="data.image"
        v-on:load="$event.target.nextSibling.style.opacity = '1'"
      /><div v-bind:style="{backgroundImage: 'url(' + data.image + ')'}"></div>
    </div>
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="options" v-if="data.type === 0">
        <div>类型：志愿者活动</div>
        <div>详情：{{ data.details }}</div>
        <div>志愿开始时间：{{ data.action_time }}</div>
        <div>已报名人数：{{ data.current_member }}/{{ data.member }}</div>
        <div>状态：<span
            v-if="data.registered"
          >已报名</span><span
            v-else-if="!before"
          >活动已开始，不予报名</span><span
            v-else-if="data.member === data.current_member"
          >报名人数已满</span><span
            v-else
          >可报名</span>
        </div>
      </div>
      <div class="options" v-else-if="data.type === 1">
        <div>类型：福利活动</div>
        <div>详情：{{ data.details }}</div>
        <div>领取时间：{{ data.book_time }}</div>
        <div>已领取人数：{{ data.current_member }}/{{ data.award }}</div>
        <div>状态：<span
            v-if="data.registered"
          >已领奖</span><span
            v-else-if="before"
          >领奖时间未到</span><span
            v-else-if="data.award === data.current_member"
          >奖品已被领完</span><span
            v-else-if="data.is_department_full"
          >所在部门领取人数已满</span><span
            v-else
          >可领取</span>
        </div>
      </div>
      <div class="buttons">
        <div
          class="button"
          v-bind:class="{'dis': !before || registering}"
          v-if="data.type === 0"
          v-on:click="!before || registering || register()"
        >
          <div class="text reg" v-if="!data.registered">报名</div>
          <div class="text del sml" v-else>取消报名</div>
        </div>
        <div
          class="button"
          v-bind:class="{'dis': before || registering}"
          v-else-if="data.type === 1"
          v-on:click="before || registering || register()"
        >
          <div class="text reg" v-if="!data.registered">领奖</div>
          <div class="text del sml" v-else>放弃奖品</div>
        </div>
      </div>
      <div class="buttons" v-if="data.is_publisher">
        <div
          class="button"
          v-bind:class="{'dis': !before}"
          v-on:click="!before || editActivity()"
        >
          <div class="text edit">编辑</div>
        </div>
        <div
          class="button"
          v-on:click="deleting || delActivity()"
          v-bind:class="{'dis': deleting}"
        >
          <div class="text del">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsMain',
  props: ['data', 'before'],
  data () {
    return {
      registering: false,
      deleting: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('con-fade-in')
    }, 100)
  },
  methods: {
    foo (target) {
      console.log(target)
    },
    register () {
      var vm = this
      if ((vm.data.type === 0 && !vm.before) ||
        (vm.data.type === 1 && vm.before)) {
        return
      }
      vm.registering = true
      if (vm.data.registered) {
        vm.$parent.simplePost(vm.$global.urls.unregister(vm.data.id), () => {
          vm.$parent.getDetails(() => {
            vm.registering = false
          })
        })
      } else {
        vm.$parent.simplePost(vm.$global.urls.register(vm.data.id), () => {
          vm.$parent.getDetails(() => {
            vm.registering = false
          })
        })
      }
    },
    delActivity () {
      var vm = this
      vm.deleting = true
      vm.$parent.simplePost(vm.$global.urls.delete(vm.data.id), () => {
        vm.$root.$router.replace('/activity')
      })
    },
    editActivity () {
      if (this.before) {
        this.$root.$router.push('/activity/' + this.data.id + '/edit')
      }
    }
  }
}
</script>

<style scoped>
#details-main {
  width: 100%;
  padding-bottom: 0.001em;
}
.image {
  background-color: #eee;
  margin: auto;
  margin-top: 0.6em;
  margin-bottom: 0.6em;
  width: 420px;
  height: 236.25px;
}
.image > img {
  display: none;
}
.image > div {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  opacity: 0;
  transition: opacity 0.8s;
}
@media screen and (max-width: 420px) {
  .image {
    width: 100%;
    height: 56.25vw;
  }
}
.content {
  margin: 0 0.96em;
}
.title {
  font-size: 0.7em;
  font-weight: bold;
  color: #fff;
  line-height: 1em;
  margin-bottom: 0.17143em;
}
.options > div {
  font-size: 0.47em;
  color: #fff;
  line-height: 1.6383em;
  margin: 0.06494em 0;
}
.buttons {
  width: 100%;
  height: 0.86em;
  clear: both;
  margin: 0.4em 0 0.6em 0;
}
.button {
  cursor: default;
  float: left;
  width: 2.66em;
  height: 0.86em;
  margin-right: 0.6em;
  margin-left: 0;
  border-radius: 0.25em;
  box-shadow: 0.05em 0.05em 0.05em rgba(0, 0, 0, 0.3);
  background-color: #fff;
  position: relative;
}
.button.dis {
  background-color: #dcdcdc;
}
.button > .text {
  position: absolute;
  font-size: 0.58em;
  width: 100%;
  text-align: center;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button > .reg {
  color: #a1de93;
}
.button > .del {
  color: #ce938f;
}
.button > .edit {
  color: #6c6c6c;
}
.button > .sml {
  font-size: 0.53em;
}
</style>
