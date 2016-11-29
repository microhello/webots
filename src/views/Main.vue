<template>
  <div class="main clearfix">
    <app-header class="app-header"></app-header>
    <div class="container clearfix">
      <app-sidebar class="app-sidebar"></app-sidebar>
      <div class="wrapper">
        <app-tab class="tab"></app-tab>
        <router-view class="content" v-show="tabs[0] === active"></router-view>
        <login v-for="item of NewAccountTabs" class="content" v-show="item === active" :key="item"></login>
        <search v-for="item of SearchTabs" class="content" v-show="item === active" :key="item" :keywords="item.value"></search>
        <member v-for="item of MemberTabs" class="content" v-show="item === active" :key="item"></member>
        <contact v-for="item of ContactTabs" class="content" v-show="item === active" :key="item"></contact>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import * as types from '../store/types'

const AppTab = resolve => require(['../components/AppTab'], resolve)
const AppHeader = resolve => require(['../components/AppHeader'], resolve)
const AppSidebar = resolve => require(['../components/AppSidebar'], resolve)
const Search = resolve => require(['../components/Search'], resolve)
const Member = resolve => require(['../components/Member'], resolve)
const Contact = resolve => require(['../components/Contact'], resolve)

export default {
  name: 'Main',
  computed: {
    NewAccountTabs () {
      return this.tabs.filter(item => item.type === 'new-account')
    },
    SearchTabs () {
      return this.tabs.filter(item => item.type === 'search')
    },
    MemberTabs () {
      return this.tabs.filter(item => item.type === 'member')
    },
    ContactTabs () {
      return this.tabs.filter(item => item.type === 'contact')
    },
    ...mapState({
      tabs: state => state.tab.items,
      active: state => state.tab.active
    })
  },
  methods: {
    ...mapMutations({
      addTab: types.ADD_TAB,
      delTab: types.DEL_TAB,
      setActiveTab: types.ACTIVE
    }),
    ...mapActions(['setAccounts'])
  },
  components: {
    AppHeader,
    AppSidebar,
    AppTab,
    Search,
    Member,
    Contact
  },
  mounted () {
    this.delTab()
    this.addTab({
      title: '机器人',
      value: 'root',
      type: 'root'
    })
    this.setActiveTab(this.tabs[0])
    this.setAccounts()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.main {
  .app-header {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #d4d4d4;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
  .container {
    position: absolute;
    top: 61px;
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
        background-color: #fff;
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: auto;
      }
    }
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid @main-border-color;
    font-size: 0;
    p {
      font-size: 14px;
      display: inline-block;
      .count {
        color: #169BD5;
      }
    }
  }


  .table {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .table-row {
      font-size: 0;
      li {
        font-size: 14px;
        display: inline-block;
        width: 25%;
        vertical-align: middle;
        padding: 10px 0;
      }
    }
    .table-head {
      background-color: @main-background-color;
    }
    .table-body {
      position: absolute;
      top: 39px;
      bottom: 0;
      width: 100%;
      overflow-y: auto;
      .table-row {
        border-bottom: 1px solid @main-border-color;
      }
    }
  }
}
</style>
