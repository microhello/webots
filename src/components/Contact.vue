<template>
  <div class="contact">
    <div class="contact-box border-box">
      <div class="contact-box-header">
        <h1>微信好友 （{{ count }}人）</h1>
        <div class="selector">
          <span>所属微信号</span>
          <select class="shadow-box" v-model="currentAccount">
            <option v-for="item of accounts" :value="item">{{ item.nick_name }}</option>
          </select>
        </div>
      </div>
      <table>
        <tr>
          <th>好友账号</th>
          <th>昵称</th>
          <th>备注名</th>
          <th>性别</th>
          <th>省份</th>
          <th>城市</th>
          <th>签名</th>
          <th>所属微信号</th>
        </tr>
        <tr v-for="item of contacts">
          <td>{{ item.alias }}</td>
          <td>{{ item. nick_name }}</td>
          <td>{{ item.remark_name }}</td>
          <td>{{ item.sex === 1 ? '男' : '女' }}</td>
          <td>{{ item.province }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.signature }}</td>
          <td>{{ getAccount(item.uin) }}</td>
        </tr>
      </table>
    </div>
    <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Account } from '../api'

const Paginator = resolve => require(['./Paginator'], resolve)

export default {
  name: 'Contact',
  data () {
    return {
      currentAccount: null,
      contacts: [],
      offset: 0,
      limit: 10,
      count: 0,
      showPaginator: true
    }
  },
  computed: {
    ...mapState({
      accounts: state => [{ nick_name: '全部' }].concat(state.account.items)
    }),
    ...mapGetters(['token'])
  },
  methods: {
    getContacts () {
      Account.getContacts({
        account_id: this.currentAccount.account_id,
        access_token: this.token,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        this.contacts = data.items
        this.count = data.count
      }, data => {
        this.contacts = []
        this.addAlertMessage({ type: 'error', message: '获取好友列表失败，请重试！' })
      })
    },
    onPageChanged ({ offset, limit }) {
      this.offset = offset
      this.limit = limit
      this.getContacts()
    },
    getAccount (uin) {
      for (let item of this.accounts) {
        if (item.uin === uin) {
          return item.nick_name
        }
      }
    }
  },
  watch: {
    async currentAccount () {
      this.showPaginator = false
      this.contacts = []
      this.offset = 0
      await this.getContacts()
      this.showPaginator = true
    }
  },
  components: {
    Paginator
  },
  mounted () {
    this.currentAccount = this.accounts[0]
    Account.getContacts({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.count = count
    })
  }
}
</script>

<style lang="less">
.contact {
  .contact-box {
    padding: 30px 40px 35px;
    margin-bottom: 35px;
    .contact-box-header {
      line-height: 40px;
      margin-bottom: 25px;
      h1 {
        font-size: 20px;
        margin-right: 25px;
        display: inline-block;
        vertical-align: top;
      }
      .selector {
        display: inline-block;
        vertical-align: top;
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
      }
    }
  }
}
</style>
