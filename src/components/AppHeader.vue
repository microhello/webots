<template>
  <div class="app-header">
    <h1 class="header-title">{{ title }}</h1>
    <div class="header-search">
      <input type="text" placeholder="搜索关键词" />
      <i class="iconfont">&#xe620;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      title: '微信群助理机器人'
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.app-header {
  background-color: #fff;
  line-height: 60px;
  .header-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    font-weight: bold;
    padding: 0 20px;
  }
  .header-search {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    input[type=text] {
      height: 30px;
      border: 1px solid @main-border-color;
      border-radius: 15px;
      background-color: @main-background-color;
      outline: 0;
      padding: 0 45px 0 15px;
    }
    i {
      color: #707070;
      position: absolute;
      top: 50%;
      right: 15px;
      display: inline-block;
      line-height: normal;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
}
</style>
