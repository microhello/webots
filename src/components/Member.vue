<template>
  <div class="member">
    <div class="title">
      <p>群成员</p>
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
import { mapState } from 'vuex'
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
      limit: 20
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      accounts: state => state.account.items
    })
  },
  methods: {
    async getMembers () {
      try {
        let data = await Group.getMembers({
          group_id: this.currentGroup.group_id,
          access_token: this.token,
          offset: this.offset,
          limit: this.limit
        })
        if (data.items.length < this.limit) {
          this.members.splice(this.offset, this.limit, ...data.items)
        } else {
          this.members = this.members.concat(data.items)
          this.offset += this.limit
        }
        console.log('getMembers success', this.members)
      } catch (err) {
        console.log('getMembers failure', err)
      }
    },
    async getGroups () {
      try {
        let data = await Group.getGroups({
          uin: this.currentAccount.uin,
          access_token: this.token,
          limit: 500
        })
        this.groups = data.items
        this.currentGroup = this.groups[0]
        console.log('getGroups success', this.groups)
      } catch (err) {
        console.log('getGroups failure', err)
      }
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
      this.getGroups()
    },
    currentGroup () {
      this.members = []
      this.offset = 0
      this.getMembers()
    }
  }
}
</script>

<style lang="less">
.member {
  .title {
    padding-left: 50px;
  }
  .member-content {
    position: absolute;
    top: 50px;
    right: 50px;
    bottom: 50px;
    left: 50px;
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
