<template>
  <div class="watcher clearfix">
    <div class="watcher-sidebar border-box">
      <ul>
        <li v-for="item of accounts" @click="currentAccount = item" :class="{ 'active': item === currentAccount }">
          <span class="avatar"></span>
          <span class="nick-name">{{ item.nick_name }}</span>
          <span class="state online" v-if="item.online">在线</span>
          <span class="state offline" v-else>离线</span>
        </li>
      </ul>
    </div>
    <div class="watcher-content">
      <div class="watcher-content-header border-box">
        <span class="keywords">{{ keywords }}</span>
        <span class="count"><mark>{{ count }}</mark>条记录</span>
      </div>
      <ul class="messages-list">
        <li class="messages-list-item border-box" v-for="item of messages">
          <div class="messages-list-item-header">
            <h1>{{ item.sender_name }}</h1>
            <p class="clearfix">
              <span class="message-from">来自：{{ item.receiver_name }}</span>
              <span class="message-date">{{ item.create_time | formatDate }}</span>
            </p>
          </div>
          <div class="messages-list-item-body">
            <message :message="item.message" :keyword="keywords"></message>
          </div>
          <div class="messages-list-item-footer">
            <a class="reply-btn" @click="addTab({ title: '回复', data: {}, type: 'reply' })">回复</a>
          </div>
        </li>
        <div class="messages-none border-box" v-show="count === 0">
          暂无新消息
        </div>
      </ul>
      <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
      <!-- <ul class="messages-content" @scroll="nextPage">
        <li class="border-box clearfix" v-for="item of messages">
          <div class="message-item">
            <p class="message-item-title">{{ item.create_time | formatDate }} | {{ item.sender_name }}:</p>
            <message :message="item.message" :keyword="keywords"></message>
          </div>
          <div class="message-item-reply">
            <p>来自“产品汪&运营喵”</p>
            <a @click="addTab({ title: '回复', data: {}, type: 'reply' })">回复</a>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '../store/types'
import * as API from '../api'

const Message = resolve => require(['../components/Message'], resolve)
const Paginator = resolve => require(['../components/Paginator'], resolve)

export default {
  name: 'Watcher',
  data () {
    return {
      accounts: [],
      messages: [],
      offset: 0,
      limit: 10,
      count: 0,
      showPaginator: true,
      currentAccount: {},
      keywords: ''
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    getAccounts () {
      API.Account.getAccounts({
        access_token: this.token,
        offset: 0,
        limit: 9999
      }).then(data => {
        this.accounts = data.items
      }, data => {
        this.accounts = []
        this.addAlertMessage({ type: 'error', message: '获取账号列表失败，请重试！' })
      })
    },
    getMessages () {
      API.Message.getMessages({
        access_token: this.token,
        keywords: this.keywords,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        this.messages = data.items
        this.count = data.count
      }, data => {
        this.addAlertMessage({ type: 'error', message: '获取信息失败，请重试' })
        this.messages = []
      })
    },
    onPageChanged ({ offset, limit }) {
      this.offset = offset
      this.limit = limit
      this.getMessages()
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE,
      addTab: types.ADD_TAB
    })
  },
  watch: {
    async currentAccount (newVal) {
      this.showPaginator = false
      this.offset = 0
      this.keywords = '@' + newVal.nick_name
      this.messages = []
      await this.getMessages()
      this.showPaginator = true
    }
  },
  components: {
    Message,
    Paginator
  },
  mounted () {
    this.getAccounts()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.watcher {
  min-height: 100%;
  position: relative;
  .watcher-sidebar {
    width: 250px;
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    ul {
      width: 100%;
      height: 100%;
      padding: 15px;
      overflow-y: auto;
      li {
        background-color: #f3f3f3;
        border-radius: 2px;
        line-height: 45px;
        padding: 0 57px 0 15px;
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
        white-space: nowrap;
        font-size: 0;
        &:last-of-type {
          margin-bottom: 0;
        }
        &.active {
          background-color: #f9f8fb;
          box-shadow: 0 2px 6px -1px rgba(0, 0, 0, .2);
          &::before {
            content: "";
            display: block;
            width: 2px;
            height: 100%;
            position: absolute;
            left: 0;
            background-color: #5598ed;
          }
        }
        span {
          display: inline-block;
          vertical-align: middle;
          &.avatar {
            background-color: #7598ff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          &.nick-name {
            font-size: 14px;
            width: 100%;
            padding-right: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
          }
          &.state {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            width: 32px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #fff;
            &.online {
              background-color: #30a84f;
            }
            &.offline {
              background-color: #feba00;
            }
          }
        }
      }
    }
  }
  .watcher-content {
    margin-left: 270px;
    .watcher-content-header {
      margin-bottom: 10px;
      padding: 10px 25px;
      .keywords {
        font-size: 16px;
      }
      .count {
        font-size: 14px;
        mark {
          color: #169bd5;
          background-color: transparent;
        }
      }
    }
    .messages-list {
      margin-bottom: 35px;
      .messages-list-item {
        padding: 0 25px;
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .messages-list-item-header {
          padding-top: 10px;
          border-bottom: 1px solid #a3a3a3;
          h1 {
            font-size: 14px;
            line-height: 25px;
          }
          p {
            line-height: 20px;
            font-size: 12px;
            color: #a3a3a3;
            .message-from {
              float: left;
            }
            .message-date {
              float: right;
            }
          }
        }
        .messages-list-item-body {
          line-height: 20px;
          font-size: 12px;
          padding: 15px 0;
          mark {
            color: #999;
            background-color: transparent;
          }
        }
        .messages-list-item-footer {
          text-align: right;
          padding: 10px 0;
          .reply-btn {
            display: inline-block;
            width: 60px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #169bd5;
            border: 1px solid #169bd5;
            border-radius: 5px;
            font-size: 12px;
          }
        }
      }
      .messages-none {
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>
