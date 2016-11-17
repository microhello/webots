<template>
  <div class="search clearfix">
    <!-- <div class="side-bar">
      <div class="title">
        <h2 class="title-name" @click="console">机器人</h2>
      </div>
      <ul class="account-list-items">
        <li v-for="(item, key) in results" class="clearfix" @click="current.account_id = key">
          <div class="account-status online" v-if="item.account.online"></div>
          <div class="account-status offline" v-else></div>
          <div class="account-name">{{ item.account.nick_name }}</div>
        </li>
      </ul>
    </div>
    <div class="side-bar chat">
      <div class="title">
        <h2 class="title-name">聊天记录</h2>
      </div>
      <ul class="chat-record">
        <li v-for="(item, key) in results[current.account_id].items" class="chat-record-item">
          <h3 class="record-title">{{ key }}</h3>
          <p class="record-count">{{item.length}}条聊天记录</p>
        </li>
      </ul>
    </div> -->
    <div class="side-content search-content">
      <div class="title">
        <h2 class="title-name">搜索"<span :title="keywords">{{ keywords }}</span>"</h2>
      </div>
      <ul class="search-results" @scroll="nextPage" v-if="messages.length">
        <li class="search-results-item" v-for="item of messages">
          <p class="result-name">{{ item.sender_name }}：</p>
          <p class="result-message" v-replace="{ rgExp: /\n/g, replaceText: '<br />' }" v-highlight="keywords">{{ item.message }}</p>
          <p class="result-time">{{ item.create_time | formatDate }}</p>
        </li>
      </ul>
      <div class="search-results" v-else>
        <p class="no-result">没有找到与"<mark>{{ keywords }}</mark>"相关的消息</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from '../api'

export default {
  name: 'Search',
  props: {
    keywords: String
  },
  data () {
    return {
      messages: [],
      pageIndex: 0,
      pageSize: 10
    }
  },
  computed: {
  },
  methods: {
    async search () {
      try {
        let offset = this.pageIndex * this.pageSize
        let data = await Message.getMessages({ keywords: this.keywords, offset: offset, limit: this.pageSize })
        if (data.length < this.pageSize) {
          this.messages.splice(offset, this.pageSize, ...data)
        } else {
          this.messages = this.messages.concat(data)
          this.pageIndex++
        }
        console.log('search success', this.messages)
      } catch (err) {
        console.log('search failure', err)
      }
    },
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0) {
        this.search()
      }
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.search {
  background-color: #fff;
  // .side-bar {
  //   position: relative;
  // }
  // .chat {
  //   width: 290px;
  //   .chat-record {
  //     position: absolute;
  //     top: 50px;
  //     right: 0;
  //     bottom: 0;
  //     left: 0;
  //     overflow-y: auto;
  //     .chat-record-item {
  //       padding: 15px 30px;
  //       border-bottom: 1px solid @main-border-color;
  //       cursor: default;
  //       -webkit-transition: all .3s;
  //       -moz-transition: all .3s;
  //       -ms-transition: all .3s;
  //       -o-transition: all .3s;
  //       transition: all .3s;
  //       &:hover {
  //         background-color: rgba(48, 135, 181, .1);
  //       }
  //       &.active {
  //         background-color: rgba(48, 135, 181, .3);
  //       }
  //       .record-title {
  //         margin-bottom: 15px;
  //       }
  //       .record-count {
  //         font-size: 14px;
  //         color: #999;
  //       }
  //     }
  //   }
  // }
  .search-content {
    position: relative;
    margin-left: 0;
    .title .title-name {
      font-weight: normal;
      width: 100%;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
        .result-time {
          color: #a1a1a1;
        }
      }
      .no-result {
        font-size: 16px;
        padding: 16px;
        // text-align: center;
        mark {
          word-wrap: break-word;
          word-break: normal;
        }
      }
      mark {
        color: @main-text-color-failure;
        background-color: transparent;
      }
    }
  }
}
</style>
