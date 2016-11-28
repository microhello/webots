<template>
  <ul class="app-sidebar">
    <li>
      <router-link to="/main/home" :class="{ 'active': currentPath === '/main/home' }">
        <i class="iconfont" style="transform: translateX(2px)">&#xe60a;</i>
        <p>首页</p>
      </router-link>
    </li>
    <li>
      <router-link to="/main/account" :class="{ 'active': currentPath === '/main/account' }">
        <i class="iconfont">&#xe657;</i>
        <p>账号</p>
      </router-link>
    </li>
    <li>
      <router-link to="/main/messages" :class="{ 'active': currentPath === '/main/messages' }">
        <i class="iconfont">&#xe84a;</i>
        <p>群消息</p>
      </router-link>
    </li>
    <li>
      <router-link to="/main" :class="{ 'active': currentPath === '/main' }">
        <i class="iconfont">&#xe608;</i>
        <p>群值守</p>
      </router-link>
    </li>
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
  li {
    text-align: center;
    line-height: normal;
    padding: 15px 0;
    a {
      cursor: pointer;
      color: #666;
      &.active {
        color: #169BD5;
      }
      i {
        display: inline-block;
        font-size: 30px;
      }
      p {
        display: inline-block;
      }
    }
  }
}
</style>
