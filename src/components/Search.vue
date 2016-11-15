<template>
  <div class="search clearfix">
    <div class="side-bar">
      <div class="title">
        <h2 class="title-name">机器人</h2>
      </div>
      <ul class="account-list-items">
        <li v-for="item of accounts" class="clearfix">
          <div class="account-status online" v-if="item.online"></div>
          <div class="account-status offline" v-else></div>
          <div class="account-name">{{ item.nick_name }}</div>
        </li>
      </ul>
    </div>
    <div class="side-bar chat">
      <div class="title">
        <h2 class="title-name">聊天记录</h2>
      </div>
      <ul class="chat-record">
        <li class="chat-record-item">
          <h3 class="record-title">小猫吃鱼</h3>
          <p class="record-count">12条聊天记录</p>
        </li>
      </ul>
    </div>
    <div class="side-content search-content">
      <div class="title">
        <h2 class="title-name">搜索"{{ keyword }}"</h2>
      </div>
      <ul class="search-results">
        <li class="search-results-item" v-for="n of 20">
          <p class="result-name">{{ result.name }}：</p>
          <p class="result-message" v-transcoding:br v-highlight="keyword">{{ result.message }}</p>
          <p class="result-time">{{ result.time | formatDate }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      accounts: [
        { online: true, nick_name: 'ivy' },
        { online: false, nick_name: '从波' }
      ],
      keyword: '招聘',
      result: {
        name: '俪兰创始人冯导',
        message: '有公司招聘的么，本人最近在找工作机会\n有公司招聘的么，本人最近在找工作机会\n有公司招聘的么，本人最近在找工作机会',
        time: new Date()
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.search {
  background-color: #fff;
  .side-bar {
    position: relative;
  }
  .chat {
    width: 290px;
    .chat-record {
      position: absolute;
      top: 50px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      .chat-record-item {
        padding: 15px 30px;
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
        .record-title {
          margin-bottom: 15px;
        }
        .record-count {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .search-content {
    position: relative;
    .title .title-name {
      font-weight: normal;
    }
    .search-results {
      position: absolute;
      top: 50px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      .search-results-item {
        padding: 15px 30px;
        border-bottom: 1px solid @main-border-color;
        font-size: 12px;
        p {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .result-name {
          color: @active-background-color;
        }
        .result-message mark {
          color: @main-text-color-failure;
          background-color: transparent;
        }
        .result-time {
          color: #a1a1a1;
        }
      }
    }
  }
}
</style>
