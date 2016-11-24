<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./assets/less/base.less";
@import "./assets/less/reset.less";
@import "./assets/less/colors.less";
@import "./assets/fonts/iconfont.css";

#app {
  height: 100%;
  min-width: 700px;
  position: relative;
}
</style>
