<template>
  <div id="details-main">
    <div class="image">
      <img
        v-bind:src="$global.apis.imageSrc(data.image)"
        v-on:load="$event.target.nextSibling.style.opacity = '1'"
      /><div v-bind:style="{backgroundImage: 'url(' + $global.apis.imageSrc(data.image) + ')'}"></div>
    </div>
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="options" v-if="data.type === 0">
        <div><span>类型：</span>志愿者活动<div
          class="copy-button"
          v-bind:data-clipboard-text="copyValue"
        >
          <img src="@/assets/img/icon-copy.png"/>
          <div>复制活动链接</div>
        </div></div>
        <div><span>详情：</span>{{ data.details }}</div>
        <div><span>报名截止时间：</span>{{ data.action_time }}</div>
        <div><span>已报名人数：</span>{{ data.current_member }}/{{ data.member }}</div>
        <div><span>状态：</span><span
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
        <div><span>类型：</span>福利活动<div
          class="copy-button"
          v-bind:data-clipboard-text="copyValue"
        >
          <img src="@/assets/img/icon-copy.png"/>
          <div>复制活动链接</div>
        </div></div>
        <div><span>详情：</span>{{ data.details }}</div>
        <div><span>领取时间：</span>{{ data.book_time }}</div>
        <div><span>已领取人数：</span>{{ data.current_member }}/{{ data.award }}</div>
        <div><span>状态：</span><span
            v-if="data.registered"
          >已领取</span><span
            v-else-if="before"
          >领取时间未到</span><span
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
          v-bind:class="{'dis': regVDis}"
          v-if="data.type === 0"
          v-on:click="regVDis || register()"
        >
          <div class="text reg" v-if="!data.registered">报名</div>
          <div class="text del sml" v-else>取消报名</div>
        </div>
        <div
          class="button"
          v-bind:class="{'dis': regADis}"
          v-else-if="data.type === 1"
          v-on:click="regADis || register()"
        >
          <div class="text reg" v-if="!data.registered">领取</div>
          <div class="text del sml" v-else>放弃</div>
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
import ClipboardJS from 'clipboard'
export default {
  name: 'DetailsMain',
  props: ['data', 'before'],
  data () {
    return {
      registering: false,
      deleting: false,
      clipboard: null,
      copyValue: ''
    }
  },
  computed: {
    regVDis () {
      return this.registering || !this.before ||
        (this.data.member === this.data.current_member &&
        !this.data.registered)
    },
    regADis () {
      return this.registering || this.before ||
        (this.data.award === this.data.current_member &&
        !this.data.registered)
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('con-fade-in')
    }, 100)
    this.copyValue = location.href
    this.clipboard = new ClipboardJS('.copy-button')
    this.clipboard.on('success', e => {
      alert('复制成功')
    })
    this.clipboard.on('error', e => {
      alert('复制失败，换个浏览器试试吧')
    })
  },
  beforeDestroy () {
    this.clipboard.destroy()
  },
  methods: {
    register () {
      var vm = this
      if ((vm.data.type === 0 && !vm.before) ||
        (vm.data.type === 1 && vm.before)) {
        return
      }
      vm.registering = true
      if (vm.data.registered) {
        vm.$parent.simplePost(vm.$global.apis.unregister(vm.data.id), () => {
          vm.$parent.getDetails(() => {
            vm.registering = false
          })
        })
      } else {
        vm.$parent.simplePost(vm.$global.apis.register(vm.data.id), () => {
          vm.$parent.getDetails(() => {
            vm.registering = false
          })
        })
      }
    },
    delActivity () {
      if (confirm('确定删除这个活动？')) {
        var vm = this
        vm.deleting = true
        vm.$parent.simplePost(vm.$global.apis.delete(vm.data.id), () => {
          vm.$root.$router.replace('/activity')
        })
      }
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
.options > div > span:first-child {
  font-weight: bold;
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
  color: #2fab88;
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
.copy-button {
  display: inline-block;
  width: 7.65957em;
  height: 1.2766em;
  vertical-align: -20%;
  margin-left: 1em;
  background-color: #fff;
  border-radius: 0.53191em;
  box-shadow: 0.10638em 0.10638em 0.10638em rgba(0, 0, 0, 0.3);
  position: relative;
}
.copy-button > div {
  cursor: default;
  position: absolute;
  top: 50%;
  right: 0.43769em;
  height: 0.9em;
  transform: translateY(-50%);
  font-size: 0.9em;
  font-weight: bold;
  color: #515151;
  background-color: rgba(255, 0, 0, 0);
  line-height: 1em;
  letter-spacing: 0.07em;
}
.copy-button > img {
  position: absolute;
  top: 50%;
  left: 0.31915em;
  height: 1em;
  transform: translateY(-50%);
}
</style>
