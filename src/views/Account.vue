<template>
  <div class="account">
    <modal v-if="showAddAccount" @close="closeAddAccount">
      <add-account :account-info="accountInfo"></add-account>
    </modal>
    <div class="account-box border-box">
      <ul class="account-title clearfix">
        <li>
          <h1>托管机器人</h1>
        </li>
        <li>
          <select class="shadow-box" v-model="status">
            <option v-for="item of statuses" :value="item">{{ item.title }}</option>
          </select>
        </li>
        <li class="shadow-box add-account-btn pull-right" @click="addAccount">
          <span>新增账号</span>
          <i class="iconfont">&#xe67d;</i>
        </li>
        <li class="account-search shadow-box pull-right">
          <input type="text" v-model="keywords" @keyup.enter="search" placeholder="微信号，昵称" />
          <i class="iconfont" @click="search">&#xe66f;</i>
        </li>
      </ul>
      <table class="account-list">
        <tr>
          <th>托管UIN</th>
          <th>名字/昵称</th>
          <th>微信账号</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="item of accounts">
          <td>{{ item.uin }}</td>
          <td>{{ item.nick_name }}</td>
          <td>暂无</td>
          <td>
            <span class="online" v-if="item.online">正在托管中</span>
            <span class="offline" v-else>账号已离线</span>
          </td>
          <td class="account-setting">
            <a class="state offline" v-if="item.online" @click="stopClient(item)">下线</a>
            <a class="state online" v-else @click="startClient(item)">上线</a>
            <a class="setting" @click="addTab({ title: '配置机器人', data: { uin: item.uin }, type: 'robot_setting' })">配置</a>
          </td>
        </tr>
      </table>
    </div>
    <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Account } from '../api'
import * as types from '../store/types'

const AddAccount = resolve => require(['../components/AddAccount'], resolve)
const Modal = resolve => require(['../components/Modal'], resolve)
const Paginator = resolve => require(['../components/Paginator'], resolve)

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
      limit: 10,
      count: 0,
      accounts: [],
      statuses: statuses,
      showAddAccount: false,
      accountInfo: undefined,
      showPaginator: true
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    addAccount () {
      this.accountInfo = undefined
      this.showAddAccount = true
    },
    closeAddAccount () {
      this.showAddAccount = false
      this.search()
    },
    getAccounts () {
      Account.getAccounts({
        access_token: this.token,
        online: this.status.value,
        keywords: this.keywords || undefined,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        this.accounts = data.items
        this.count = data.count
      }, data => {
        this.accounts = []
        this.addAlertMessage({ type: 'error', message: '获取账号列表失败，请重试！' })
      })
    },
    async search () {
      this.showPaginator = false
      this.offset = 0
      this.accounts = []
      await this.getAccounts()
      this.showPaginator = true
    },
    onPageChanged ({ offset, limit }) {
      this.offset = offset
      this.limit = limit
      this.getAccounts()
    },
    startClient (account) {
      // Account.startClient({ access_token: this.token, account_id: account.account_id }).then(data => {
      //   this.addAlertMessage({ type: 'success', message: account.nick_name + ' 上线成功' })
      //   this.search()
      // }, data => {
      //   this.addAlertMessage({ type: 'error', message: account.nick_name + ' 上线失败，请重试' })
      // })
      this.accountInfo = account
      this.showAddAccount = true
    },
    stopClient (account) {
      Account.stopClient({ access_token: this.token, account_id: account.account_id }).then(data => {
        this.addAlertMessage({ type: 'success', message: account.nick_name + ' 下线成功' })
        this.search()
      }, data => {
        this.addAlertMessage({ type: 'error', message: account.nick_name + ' 下线失败，请重试' })
      })
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE,
      addTab: types.ADD_TAB
    })
  },
  watch: {
    status () {
      this.search()
    }
  },
  components: {
    AddAccount,
    Modal,
    Paginator
  },
  mounted () {
    this.getAccounts()
  }
}
</script>

<style lang="less">
.account {
  .account-box {
    padding: 30px 40px 35px;
    margin-bottom: 35px;
    .account-title {
      margin-bottom: 25px;
      line-height: 40px;
      font-size: 0;
      li {
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        h1 {
          font-size: 20px;
          margin-right: 25px;
        }
        select {
          height: 40px;
          padding-left: 5px;
          outline: 0;
          background-color: #fff;
          border-color: #fff;
          -webkit-transition: border-color .3s;
          -moz-transition: border-color .3s;
          -ms-transition: border-color .3s;
          -o-transition: border-color .3s;
          transition: border-color .3s;
          &:focus {
            border-color: #5598ed;
          }
        }
        &.add-account-btn {
          width: 120px;
          height: 40px;
          color: #fff;
          background-color: #5598ed;
          text-align: center;
          cursor: pointer;
          i {
            font-size: 12px;
          }
        }
        &.account-search {
          width: 235px;
          height: 40px;
          margin-right: 25px;
          position: relative;
          input[type=text] {
            display: block;
            font-size: 12px;
            padding: 0 40px 0 15px;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #fff;
            outline: 0;
            -webkit-transition: border-color .3s;
            -moz-transition: border-color .3s;
            -ms-transition: border-color .3s;
            -o-transition: border-color .3s;
            transition: border-color .3s;
            &::placeholder {
              color: #d1d1d1;
            }
            &:focus {
              border-color: #5598ed;
            }
          }
          i {
            font-size: 18px;
            color: #333;
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 0 5px 5px 0;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
    .account-list {
      span {
        &.online {
          color: #60ba77;
        }
        &.offline {
          color: #d81e06;
        }
      }
      td.account-setting {
        font-size: 0;
        a {
          font-size: 12px;
          color: #5598ed;
        }
        .state {
          margin-right: 10%;
          // &.online {
          //   color: #60ba77;
          // }
          // &.offline {
          //   color: #fdcf54;
          // }
        }
        // .setting {
        //   color: #5598ed;
        // }
      }
    }
  }
}
</style>
