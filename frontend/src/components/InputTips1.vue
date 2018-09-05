<template>
  <div class="input-tips">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:type="type"
      v-on:focus="inputting = true"
      v-on:blur="inputting = false"
      spellcheck="false"
    />
    <div class="error">
      <slot name="tips" v-if="!inputting && errWhen"></slot>
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
  font-size: 1em;
  height: 3em;
}
.title {
  color: #fff;
  font-size: 0.72em;
  font-weight: bold;
}
input {
  width: 98%;
  height: 0.96em;
  font-size: 0.72em;
  border-radius: 0.25em;
  padding: 0.25em 1%;
}
.error {
  color: rgba(255, 0, 0, 0.6);
  font-size: 0.5em;
  font-weight: bold;
}
</style>
