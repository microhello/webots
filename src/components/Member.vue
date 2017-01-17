<template>
  <div class="member">
    <div class="member-box border-box">
      <div class="member-box-header">
        <h1>群成员 （{{ count }}人）</h1>
        <div class="selector">
          <span>托管账号</span>
          <select class="shadow-box" v-model="currentAccount">
            <option v-for="item of accounts" :value="item">{{ item.nick_name }}</option>
          </select>
          <span>所属群</span>
          <select class="shadow-box" v-model="currentGroup">
            <option v-for="item of groups" :value="item">{{ item.nick_name }}</option>
          </select>
        </div>
      </div>
      <table>
        <tr>
          <th>成员昵称</th>
          <th>群内昵称</th>
          <th>所属群</th>
          <th>所属托管账号</th>
        </tr>
        <tr v-for="item of members">
          <td>{{ item.nick_name }}</td>
          <td>{{ item.display_name }}</td>
          <td>{{ getGroup(item) }}</td>
          <td>{{ getAccount(item) }}</td>
        </tr>
      </table>
    </div>
    <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Group } from '../api'

const Paginator = resolve => require(['./Paginator'], resolve)

export default {
  name: 'Member',
  data () {
    return {
      currentAccount: null,
      currentGroup: null,
      groups: [],
      members: [],
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
    getAccount (member) {
      for (let item of this.accounts) {
        if (member.uin === item.uin) {
          return item.nick_name
        }
      }
    },
    getGroup (member) {
      for (let item of this.groups) {
        if (member.group_id === item.group_id) {
          return item.nick_name
        }
      }
    },
    getMembers () {
      Group.getMembers({
        access_token: this.token,
        uin: this.currentAccount.uin,
        group_id: this.currentGroup.group_id,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        this.members = data.items
        this.count = data.count
      }, data => {
        this.members = []
        this.addAlertMessage({ type: 'error', message: '获取成员列表失败，请重试！' })
      })
    },
    getGroups () {
      Group.getGroups({
        uin: this.currentAccount.uin,
        access_token: this.token,
        limit: 500
      }).then(data => {
        this.groups = [{ nick_name: '全部' }].concat(data.items)
        this.currentGroup = this.groups[0]
      })
    },
    onPageChanged ({ offset, limit }) {
      this.offset = offset
      this.limit = limit
      this.getMembers()
    }
  },
  watch: {
    currentAccount () {
      this.members = []
      this.offset = 0
      this.getGroups()
    },
    async currentGroup () {
      this.showPaginator = false
      this.members = []
      this.offset = 0
      await this.getMembers()
      this.showPaginator = true
    }
  },
  components: {
    Paginator
  },
  mounted () {
    this.currentAccount = this.accounts[0]
    Group.getMembers({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.count = count
    })
  }
}
</script>

<style lang="less">
.member {
  .member-box {
    padding: 30px 40px 35px;
    margin-bottom: 35px;
    .member-box-header {
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
          margin-right: 25px;
          &:last-of-type {
            margin-right: 0;
          }
          &:focus {
            border-color: #5598ed;
          }
        }
      }
    }
  }
}
</style>
