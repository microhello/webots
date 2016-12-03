<template>
  <div class="watcher clearfix">
    <div class="watcher-sidebar">
      <div class="title">
        <p>值守账号</p>
      </div>
      <ul class="account-list">
        <li v-for="item of accounts" @click="setCurrentAccount(item)" :class="{ 'active': item === currentAccount }">
          <i class="iconfont">&#xe709;</i>
          <span class="nick-name">{{ item.nick_name }}</span>
          <span class="status online" v-if="item.online">在线</span>
          <span class="status offline" v-else>离线</span>
        </li>
      </ul>
    </div>
    <div class="watcher-content">
      <div class="title">
        <p class="account-name">{{ keywords }}</p>
        <p><span class="count">{{ count }}</span>条记录</p>
      </div>
      <ul class="messages-content" @scroll="nextPage">
        <li v-for="item of messages">
          <p class="message-item-title">{{ item.create_time | formatDate }} | {{ item.sender_name }}:</p>
          <message :message="item.message" :keyword="keywords"></message>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as types from '../store/types'
import { Message as MessageApi } from '../api'

const Message = resolve => require(['../components/Message'], resolve)

export default {
  name: 'Watcher',
  data () {
    return {
      count: 0,
      messages: [],
      offset: 0,
      limit: 20,
      currentAccount: {},
      keywords: ''
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.account.items
    }),
    ...mapGetters(['token'])
  },
  methods: {
    setCurrentAccount (account) {
      this.currentAccount = account
    },
    getMessages () {
      MessageApi.getMessages({ access_token: this.token, keywords: this.keywords, offset: this.offset, limit: this.limit }).then(data => {
        this.count = data.count
        if (data.items.length < this.limit) {
          this.messages.splice(this.offset, this.limit, ...data.items)
        } else {
          this.messages = this.messages.concat(data.items)
          this.offset += this.limit
        }
      }, data => {
        this.addAlertMessage({ type: 'error', message: '获取失败，请重试' })
      })
    },
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0) {
        this.getMessages()
      }
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE
    }),
    ...mapActions({
      getAccounts: 'setAccounts'
    })
  },
  watch: {
    currentAccount (newVal) {
      this.offset = 0
      this.keywords = '@' + newVal.nick_name
      this.messages = []
      this.getMessages()
    },
    accounts (newVal) {
      if (newVal.length > 0) {
        this.currentAccount = newVal[0]
      }
    }
  },
  components: {
    Message
  },
  mounted () {
    this.getAccounts()
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
    .title {
      padding: 0 40px;
      p.account-name {
        margin-right: 20px;
      }
    }
    .messages-content {
      position: absolute;
      top: 50px;
      bottom: 0;
      width: 100%;
      overflow: auto;
      li {
        padding: 25px 40px;
        font-size: 12px;
        border-bottom: 1px solid #ececec;
        .message-item-title {
          margin-bottom: 15px;
        }
        mark {
          color: #999;
          background-color: transparent
        }
      }
    }
  }
}
</style>
