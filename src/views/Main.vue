<template>
  <div class="main clearfix">
    <!-- <div class="main-abcd">
      <h1 class="abcd-item"><span>群喵</span><span>智能群助理客户端</span></h1>
      <h2 class="abcd-item">多账户聊天 | 消息管理 | 后台值守</h2>
      <h1 class="abcd-item">即将上线，敬请期待！</h1>
      <i class="iconfont" @click="showAd = false">&#xe6a1;</i>
    </div> -->
    <app-header class="app-header"></app-header>
    <div class="app-content" :class="{ 'show-abcd': showAd }">
      <div class="app-sidebar-box">
        <div class="app-sidebar-header">
          <a class="clearfix">
            <i class="iconfont">&#xe662;</i>
            工具箱
            <i class="iconfont">&#xe661;</i>
          </a>
        </div>
        <app-sidebar class="app-sidebar"></app-sidebar>
      </div>
      <div class="app-container">
        <app-tab class="app-tab"></app-tab>
        <div class="container">
          <router-view class="content" v-show="tabs[0] === active"></router-view>
          <search v-for="item of SearchTabs" class="content" v-show="item === active" :key="item" :keywords="item.data.keywords"></search>
          <member v-for="item of MemberTabs" class="content" v-show="item === active" :key="item"></member>
          <contact v-for="item of ContactTabs" class="content" v-show="item === active" :key="item"></contact>
          <robot-setting v-for="item of RobotSettingTabs" class="content" v-show="item === active" :key="item" :uin="item.data.uin"></robot-setting>
          <reply v-for="item of ReplyTabs" class="content" v-show="item === active" :key="item"></reply>
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
const Reply = resolve => require(['../components/Reply'], resolve)

export default {
  name: 'Main',
  data () {
    return {
      showAd: false
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
    ReplyTabs () {
      return this.tabs.filter(item => item.type === 'reply')
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
    })
  },
  components: {
    AppHeader,
    AppSidebar,
    AppTab,
    Search,
    Member,
    Contact,
    RobotSetting,
    Reply
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
  // .main-abcd {
  //   height: 50px;
  //   line-height: 50px;
  //   background-color: #f0f9ff;
  //   text-align: center;
  //   position: relative;
  //   color: #62676a;
  //   .abcd-item {
  //     display: inline-block;
  //   }
  //   h1 {
  //     font-size: 24px;
  //     &:nth-of-type(2) {
  //       color: #1eaae8;
  //     }
  //     span {
  //       margin-right: 30px;
  //     }
  //   }
  //   h2 {
  //     font-size: 16px;
  //     margin-right: 40px;
  //   }
  //   i {
  //     display: inline-block;
  //     width: 18px;
  //     height: 18px;
  //     color: rgba(0, 0, 0, 0.4);
  //     line-height: 18px;
  //     position: absolute;
  //     right: 40px;
  //     top: 50%;
  //     transform: translateY(-50%);
  //     cursor: pointer;
  //   }
  // }
  .app-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .app-content {
    position: absolute;
    top: 75px;
    right: 0;
    bottom: 0;
    left: 0;
    // transition: top .2s;
    // &.show-abcd {
    //   top: 50px;
    // }
  }
  .app-sidebar-box {
    height: 100%;
    width: 200px;
    float: left;
    position: relative;
    padding-top: 60px;
    .app-sidebar-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #fff;
      a {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #ebebeb;
        background-color: #313947;
        border-radius: 5px;
        padding: 0 15px;
        i {
          &:first-of-type {
            float: left;
          }
          &:last-of-type {
            float: right;
          }
        }
      }
    }
    .app-sidebar {
      height: 100%;
      width: 100%;
    }
  }
  .app-container {
    height: 100%;
    position: relative;
    margin-left: 200px;
    transition: margin-left .2s;
    .container {
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
      overflow: auto;
      background-color: #f1f3f5;
      .content {
        padding: 25px;
      }
    }
  }
}
</style>
