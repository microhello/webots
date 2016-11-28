<template>
  <div class="home">
    <div class="count-box">
      <div class="count-content">
        <div class="count-item">
          <a>
            <div class="count">
              <i class="iconfont">&#xe6ef;</i>
              <span>{{ accountsCount }}</span>
            </div>
            <p>托管账号</p>
          </a>
        </div>
        <div class="count-item">
          <a @click="addTab({ title: '微信好友', value: 'contact', type: 'contact' })">
            <div class="count">
              <i class="iconfont">&#xe604;</i>
              <span>{{ contactsCount }}</span>
            </div>
            <p>微信好友</p>
          </a>
        </div>
      </div>
      <div class="count-content">
        <div class="count-item">
          <a>
            <div class="count">
              <i class="iconfont">&#xe603;</i>
              <span>{{ groupsCount }}</span>
            </div>
            <p>微信群</p>
          </a>
        </div>
        <div class="count-item">
          <a @click="addTab({ title: '群成员', value: 'member', type: 'member' })">
            <div class="count">
              <i class="iconfont">&#xe627;</i>
              <span>{{ membersCount }}</span>
            </div>
            <p>群成员</p>
          </a>
        </div>
      </div>
      <div class="count-content">
        <div class="count-item">
          <router-link to="/main/messages">
            <div class="count">
              <i class="iconfont">&#xe654;</i>
              <span>{{ messagesCount }}</span>
            </div>
            <p>全部消息</p>
          </router-link>
        </div>
        <div class="count-item">
          <a>
            <div class="count">
              <i class="iconfont">&#xe663;</i>
              <span>3421</span>
            </div>
            <p>值守消息</p>
          </a>
        </div>
      </div>
    </div>
    <div class="message-box">
      <div class="message-content">
        <div class="title clearfix">
          <i class="title-item"></i>
          <h1 class="title-item">群消息</h1>
          <a class="title-item">更多</a>
        </div>
        <div class="table">
          <div class="table-head">
            <ul class="table-row">
              <li>群名称</li>
              <li>今日消息数</li>
              <li>消息总数</li>
              <li>最后接收时间</li>
            </ul>
          </div>
          <div class="table-body">
            <!-- <ul class="table-row" v-for="n of 10">
              <li>【地推人·上海1】🅰跨界社群</li>
              <li>7</li>
              <li>124</li>
              <li>今天   09:30:31</li>
            </ul> -->
          </div>
        </div>
      </div>
      <div class="message-content">
        <div class="title clearfix">
          <i class="title-item"></i>
          <h1 class="title-item">群值守</h1>
          <a class="title-item">更多</a>
        </div>
        <div class="table">
          <div class="table-head">
            <ul class="table-row">
              <li>监控账号</li>
              <li>值守消息</li>
              <li>最后接收时间</li>
            </ul>
          </div>
          <div class="table-body">
            <!-- <ul class="table-row" v-for="n of 10">
              <li>老大哥在看着我</li>
              <li>24</li>
              <li>今天   09:30:31</li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import * as API from '../api'
import * as types from '../store/types'

export default {
  name: 'Home',
  data () {
    return {
      contactsCount: 0,
      groupsCount: 0,
      membersCount: 0,
      messagesCount: 0
    }
  },
  computed: {
    ...mapState({
      accountsCount: state => state.account.count
    }),
    ...mapGetters(['token'])
  },
  methods: {
    ...mapMutations({
      addTab: types.ADD_TAB
    })
  },
  mounted () {
    API.Account.getContacts({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.contactsCount = count
    })
    API.Group.getGroups({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.groupsCount = count
    })
    API.Group.getMembers({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.membersCount = count
    })
    API.Message.getMessages({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.messagesCount = count
    })
  }
}
</script>

<style lang="less">
.home {
  padding: 40px 50px;
  .count-box {
    font-size: 0;
    margin-bottom: 40px;
    .count-content {
      display: inline-block;
      vertical-align: top;
      width: 33.33333333%;
      color: #fff;
      border-width: 0 5px;
      border-style: solid;
      border-color: #fff;
      &:nth-of-type(1) {
        border-left: 0;
        background-color: #73c3e6;
      }
      &:nth-of-type(2) {
        background-color: #a3c284;
      }
      &:nth-of-type(3) {
        border-right: 0;
        background-color: #ffe084;
      }
      .count-item {
        display: inline-block;
        width: 50%;
        padding: 30px 0;
        text-align: center;
        a {
          display: inline-block;
          color: #fff;
        }
        .count {
          margin-bottom: 10px;
          i {
            display: inline-block;
            vertical-align: middle;
            font-size: 30px;
            margin-right: 10px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
          }
        }
        p {
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
  .message-box {
    font-size: 0;
    .message-content {
      display: inline-block;
      vertical-align: top;
      &:first-of-type {
        width: 60%;
        padding-right: 20px;
      }
      &:last-of-type {
        width: 40%;
        padding-left: 20px;
        li {
          width: 33.333%;
          &:first-of-type {
            text-align: left;
            padding-left: 20px;
          }
        }
      }
      .title {
        height: 40px;
        line-height: 40px;
        padding: 0;
        border: 0;
        .title-item {
          display: inline-block;
          vertical-align: middle;
        }
        i {
          width: 10px;
          height: 10px;
          background-color: #a1a1a1;
          margin-right: 10px;
        }
        h1 {
          font-size: 16px;
        }
        a {
          font-size: 12px;
          float: right;
          color: #A1A1A1;
        }
      }
      .table > .table-body {
        position: static;
        .table-row > li {
          font-size: 12px;
          &:first-of-type {
            text-align: left;
            padding-left: 20px;
          }
          &:last-of-type {
            color: #A1A1A1;
          }
        }
      }
    }
  }
}
</style>
