<template>
  <ul class="app-sidebar">
    <li>
      <router-link to="/login" class="iconfont" tag="i">&#xe600;</router-link>
    </li>
    <li>
      <i class="iconfont">&#xe64c;</i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppSidebar',
  data () {
    return {
      title: '微信群营销机器人管理'
    }
  }
}
</script>

<style lang="less">
.app-sidebar {
  li {
    i {
      display: block;
      width: 30px;
      margin: 0 auto;
      font-size: 30px;
      color: #515151;
      cursor: default;
    }
  }
}
</style>
