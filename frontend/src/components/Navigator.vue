<template>
  <div id="navigator">
    <div class="img-bg"></div>
    <div class="img-container">
      <img src="@/assets/img/back-button.png" v-on:click="$emit('back')"/>
    </div>
    <div class="option-container">
      <div class="scrollbar-x-mask">
        <div class="overflow-y">
          <div class="options"><span
            class="option"
            v-for="(option, index) in options"
            v-bind:key="'select' + index"
            v-bind:class="{
              'option-selected': index === usedValue,
              'option-visible': navVisible
            }"
          >{{ option }}</span><div
            class="selecter"
            v-bind:style="{left, width}"
          ></div></div>
          <div id="option-computer" class="options" style="opacity: 0;"><span
            class="option"
            style="transition: none;"
            v-for="(option, index) in options"
            v-bind:key="'select-copy' + index"
            v-on:click="select(index)"
          >{{ option }}</span></div>
        </div>
      </div>
    </div>
    <div class="selecter-container"></div>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
  props: ['options', 'value', 'disabled', 'nav-visible'],
  data () {
    return {
      usedValue: this.value,
      left: '0',
      width: '0',
      copyList: null,
      inited: false
    }
  },
  watch: {
    navVisible () {
      if (this.navVisible) {
        this.flush()
      } else if (this.inited) {
        document.getElementById('option-computer')
          .getElementsByClassName('option-selected')[0].className = 'option'
      }
    }
  },
  created () {
    window.addEventListener('resize', this.flush)
  },
  updated () {
    if (!this.inited) {
      this.copyList = document.getElementById('option-computer').childNodes
      this.inited = true
    }
  },
  methods: {
    select (index) {
      this.usedValue = this.value
      if ((!this.disabled || !this.inited) && index !== this.usedValue) {
        if (index === -1) {
          index = this.usedValue
        } else {
          this.$emit('switch')
          setTimeout(() => {
            this.$emit('after-switch', this.usedValue)
          }, 200)
        }
        var target = this.copyList[index]
        this.$emit('input', index)
        this.copyList[this.usedValue].className = 'option'
        target.className = 'option option-selected'
        this.usedValue = index
        this.left = target.offsetLeft + 'px'
        this.width = target.clientWidth + 'px'
      }
    },
    flush () {
      this.select(-1)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.flush)
  }
}
</script>

<style scoped>
#navigator {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 1.77em;
  width: 500px;
  overflow: hidden;
}
@media screen and (max-width: 500px) {
  #navigator {
    width: 100%;
  }
}
.img-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background: linear-gradient(145deg, #a1dd93, #16a086);
}
.img-container {
  position: absolute;
  width: 2.4em;
  height: 100%;
  left: 0;
  top: 0;
}
img {
  position: absolute;
  top: 0.63em;
  left: 0.96em;
  width: 0.51em;
}
.option-container {
  position: absolute;
  left: 2.4em;
  right: 0;
  top: 0;
  height: 100%;
}
.scrollbar-x-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0.96em;
  bottom: 0;
  overflow: hidden;
}
.overflow-y {
  position: absolute;
  width: 100%;
  height: 5em;
  left: 0;
  top: 0;
  overflow-x: scroll;
}
.options {
  position: absolute;
  top: 0.57em;
  left: 0;
  height: 0.83em;
  line-height: 0.83em;
  white-space: nowrap;
  word-spacing: 0.12em;
}
.option {
  margin-right: 0.4em;
  cursor: default;
  display: inline-block;
  color: #fff;
  font-weight: bold;
  font-size: 0.55em;
  transition: font-size 0.1s linear, opacity 0.1s;
  opacity: 0;
}
.option-visible {
  opacity: 1;
}
.option:last-of-type {
  margin-right: 0;
}
.option-selected {
  margin-right: 0;
  font-size: 0.8em;
}
.option-selected + .option {
  margin-left: 0.4em;
}
.selecter {
  position: absolute;
  background-color: #fff;
  transition: width 0.1s linear, left 0.1s ease;
  left: 0;
  top: 1.02em;
  width: 0;
  height: 0.18em;
}
.selecter-container {
  width: 100%;
  height: 0.18em;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
