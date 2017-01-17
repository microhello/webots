<template>
  <div class="messages clearfix">
    <div class="messages-sidebar border-box">
      <ul class="messages-sidebar-accounts">
        <template v-for="account of accounts">
          <li class="messages-sidebar-accounts-item" :class="{ 'active': account.groups }" @click="toggleAccount(account)" :title="account.nick_name">
            <span class="avatar"></span>
            <span class="nick-name">{{ account.nick_name }}</span>
            <span class="state online" v-if="account.online">在线</span>
            <span class="state offline" v-else>离线</span>
          </li>
          <ul class="messages-sidebar-groups" v-if="account.groups">
            <li class="messages-sidebar-groups-item" :class="{ 'active': isCurrentGroup(group) }" v-for="group of account.groups.items" @click="currentGroup = group" :title="group.nick_name">
              <a>{{ group.nick_name }}</a>
            </li>
          </ul>
        </template>
      </ul>
    </div>
    <div class="messages-content">
      <div class="date-selector clearfix">
        <modal v-if="showCalendar" @close="showCalendar = false">
          <calendar class="calendar" :currentDate="currentDate" @selected="selected"></calendar>
        </modal>
        <a class="date-selector-calendar-btn border-box" @click="showCalendar = true">
          <i class="iconfont">&#xe713;</i>
          <span>自定义日期</span>
        </a>
        <ul class="date-selector-tabs border-box">
          <li :class="{ 'active': item.valueOf() === currentDate.valueOf() }" v-for="item of dateList" @click="currentDate = item">
            <p>{{ item | formatDate('MM-dd') }}<span v-if="item.toLocaleDateString() === new Date().toLocaleDateString()"> 今天</span></p>
          </li>
        </ul>
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
            <message :message="item.message"></message>
          </div>
        </li>
        <div class="messages-none border-box" v-show="count === 0">
          暂无新消息
        </div>
      </ul>
      <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as API from '../api'
import * as types from '../store/types'

const Message = resolve => require(['../components/Message'], resolve)
const Paginator = resolve => require(['../components/Paginator'], resolve)
const Calendar = resolve => require(['../components/Calendar'], resolve)
const Modal = resolve => require(['../components/Modal'], resolve)

