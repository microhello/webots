<template>
  <div class="watcher clearfix">
    <div class="watcher-sidebar">
      <div class="title">
        <p>值守账号</p>
      </div>
      <ul class="account-list">
        <li v-for="n of 20">
          <i class="iconfont">&#xe709;</i>
          <span class="nick-name">老大哥看着我</span>
          <span class="status online">在线</span>
          <span class="status offline">离线</span>
        </li>
      </ul>
    </div>
    <div class="watcher-content">
      <div class="title">
        <p class="account-name">@{{ title }}</p>
        <p><span class="count">{{ count }}</span>条记录</p>
      </div>
      <div class="messages-content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watcher',
  data () {
    return {
      title: '老大哥看着我',
      count: 3
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.watcher {
  .watcher-sidebar {
    float: left;
    width: 300px;
    height: 100%;
    border-right: 1px solid @main-border-color;
    position: relative;
    .account-list {
      position: absolute;
      top: 50px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      li {
        line-height: 45px;
        padding: 0 30px;
        border-bottom: 1px solid @main-border-color;
        cursor: default;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        &:hover {
          background-color: rgba(48, 135, 181, .1);
        }
        &.active {
          background-color: rgba(48, 135, 181, .3);
        }
        i {
          color: #8a8a8a;
          font-size: 25px;
        }
        .nick-name {
          margin-right: 10px;
        }
        .status {
          font-size: 12px;
          display: inline-block;
          width: 38px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          color: #fff;
          &.online {
            background-color: #00cc99;
          }
          &.offline {
            background-color: #ffcc66;
          }
        }
      }
    }
  }
  .watcher-content {
    margin-left: 300px;
    height: 100%;
    position: relative;
    .title > p.account-name {
      margin-right: 20px;
    }
  }
}
</style>
