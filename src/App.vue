<template>
  <div id="app">
    <app-header class="app-header"></app-header>
    <div class="main clearfix">
      <app-sidebar class="app-sidebar"></app-sidebar>
      <div class="wrapper">
        <app-tab class="tab"></app-tab>
        <router-view class="content" v-show="tabs[0] === active"></router-view>
        <login v-for="item of NewAccountTabs" class="content" v-show="item === active" :key="item"></login>
        <search v-for="item of SearchTabs" class="content" v-show="item === active" :key="item"></search>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from './store/types'

const AppTab = resolve => require(['./components/AppTab'], resolve)
const AppHeader = resolve => require(['./components/AppHeader'], resolve)
const AppSidebar = resolve => require(['./components/AppSidebar'], resolve)
const Search = resolve => require(['./components/Search'], resolve)
const Login = resolve => require(['./views/Login'], resolve)

export default {
  name: 'App',
  computed: {
    NewAccountTabs () {
      return this.tabs.filter(item => item.type === 'new-account')
    },
    SearchTabs () {
      return this.tabs.filter(item => item.type === 'search')
    },
    ...mapState({
      tabs: state => state.tab.items,
      active: state => state.tab.active
    })
  },
  methods: {
    ...mapMutations({
      addTab: types.ADD_TAB,
      setActiveTab: types.ACTIVE
    })
  },
  components: {
    AppHeader,
    AppSidebar,
    AppTab,
    Login,
    Search
  },
  mounted () {
    this.addTab({
      title: '机器人',
      value: 'root',
      type: 'root'
    })
    this.setActiveTab(this.tabs[0])
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
