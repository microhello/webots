<template>
  <div class="contact">
    <div class="title">
      <p>微信好友 （{{ contactsCount }}人）</p>
    </div>
    <div class="contact-content">
      <div class="selector">
        <label>所属微信号</label>
        <select v-model="currentAccount">
          <option v-for="item of accounts" :value="item">{{ item.nick_name }}</option>
        </select>
      </div>
      <div class="table-box">
        <div class="table contact-table">
          <div class="table-head">
            <ul class="table-row">
              <li>好友账号</li>
              <li>昵称</li>
              <li>备注名</li>
              <li>性别</li>
              <li>省份</li>
              <li>城市</li>
              <li>签名</li>
              <li>所属微信号</li>
            </ul>
          </div>
          <div class="table-body" @scroll="nextPage">
            <ul class="table-row" v-for="item of contacts">
              <li>{{ item.alias }}</li>
              <li>{{ item. nick_name }}</li>
              <li>{{ item.remark_name }}</li>
              <li>{{ item.sex === 1 ? '男' : '女' }}</li>
              <li>{{ item.province }}</li>
              <li>{{ item.city }}</li>
              <li>{{ item.signature }}</li>
              <li>{{ getAccountNickName(item.uin) }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Account } from '../api'

export default {
  name: 'Contact',
  data () {
    return {
      currentAccount: null,
      contacts: [],
      offset: 0,
      limit: 20,
      contactsCount: 0
    }
  },
  computed: {
    ...mapState({
      accounts: state => [{ nick_name: '全部' }].concat(state.account.items)
    }),
    ...mapGetters(['token'])
  },
  methods: {
    async getContacts () {
      try {
        let data = await Account.getContacts({
          account_id: this.currentAccount.account_id,
          access_token: this.token,
          offset: this.offset,
          limit: this.limit
        })
        if (data.items.length < this.limit) {
          this.contacts.splice(this.offset, this.limit, ...data.items)
        } else {
          this.contacts = this.contacts.concat(data.items)
          this.offset += this.limit
        }
        console.log('getMembers success', this.contacts)
      } catch (err) {
        console.log('getMembers failure', err)
      }
    },
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0) {
        this.getContacts()
      }
    },
    getAccountNickName (uin) {
      for (let item of this.accounts) {
        if (item.uin === uin) {
          return item.nick_name
        }
      }
    }
  },
  watch: {
    currentAccount () {
      this.contacts = []
      this.offset = 0
      this.getContacts()
    }
  },
  mounted () {
    this.currentAccount = this.accounts[0]
    Account.getContacts({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.contactsCount = count
    })
  }
}
</script>

<style lang="less">
@padding-left: 40px;
@title-height: 50px;
.contact {
  .title {
    padding: 0 40px;
  }
  .contact-content {
    position: absolute;
    top: @title-height;
    right: @padding-left;
    bottom: 50px;
    left: @padding-left;
    .selector {
      padding: 0 40px;
      line-height: 100px;
      label {
        margin-right: 10px;
      }
      select {
        margin-right: 20px;
      }
    }
    .table-box {
      position: absolute;
      top: 100px;
      bottom: 0;
      width: 100%;
    }
  }
}
.contact-table .table-row li {
  width: 12.5%!important;
}
</style>
