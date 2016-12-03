<template>
  <div class="member">
    <div class="title">
      <p>群成员 （{{ membersCount }}人）</p>
    </div>
    <div class="member-content">
      <div class="selector">
        <label>托管账号</label>
        <select v-model="currentAccount">
          <option v-for="item of accounts" :value="item">{{ item.nick_name }}</option>
        </select>
        <label>所属群</label>
        <select v-model="currentGroup">
          <option v-for="item of groups" :value="item">{{ item.nick_name }}</option>
        </select>
      </div>
      <div class="table-box">
        <div class="table">
          <div class="table-head">
            <ul class="table-row">
              <li>成员昵称</li>
              <li>群内昵称</li>
              <li>所属群</li>
              <li>所属托管账号</li>
            </ul>
          </div>
          <div class="table-body" @scroll="nextPage">
            <ul class="table-row" v-for="item of members">
              <li>{{ item.nick_name }}</li>
              <li>{{ item.display_name }}</li>
              <li>{{ currentGroup.nick_name }}</li>
              <li>{{ currentAccount.nick_name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Group } from '../api'

export default {
  name: 'Member',
  data () {
    return {
      currentAccount: null,
      currentGroup: null,
      groups: [],
      members: [],
      offset: 0,
      limit: 20,
      membersCount: 0
    }
  },
  computed: {
    ...mapState({
      accounts: state => [{ nick_name: '全部' }].concat(state.account.items)
    }),
    ...mapGetters(['token'])
  },
  methods: {
    getMembers () {
      Group.getMembers({
        access_token: this.token,
        uin: this.currentAccount.uin,
        group_id: this.currentGroup.group_id,
        offset: this.offset,
        limit: this.limit
      }).then(data => {
        if (data.items.length < this.limit) {
          this.members.splice(this.offset, this.limit, ...data.items)
        } else {
          this.members = this.members.concat(data.items)
          this.offset += this.limit
        }
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
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0) {
        this.getMembers()
      }
    }
  },
  watch: {
    currentAccount () {
      this.members = []
      this.offset = 0
      this.getGroups()
    },
    currentGroup () {
      this.members = []
      this.offset = 0
      this.getMembers()
    }
  },
  mounted () {
    this.currentAccount = this.accounts[0]
    Group.getMembers({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.membersCount = count
    })
  }
}
</script>

<style lang="less">
@padding-left: 40px;
@title-height: 50px;
.member {
  .title {
    padding: 0 40px;
  }
  .member-content {
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
</style>
