<template>
  <div class="home clearfix">
    <account-list class="side-bar"></account-list>
    <group-list class="side-bar group-list"></group-list>
    <div class="side-content">
      <ul class="title nav">
        <li>
          <a>消息记录</a>
        </li>
        <li>
          <a>群成员</a>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const AccountList = resolve => require(['../components/AccountList'], resolve)
const GroupList = resolve => require(['../components/GroupList'], resolve)

export default {
  name: 'Home',
  components: {
    AccountList,
    GroupList
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.title {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  border-bottom: 1px solid @main-border-color;
  .title-name {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
  }
}

.side-bar {
  float: left;
  width: 200px;
  height: 100%;
  border-right: 1px solid @main-border-color;
}
.side-content {
  margin-left: 490px;
  height: 100%;
  position: relative;
  .nav {
    padding: 0;
    li {
      display: inline-block;
      padding: 0 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.home {
  background: #fff;
  .group-list {
    width: 290px;
  }
}
</style>
