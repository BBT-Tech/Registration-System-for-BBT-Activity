<template>
  <div id="image-inputer-box">
    <div class="image-bg">
      <img
        v-bind:src="$global.apis.imageSrc(realSrc)"
        v-on:load="$event.target.nextSibling.style.opacity = '1'"
      /><div
        v-if="!inputted"
        v-bind:style="{backgroundImage: 'url(' + $global.apis.imageSrc(realSrc) + ')'}"
      ></div>
    </div>
    <input
      id="image-inputer"
      type="file"
      accept="image/*"
      v-on:change="changeFile($event.target)"
    />
    <div
      class="image"
      v-bind:style="{backgroundImage: 'url(' + imageSrc + ')'}"
    ></div>
    <label
      v-if="!inputted"
      class="image"
      v-bind:class="{'cover': !first}"
      for="image-inputer"
    >
      <div
        class="info"
        v-bind:class="{'first': first}"
      >
        <slot name="before"></slot>
      </div>
    </label>
    <div
      v-else
      class="image cover"
      v-on:click="cancel"
    >
      <div class="info">
        <slot name="after"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageInputer',
  props: ['first', 'src'],
  data () {
    return {
      inputted: false,
      imageSrc: ''
    }
  },
  computed: {
    realSrc () {
      return this.first ? '' : this.src
    }
  },
  created () {
    this.$emit('change', '')
  },
  methods: {
    changeFile (target) {
      if (target.files.length > 0) {
        this.readImage(target.files[0]).then(src => {
          this.imageSrc = src
          this.$emit('change', target.files[0])
          this.inputted = true
        }).catch(msg => {
          target.value = ''
          alert(msg)
        })
      }
    },
    showImage (srcstr) {
      this.imageSrc = srcstr
    },
    cancel () {
      this.$emit('change', '')
      this.imageSrc = ''
      document.getElementById('image-inputer').value = ''
      this.inputted = false
    },
    readImage: (() => {
      var filter = {
        'jpeg': '/9j/4',
        'png': 'iVBORw'
      }
      function isImageValid (srcstr) {
        var pos = srcstr.indexOf(',') + 1
        for (let e in filter) {
          if (srcstr.indexOf(filter[e]) === pos) {
            return e
          }
        }
        return false
      }
      return function (file) {
        return new Promise((resolve, reject) => {
          if (file.size >= 1048576) {
            reject('图片大小应小于1MB')
          } else {
            var reader = new FileReader()
            reader.onload = () => {
              var srcstr = event.target.result
              if (isImageValid(srcstr)) {
                resolve(srcstr)
              } else {
                reject('图片格式应为.jpg或.png')
              }
            }
            reader.readAsDataURL(file)
          }
        })
      }
    })()
  }
}
</script>

<style scoped>
#image-inputer-box {
  cursor: default;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
}
#image-inputer {
  display: none;
}
.image {
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image-bg {
  background-color: #eee;
  width: 100%;
  height: 100%;
}
.image-bg > img {
  display: none;
}
.image-bg > div {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  opacity: 0;
  transition: opacity 0.8s;
}
.cover {
  background-color: rgba(0, 0, 0, 0.3);
}
.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8em;
  font-weight: bold;
}
.first {
  color: #a1de93;
}
</style>