export default {
  name: 'Messages',
  data () {
    return {
      currentDate: new Date(new Date().toLocaleDateString()),
      showCalendar: false,
      accounts: [],
      messages: [],
      offset: 0,
      limit: 10,
      count: 0,
      currentGroup: null,
      showPaginator: true
    }
  },
  computed: {
    dateList () {
      let displayLength = 5
      let intHalfOfDisplayLength = parseInt(displayLength / 2)
      let dayLength = 24 * 60 * 60 * 1000
      let current = this.currentDate.valueOf()
      let now = new Date(new Date().toLocaleDateString()).valueOf()
      let start
      if (intHalfOfDisplayLength === displayLength / 2) {
        start = current - (intHalfOfDisplayLength - 1) * dayLength
      } else {
        start = current - intHalfOfDisplayLength * dayLength
      }
      let end = current + intHalfOfDisplayLength * dayLength
      if (end > now) {
        end = now
        start = end - (displayLength - 1) * dayLength
      }
      let dates = []
      for (let i = start; i <= end; i = i + dayLength) {
        dates.push(new Date(i))
      }
      return dates
    },
    query () {
      this.$route.query.uin = parseInt(this.$route.query.uin)
      return this.$route.query
    },
    payload () {
      return {
        uin: this.query.uin,
        nick_name: this.query.nick_name,
        start_time: this.currentDate.valueOf() / 1000,
        end_time: this.currentDate.valueOf() / 1000 + 24 * 60 * 60
      }
    },
    ...mapGetters(['token'])
  },
  methods: {
    selected (event) {
      this.showCalendar = false
      if (event instanceof Date) {
        this.currentDate = event
      } else {
        this.addAlertMessage({ type: 'error', message: '发生未知错误，请重新选择时间！' })
      }
    },
    toggleAccount (account) {
      if (account.groups) {
        this.collapseGroupList(account)
      } else {
        this.getGroups(account)
      }
    },
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
    getGroups (account) {
      API.Group.getGroups({
        uin: account.uin,
        access_token: this.token,
        offset: 0,
        limit: 9999
      }).then(data => {
        this.$set(account, 'groups', data)
      }, data => {
        this.addAlertMessage({ type: 'error', message: '获取群列表失败，请重试！' })
        this.collapseGroupList()
      })
    },
    isCurrentGroup (group) {
      if (this.currentGroup && this.currentGroup.uin === group.uin && this.currentGroup.nick_name === group.nick_name) {
        return true
      } else {
        return false
      }
    },
    getMessages () {
      let { uin, nick_name: receiver_name, start_time, end_time } = this.payload
      API.Message.getMessages({
        uin: uin,
        receiver_name: receiver_name,
        start_time: start_time,
        end_time: end_time,
        offset: this.offset,
        limit: this.limit,
        access_token: this.token
      }).then(data => {
        this.messages = data.items
        this.count = data.count
      }, data => {
        this.messages = []
        this.addAlertMessage({ type: 'error', message: '获取群消息失败，请重试！' })
      })
    },
    collapseGroupList (account) {
      this.$delete(account, 'groups')
    },
    onPageChanged ({ offset, limit }) {
      if (!this.payload.uin || !this.payload.nick_name || !this.payload.start_time || !this.payload.end_time) {
        this.addAlertMessage({ type: 'error', message: '请先选择要查询的群及日期！' })
        return
      }
      this.offset = offset
      this.limit = limit
      this.getMessages()
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE
    })
  },
  watch: {
    async payload (newValue) {
      if (!newValue.uin || !newValue.nick_name || !newValue.start_time || !newValue.end_time) {
        return
      }
      this.showPaginator = false
      this.offset = 0
      this.messages = []
      await this.getMessages()
      this.showPaginator = true
    },
    currentDate (newValue) {
      this.$router.push({
        path: '/main/messages',
        query: {
          uin: this.payload.uin,
          nick_name: this.payload.nick_name,
          start_time: parseInt(newValue.valueOf() / 1000),
          end_time: parseInt(newValue.valueOf() / 1000) + 24 * 60 * 60
        }
      })
    },
    currentGroup (newValue) {
      this.$router.push({
        path: '/main/messages',
        query: {
          uin: newValue.uin,
          nick_name: newValue.nick_name,
          start_time: parseInt(this.currentDate.valueOf() / 1000),
          end_time: parseInt(this.currentDate.valueOf() / 1000) + 24 * 60 * 60
        }
      })
    }
  },
  components: {
    Message,
    Paginator,
    Calendar,
    Modal
  },
  mounted () {
    this.getAccounts()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.messages {
  min-height: 100%;
  position: relative;
  .messages-sidebar {
    width: 250px;
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    .messages-sidebar-accounts {
      width: 100%;
      height: 100%;
      padding: 15px;
      overflow-y: auto;
      .messages-sidebar-accounts-item {
        background-color: #f3f3f3;
        border-radius: 2px;
        line-height: 45px;
        padding: 0 57px 0 15px;
        position: relative;
        overflow: hidden;
        margin-top: 10px;
        cursor: pointer;
        white-space: nowrap;
        font-size: 0;
        &:first-of-type {
          margin-top: 0;
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
      .messages-sidebar-groups {
        border-radius: 5px;
        background-color: #f8f8fb;
        max-height: 200px;
        overflow-y: auto;
        margin-top: 10px;
        .messages-sidebar-groups-item {
          font-size: 12px;
          line-height: 40px;
          padding: 0 15px;
          border-bottom: 1px solid #fff;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
          &:last-of-type {
            border-bottom: 0;
          }
          &.active {
            color: #169bd5;
          }
        }
      }
    }
  }
  .messages-content {
    margin-left: 270px;
    .date-selector {
      line-height: 45px;
      text-align: center;
      font-size: 12px;
      margin-bottom: 10px;
      .date-selector-tabs {
        margin-right: 125px;
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: box;              /* OLD - Android 4.4- */
        li {
          font-size: 12px;
          cursor: pointer;
          -webkit-flex: auto;        /* Chrome */
          -ms-flex: auto;            /* IE 10 */
          flex: auto;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
          -webkit-box-flex: auto;    /* OLD - iOS 6-, Safari 3.1-6 */
          -moz-box-flex: auto;       /* OLD - Firefox 19- */
          &.active {
            color: #169bd5;
          }
          p {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
            border-right: 1px solid #ededed;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
          }
          &:last-of-type span {
            border-right: 0;
          }
        }
      }
      .date-selector-calendar-btn {
        float: right;
        width: 110px;
        font-size: 0;
        i, span {
          font-size: 12px;
          vertical-align: middle;
        }
        i {
          margin-right: 5px;
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
