<template>
  <div class="account">
    <add-account v-if="showAddAccount" @cancel="showAddAccount = false" :account-info="accountInfo"></add-account>
    <ul class="account-title clearfix">
      <li>
        <h1>托管微信账号</h1>
      </li>
      <li>
        <select v-model="status">
          <option v-for="item of statuses" :value="item">{{ item.title }}</option>
        </select>
      </li>
      <li class="pull-right">
        <a class="unselectable" @click="toggleAddAccount()"><i class="iconfont">&#xe63b;</i>新增账号</a>
      </li>
      <li class="account-search pull-right">
        <input type="text" v-model="keywords" @keyup.enter="search" placeholder="微信号，昵称" />
        <i class="iconfont" @click="search">&#xe620;</i>
      </li>
    </ul>
    <div class="table-wrapper">
      <div class="table">
        <div class="table-head">
          <ul class="table-row">
            <li>托管UIN</li>
            <li>名字/昵称</li>
            <li>微信账号</li>
            <li>状态</li>
            <li>操作</li>
          </ul>
        </div>
        <div class="table-body" @scroll="nextPage">
          <ul class="table-row" v-for="item of accounts">
            <li>{{ item.uin }}</li>
            <li>{{ item.nick_name }}</li>
            <li>暂无</li>
            <li>
              <span class="online" v-if="item.online">正在托管中</span>
              <span class="offline" v-else>账号已离线</span>
            </li>
            <li>
              <a v-if="item.online">下线</a>
              <a v-else @click="toggleAddAccount(item)">上线</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Account } from '../api'

const AddAccount = resolve => require(['../components/AddAccount'], resolve)

export default {
  name: 'Account',
  data () {
    let statuses = [{
      title: '全部'
    }, {
      title: '正在托管中',
      value: 1
    }, {
      title: '账号已离线',
      value: 0
    }]
    return {
      keywords: '',
      status: statuses[0],
      offset: 0,
      limit: 20,
      accounts: [],
      statuses: statuses,
      showAddAccount: false,
      accountInfo: undefined
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    getAccounts () {
      Account.getAccounts({
        access_token: this.token,
        online: this.status.value,
        keywords: this.keywords || undefined,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        if (data.items.length < this.limit) {
          this.accounts.splice(this.offset, this.limit, ...data.items)
        } else {
          this.accounts.concat(data.items)
          this.offset += this.limit
        }
      }, data => {
        this.accounts = []
      })
    },
    search () {
      this.offset = 0
      this.accounts = []
      this.getAccounts()
    },
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0) {
        this.getAccounts()
      }
    },
    toggleAddAccount (accountInfo) {
      this.accountInfo = accountInfo
      this.showAddAccount = !this.showAddAccount
    }
  },
  watch: {
    status () {
      this.search()
    }
  },
  components: {
    AddAccount
  },
  mounted () {
    this.getAccounts()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";
@button-color: #61b0ff;
@padding-top: 40px;
@padding-right: 40px;
.account {
  padding: @padding-top @padding-right;
  .account-title {
    line-height: 30px;
    font-size: 0;
    li {
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      h1 {
        font-size: 20px;
        margin-right: 20px;
      }
      a {
        display: block;
        width: 150px;
        height: 30px;
        border-radius: 5px;
        color: #fff;
        background-color: @button-color;
        text-align: center;
        i {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      select {
        height: 30px;
        border-radius: 5px;
        padding-left: 5px;
        outline: 0;
        background-color: #f9f9f9;
        border-color: #ececec;
        transition: border-color .2s;
        &:focus {
          border-color: @button-color;
        }
      }
      &.account-search {
        margin-right: 20px;
        position: relative;
        input[type=text] {
          font-size: 12px;
          width: 200px;
          height: 30px;
          border: 1px solid #ececec;
          border-radius: 5px;
          background-color: #f9f9f9;
          padding-left: 35px;
          outline: 0;
          transition: border-color .2s;
          &:focus {
            border-color: @button-color;
          }
          &::placeholder {
            color: #d1d1d1;
          }
        }
        i {
          display: inline-block;
          line-height: normal;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
        }
      }
    }
  }
  .table-wrapper {
    position: absolute;
    top: 90px;
    right: @padding-right;
    bottom: @padding-top;
    left: @padding-right;
    .table {
      li {
        width: 20%!important;
        a {
          display: inline-block;
          width: 45px;
          height: 20px;
          line-height: 18px;
          font-size: 12px;
          border-radius: 5px;
          border: 1px solid @button-color;
          color: @button-color;
        }
        span {
          &.online {
            color: @main-text-color-success;
          }
          &.offline {
            color: @main-text-color-failure;
          }
        }
      }
    }
  }
}
</style>
