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
  .app-header {
    box-shadow: 0 0 2px rgba(0,0,0,0.1);
    border-bottom: 1px solid #d4d4d4;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
  .main {
    position: absolute;
    top: 62px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: @main-background-color;
    .app-sidebar {
      background-color: #e7e7e7;
      width: 60px;
      height: 100%;
      line-height: 60px;
      float: left;
    }
    .wrapper {
      height: 100%;
      margin-left: 60px;
      position: relative;
      .content {
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
