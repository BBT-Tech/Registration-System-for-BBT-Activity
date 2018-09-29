<template>
  <div class="input-tips">
    <div class="flex-title">
      <div class="title">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="flex-input">
      <div class="input-box">
        <input
          v-if="type !== 'select'"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          v-bind:type="type"
          v-on:focus="inputting = true"
          v-on:blur="inputting = false"
          spellcheck="false"
        />
        <select
          v-else
          v-bind:value="value"
          v-on:change="$emit('input', $event.target.value)"
        >
          <slot name="options"></slot>
        </select>
        <div class="select-image" v-if="type === 'select'"></div>
      </div>
      <div v-if="errWhen">
        <div class="tips cor" v-if="inputting">
          <slot name="cor"></slot>
        </div>
        <div class="tips err" v-else>
          <slot name="err"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputTips',
  props: ['value', 'type', 'errWhen'],
  data () {
    return {
      inputting: true
    }
  }
}
</script>

<style scoped>
.input-tips {
  display: flex;
  width: 100%;
  height: 1.5em;
  margin-bottom: 0.2em;
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
.flex-input {
  width: 100%;
  flex-shrink: 1;
  height: 1.5em;
}
.input-box {
  display: flex;
  width: 100%;
  height: 0.9em;
  position: relative;
}
.input-box > input, .input-box > select {
  flex-grow: 1;
  width: 100%;
  outline: none;
  background: transparent;
  font-size: 0.6em;
  border: 0.133333em solid #fff;
  border-radius: 0.416667em;
  color: #fff;
  white-space: nowrap;
}
input {
  height: 1em;
  line-height: 1em;
  padding: 0.116667em;
}
input[type=datetime-local] {
  appearance: none;
}
input[type=datetime-local]::-webkit-inner-spin-button {
  visibility: hidden;
}
input[type=datetime-local]::-webkit-clear-button {
  visibility: hidden;
}
select {
  appearance: none;
  line-height: 1.3em;
  padding: 0 1.366667em 0 0.116667em;
}
.select-image {
  z-index: -1;
  position: absolute;
  right: 0;
  top: 0;
  height: 0.9em;
  width: 0.9em;
  background-image: url(../assets/img/icon-unfold.png);
  background-position: center;
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-size: 0.56em auto;
}
.tips {
  font-size: 0.45em;
  font-weight: bold;
  position: relative;
  top: -0.1em;
}
.tips.err {
  color: rgba(255, 0, 0, 0.6);
}
.tips.cor {
  color: rgba(255, 255, 255, 0.6);
}
</style>
