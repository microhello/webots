<template>
  <ul class="app-sidebar" :class="{ 'spread': spread }">
    <li class="brand">
      <i class="nav-item">
        <img src="../assets/image/logo/03.png" />
      </i>
      <span class="nav-item">
        <img src="../assets/image/logo/04.png" />
      </span>
    </li>
    <router-link to="/main/home" :class="{ 'active': currentPath === '/main/home' }" tag="li">
      <i class="iconfont nav-item">&#xe701;</i>
      <span class="nav-item">首页</span>
    </router-link>
    <router-link to="/main/account" :class="{ 'active': currentPath === '/main/account' }" tag="li">
      <i class="iconfont nav-item">&#xe657;</i>
      <span class="nav-item">机器人</span>
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
  props: {
    spreadSideBar: Boolean
  },
  computed: {
    spread () {
      return this.spreadSideBar
    },
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
  width: 50px;
  transition: width .2s;
  &.spread {
    width: 170px;
  }
  li {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #d1d1d1;
    font-size: 0;
    transition: all .2s;
    overflow: hidden;
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
      width: 120px;
    }
  }
  .brand {
    background-color: #187be0;
    cursor: default;
    height: 60px;
    line-height: 60px;
    .nav-item {
      font-size: 0;
      img {
        height: 20px;
        vertical-align: middle;
      }
    }
  }
}
</style>
