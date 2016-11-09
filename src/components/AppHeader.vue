<template>
  <div class="app-header">
    <h1 class="header-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      title: '微信群营销机器人管理'
    }
  }
}
</script>

<style lang="less">
.app-header {
  background-color: #fff;
  -webkit-box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  -moz-box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  .header-title {
    font-size: 20px;
    line-height: 60px;
    padding: 0 5%;
  }
}
</style>
