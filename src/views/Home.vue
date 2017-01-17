<template>
  <div class="home">
    <div class="count-box border-box">
      <div class="count-content">
        <div class="count-item">
          <router-link to="/main/account">
            <div class="count">
              <i class="iconfont">&#xe608;</i>
              <span>{{ accountsCount }}</span>
            </div>
            <p>托管账号</p>
          </router-link>
        </div>
        <div class="count-item">
          <a @click="addTab({ title: '微信好友', data: {}, type: 'contact' })">
            <div class="count">
              <i class="iconfont">&#xe602;</i>
              <span>{{ contactsCount }}</span>
            </div>
            <p>微信好友</p>
          </a>
        </div>
      </div>
      <div class="count-content">
        <div class="count-item">
          <a @click="addTab({ title: '群成员', data: {}, type: 'member' })">
            <div class="count">
              <i class="iconfont">&#xe600;</i>
              <span>{{ groupsCount }}</span>
            </div>
            <p>微信群</p>
          </a>
        </div>
        <div class="count-item">
          <a @click="addTab({ title: '群成员', data: {}, type: 'member' })">
            <div class="count">
              <i class="iconfont">&#xe628;</i>
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
              <i class="iconfont">&#xe607;</i>
              <span>{{ messagesCount }}</span>
            </div>
            <p>全部消息</p>
          </router-link>
        </div>
        <div class="count-item">
          <router-link to="/main/watcher">
            <div class="count">
              <i class="iconfont">&#xe66e;</i>
              <span>{{ watchersCount }}</span>
            </div>
            <p>值守消息</p>
          </router-link>
        </div>
      </div>
    </div>
    <ul class="message-box">
      <li>
        <div class="message-content border-box">
          <div class="title clearfix">
            <i class="title-item"></i>
            <h1 class="title-item">群消息</h1>
            <router-link to="/main/messages" class="title-item">更多</router-link>
          </div>
          <table>
            <tr>
              <th>群名称</th>
              <th>今日消息数</th>
              <th>消息总数</th>
              <th>最后接收时间</th>
            </tr>
            <tr v-for="item of groupStat">
              <td>{{ item.group.nick_name }}</td>
              <td>{{ item.msg_count_today }}</td>
              <td>{{ item.msg_count_total }}</td>
              <td>{{ item.msg_last_time | formatDate }}</td>
            </tr>
          </table>
        </div>
      </li>
      <li>
        <div class="message-content border-box">
          <div class="title clearfix">
            <i class="title-item"></i>
            <h1 class="title-item">群值守</h1>
            <router-link to="/main/watcher" class="title-item">更多</router-link>
          </div>
          <table>
            <tr>
              <th>监控账号</th>
              <th>值守消息</th>
              <th>最后接收时间</th>
            </tr>
            <tr v-for="item of guardStat">
              <td>{{ item.guard.nick_name }}</td>
              <td>{{ item.msg_count_total }}</td>
              <td>{{ item.msg_last_time | formatDate }}</td>
            </tr>
          </table>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as API from '../api'
import * as types from '../store/types'

export default {
  name: 'Home',
  data () {
    return {
      contactsCount: 0,
      groupsCount: 0,
      membersCount: 0,
      messagesCount: 0,
      watchersCount: 0,
      groupStat: [],
      guardStat: []
    }
  },
  computed: {
    ...mapState({
      accountsCount: state => state.account.count,
      accounts: state => state.account.items
    }),
    ...mapGetters(['token'])
  },
  methods: {
    ...mapMutations({
      addTab: types.ADD_TAB
    }),
    ...mapActions({
      getAccounts: 'setAccounts'
    })
  },
  watch: {
    accounts (newVal) {
      if (newVal.length > 0) {
        let keywords = []
        for (let item of newVal) {
          keywords.push('@' + item.nick_name)
        }
        API.Message.getMessages({ access_token: this.token, limit: 0, keywords: keywords.join(',') })
      }
    }
  },
  mounted () {
    this.getAccounts()
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
    API.Message.getGroupStat({ access_token: this.token }).then(data => {
      this.groupStat = data.items
    })
    API.Message.getGuardStat({ access_token: this.token }).then(data => {
      this.guardStat = data.items
    })
  }
}
</script>

<style lang="less">
.home {
  .count-box {
    padding: 25px;
    margin-bottom: 10px;
    font-size: 0;
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
    li {
      display: inline-block;
      vertical-align: top;
      &:nth-of-type(1) {
        width: 60%;
        padding-right: 15px;
      }
      &:nth-of-type(2) {
        width: 40%;
      }
      .message-content {
        padding: 15px 25px 25px;
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
      }
    }
  }
}
</style>
