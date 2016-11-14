<template>
  <div id="app">
    <app-header></app-header>
    <div class="content clearfix">
      <app-sidebar class="app-sidebar"></app-sidebar>
      <router-view class="main"></router-view>
    </div>
  </div>
</template>

<script>
const AppHeader = resolve => require(['./components/AppHeader'], resolve)
const AppSidebar = resolve => require(['./components/AppSidebar'], resolve)

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar
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
  min-width: 700px;
  position: relative;
  .content {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    // background-image: url(./assets/image/background/01.png);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
    background-color: @main-background-color;
    .app-sidebar {
      background-color: rgba(255, 255, 255, .5);
      width: 60px;
      height: 100%;
      line-height: 60px;
      float: left;
    }
    .main {
      height: 100%;
      margin-left: 60px;
      overflow: hidden;
    }
  }
}
</style>
