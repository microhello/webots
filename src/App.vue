<template>
  <div id="app">
    <router-view></router-view>
    <help></help>
  </div>
</template>

<script>
const Help = resolve => require(['./views/Help'], resolve)

export default {
  name: 'App',
  components: {
    Help
  }
}
</script>

<style lang="less">
@import "./assets/less/base.less";
@import "./assets/less/reset.less";
@import "./assets/less/colors.less";
@import "./assets/fonts/iconfont.css";

#app {
  height: 100%;
  min-width: 800px;
  position: relative;
}
</style>
