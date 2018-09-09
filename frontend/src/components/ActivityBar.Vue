<template>
  <div
    class="activity-bar"
    v-on:click="$emit('click')"
  >
    <div class="image">
      <img
        v-bind:src="$global.urls.imageSrc(data.image)"
        v-on:load="$event.target.nextSibling.style.opacity = '1'"
      /><div v-bind:style="{backgroundImage: 'url(' + $global.urls.imageSrc(data.image) + ')'}"></div>
    </div>
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="info time">
        <div v-if="data.type === 0">
          {{ data.action_time.slice(0, -3) }}
        </div>
        <div v-else-if="data.type === 1">
          {{ data.book_time.slice(0, -3) }}
        </div>
      </div>
      <div class="info member">
        <div v-if="data.type === 0">
          {{ data.current_member }}/{{ data.member }}
        </div>
        <div v-else-if="data.type === 1">
          {{ data.current_member }}/{{ data.award }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityBar',
  props: ['data']
}
</script>

<style scoped>
.image {
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 4.26667em;
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
  border-top-left-radius: 0.24em;
  border-bottom-left-radius: 0.24em;
}
.content {
  position: absolute;
  top: 0;
  left: 4.46667em;
  right: 0.2em;
  bottom: 0;
}
.title {
  padding: 0.4em 0 0.52em;
  height: 1em;
  line-height: 1em;
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 0.5em;
}
.info {
  margin-bottom: 0.26em;
  height: 0.5em;
  line-height: 0.5em;
  background-position: left;
  background-repeat: no-repeat;
  background-size: auto 100%;
  position: relative;
}
.time {
  background-image: url(../assets/img/clock-icon.png);
}
.member {
  background-image: url(../assets/img/member-icon.png);
}
.info > div {
  position: absolute;
  left: 2.28571em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.35em;
}
</style>
