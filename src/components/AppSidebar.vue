<template>
  <ul class="app-sidebar">
    <router-link to="/main/home" :class="{ 'active': currentPath === '/main/home' }" tag="li">
      <i class="iconfont nav-item">&#xe60a;</i>
      <span class="nav-item">首页</span>
    </router-link>
    <router-link to="/main/account" :class="{ 'active': currentPath === '/main/account' }" tag="li">
      <i class="iconfont nav-item">&#xe7bf;</i>
      <span class="nav-item">机器人</span>
    </router-link>
    <div class="app-sidebar-group">
      <router-link to="/main/messages" :class="{ 'active': currentPath === '/main/messages' }" tag="li">
        <i class="iconfont nav-item">&#xe66e;</i>
        <span class="nav-item">群消息</span>
      </router-link>
      <router-link to="/main/watcher" :class="{ 'active': currentPath === '/main/watcher' }" tag="li">
        <i class="iconfont nav-item">&#xe67b;</i>
        <span class="nav-item">群值守</span>
      </router-link>
      <router-link to="/main/mass" :class="{ 'active': currentPath === '/main/mass' }" tag="li">
        <i class="iconfont nav-item">&#xe68c;</i>
        <span class="nav-item">定向群发</span>
      </router-link>
    </div>
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
  background-color: #313947;
  padding: 15px;
  li {
    height: 40px;
    line-height: 40px;
    color: #ebebeb;
    background-color: #3d4656;
    margin-bottom: 10px;
    padding-left: 20%;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    font-size: 0;
    &.active {
      box-shadow: 0 2px 6px -1px rgba(0, 0, 0, .2);
      &::before {
        content: "";
        display: block;
        width: 3px;
        height: 100%;
        position: absolute;
        left: 0;
        background-color: #ebebeb;
      }
    }
    .nav-item {
      font-size: 12px;
      vertical-align: middle;
    }
    i {
      margin-right: 7.5%;
    }
  }
  .app-sidebar-group {
    margin-bottom: 10px;
    li {
      border-radius: 0;
      margin-bottom: 0;
    }
    li:first-of-type {
      border-radius: 5px 5px 0 0;
    }
    li:last-of-type {
      border-radius: 0 0 5px 5px;
    }
  }
}
</style>
