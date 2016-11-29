<template>
  <div class="account">
    <add-account v-if="showAddAccount" @cancel="showAddAccount = false"></add-account>
    <ul class="account-title clearfix">
      <li>
        <h1>托管微信账号</h1>
      </li>
      <li class="pull-right">
        <a class="unselectable" @click="showAddAccount = true"><i class="iconfont">&#xe63b;</i>新增账号</a>
      </li>
    </ul>
    <ul class="selector">
      <li>
        <span>状态</span>
        <select v-model="status">
          <option v-for="item of statuses" :value="item">{{ item.title }}</option>
        </select>
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
              <a v-else>上线</a>
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
      showAddAccount: false
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
@button-color: #169bd5;
@padding-top: 50px;
@padding-right: 90px;
.account {
  padding: @padding-top @padding-right;
  .account-title {
    line-height: 30px;
    padding-right: 50px;
    font-size: 0;
    li {
      display: inline-block;
      vertical-align: middle;
      h1 {
        font-size: 16px;
        font-weight: bold;
      }
      a {
        font-size: 14px;
        display: block;
        width: 100px;
        height: 30px;
        border-radius: 15px;
        color: #fff;
        background-color: @button-color;
        text-align: center;
        i {
          font-size: 12px;
          margin-right: 5px;
        }
      }
    }
  }
  .selector {
    line-height: 70px;
    padding: 0 50px;
    font-size: 0;
    li {
      font-size: 14px;
      display: inline-block;
      span {
        margin-right: 10px;
      }
      &.account-search {
        position: relative;
        input[type=text] {
          font-size: 12px;
          height: 26px;
          border: 1px solid #c9c9c9;
          border-radius: 13px;
          padding: 0 30px 0 13px;
          outline: 0;
          transition: border-color .2s;
          &:focus {
            border-color: @button-color;
          }
        }
        i {
          display: inline-block;
          line-height: normal;
          cursor: pointer;
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          color: #c9c9c9;
        }
      }
    }
  }
  .table-wrapper {
    position: absolute;
    top: 155px;
    right: @padding-right;
    bottom: @padding-top;
    left: @padding-right;
    .table {
      li {
        width: 20%!important;
        a {
          display: inline-block;
          width: 50px;
          height: 20px;
          line-height: 18px;
          font-size: 12px;
          border-radius: 10px;
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
