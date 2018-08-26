<template>
  <div>
    <slot name="title"></slot><input
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
.error {
  color: #ff0000;
}
</style>
