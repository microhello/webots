<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
const AppHeader = resolve => require(['./components/AppHeader'], resolve)

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style lang="less">
@import "./assets/less/base.less";
@import "./assets/less/reset.less";
@import "./assets/less/colors.less";
@import "./assets/fonts/iconfont.css";

#app {
  height: inherit;
  min-width: 700px;
  .main {
    width: 90%;
    max-width: 1100px;
    margin: 40px auto auto;
    background-color: #fff;
    border: 1px solid @main-border-color;
    overflow: hidden;
    .side-bar {
      float: left;
      width: 200px;
      margin-bottom: -9999px;
      padding-bottom: 9999px;
    }
    .side-content {
      margin-left: 200px;
      min-height: 600px;
    }
  }
}
</style>
