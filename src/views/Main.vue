<template>
  <div class="main clearfix">
    <div class="main-abcd">
      <h1 class="abcd-item"><span>群喵</span><span>智能群助理客户端</span></h1>
      <h2 class="abcd-item">多账户聊天 | 消息管理 | 后台值守</h2>
      <h1 class="abcd-item">即将上线，敬请期待！</h1>
      <i class="iconfont" @click="toggleAd">&#xe652;</i>
    </div>
    <div class="main-container" :class="{ 'show-abcd': showAd }">
      <app-sidebar class="app-sidebar" :spread-side-bar="spreadSideBar"></app-sidebar>
      <div class="app-content" :class="{ 'spread-app-sidebar': spreadSideBar }">
        <app-header class="app-header" :spread-side-bar="spreadSideBar" @toggle-side-bar="toggleSideBar"></app-header>
        <div class="wrapper">
          <app-tab class="tab"></app-tab>
          <div class="container" :class="{ 'hide-tabs': tabs.length <= 1 }">
            <router-view class="content" v-show="tabs[0] === active"></router-view>
            <search v-for="item of SearchTabs" class="content" v-show="item === active" :key="item" :keywords="item.data.keywords"></search>
            <member v-for="item of MemberTabs" class="content" v-show="item === active" :key="item"></member>
            <contact v-for="item of ContactTabs" class="content" v-show="item === active" :key="item"></contact>
            <robot-setting v-for="item of RobotSettingTabs" class="content" v-show="item === active" :key="item" :uin="item.data.uin"></robot-setting>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

const AppTab = resolve => require(['../components/AppTab'], resolve)
const AppHeader = resolve => require(['../components/AppHeader'], resolve)
const AppSidebar = resolve => require(['../components/AppSidebar'], resolve)
const Search = resolve => require(['../components/Search'], resolve)
const Member = resolve => require(['../components/Member'], resolve)
const Contact = resolve => require(['../components/Contact'], resolve)
const RobotSetting = resolve => require(['../components/RobotSetting'], resolve)

export default {
  name: 'Main',
  data () {
    return {
      spreadSideBar: true,
      showAd: true
    }
  },
  computed: {
    SearchTabs () {
      return this.tabs.filter(item => item.type === 'search')
    },
    MemberTabs () {
      return this.tabs.filter(item => item.type === 'member')
    },
    ContactTabs () {
      return this.tabs.filter(item => item.type === 'contact')
    },
    RobotSettingTabs () {
      return this.tabs.filter(item => item.type === 'robot_setting')
    },
    ...mapState({
      tabs: state => state.tab.items,
      active: state => state.tab.active
    })
  },
  methods: {
    toggleSideBar () {
      this.spreadSideBar = !this.spreadSideBar
    },
    toggleAd () {
      this.showAd = !this.showAd
    },
    ...mapMutations({
      addTab: types.ADD_TAB,
      delTab: types.DEL_TAB,
      setActiveTab: types.ACTIVE
    })
  },
  components: {
    AppHeader,
    AppSidebar,
    AppTab,
    Search,
    Member,
    Contact,
    RobotSetting
  },
  mounted () {
    this.delTab()
    this.addTab({
      title: '首页',
      data: {},
      type: 'root'
    })
    this.setActiveTab(this.tabs[0])
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.main {
  width: 100%;
  height: 100%;
  position: relative;
  .main-abcd {
    height: 50px;
    line-height: 50px;
    background-color: #f0f9ff;
    text-align: center;
    position: relative;
    color: #62676a;
    .abcd-item {
      display: inline-block;
    }
    h1 {
      font-size: 24px;
      &:nth-of-type(2) {
        color: #1eaae8;
      }
      span {
        margin-right: 30px;
      }
    }
    h2 {
      font-size: 16px;
      margin-right: 40px;
    }
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      background-color: rgba(0,0,0,0.4);
      color: #fff;
      line-height: 18px;
      border-radius: 50%;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .main-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: top .2s;
    &.show-abcd {
      top: 50px;
    }
  }
  .app-sidebar {
    height: 100%;
    float: left;
  }
  .app-content {
    height: 100%;
    background-color: @main-background-color;
    position: relative;
    margin-left: 50px;
    transition: margin-left .2s;
    &.spread-app-sidebar {
      margin-left: 170px;
    }
    .app-header {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #d4d4d4;
      position: absolute;
      top: 0;
      width: 100%;
    }
    .wrapper {
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
      .container {
        background-color: #fff;
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        transition: top .2s linear;
        .content {
          // width: 100%;
          // height: 100%;
          // overflow: auto;
        }
        &.hide-tabs {
          top: 0;
        }
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
        padding: 15px 0;
      }
    }
    .table-head {
      background-color: @main-background-color;
      border: 1px solid #ececec;
    }
    .table-body {
      position: absolute;
      top: 51px;
      bottom: 0;
      width: 100%;
      overflow-y: auto;
      .table-row {
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>
