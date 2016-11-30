<template>
  <ul class="app-sidebar">
    <li class="brand">
      <img src="../assets/image/logo/01.png" />
    </li>
    <router-link to="/main/home" :class="{ 'active': currentPath === '/main/home' }" tag="li">
      <i class="iconfont nav-item">&#xe60a;</i>
      <span class="nav-item">首页</span>
    </router-link>
    <router-link to="/main/account" :class="{ 'active': currentPath === '/main/account' }" tag="li">
      <i class="iconfont nav-item">&#xe657;</i>
      <span class="nav-item">账号</span>
    </router-link>
    <router-link to="/main/messages" :class="{ 'active': currentPath === '/main/messages' }" tag="li">
      <i class="iconfont nav-item">&#xe84a;</i>
      <span class="nav-item">群消息</span>
    </router-link>
    <router-link to="/main/watcher" :class="{ 'active': currentPath === '/main/watcher' }" tag="li">
      <i class="iconfont nav-item">&#xe608;</i>
      <span class="nav-item">群值守</span>
    </router-link>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AppSidebar',
  computed: {
    currentPath () {
      return this.$route.path
    },
    ...mapState({
      tabs: state => state.tab.items
    })
  },
  methods: {
    ...mapMutations({
      setActiveTab: types.ACTIVE
    })
  },
  watch: {
    currentPath () {
      this.setActiveTab(this.tabs[0])
    }
  }
}
</script>

<style lang="less">
.app-sidebar {
  background-color: #22252c;
  li {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    color: #d1d1d1;
    font-size: 0;
    transition: all .2s;
    &.active {
      color: #fff;
      background: #161e21;
    }
    .nav-item {
      display: inline-block;
      vertical-align: middle;
    }
    i {
      font-size: 24px;
      width: 50px;
      text-align: center;
    }
    span {
      font-size: 14px;
    }
  }
  .brand {
    background-color: #187be0;
    position: relative;
    cursor: default;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 33px;
    }
  }
}
</style>
