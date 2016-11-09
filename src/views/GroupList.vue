<template>
  <div class="table">
    <div class="table-header">
      <span class="title">机器人:{{currentAccount.nick_name}}</span>
      <i class="status on" v-if="currentAccount.online">在线</i>
      <i class="status off" v-else>离线</i>
    </div>
    <div class="table-content">
      <table>
        <tr>
          <th>群名称</th>
          <th>人数</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in groups">
          <td>{{item.nick_name}}</td>
          <td>{{item.member_count}}</td>
          <td><router-link :to="{ path: '/home/message', query: { uin: item.uin, receiver_name: item.nick_name } }" class="action">查看</router-link></td>
        </tr>
      </table>
    </div>
    <div class="table-footer">
      <a class="page-button">上一页</a>
      <a class="page-button">下一页</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GroupList',
  computed: {
    uin () {
      return this.$route.query.uin
    },
    currentAccount () {
      for (let item of this.$store.state.account.items) {
        if (item.uin === this.uin) {
          return item
        }
      }
    },
    ...mapState({
      groups: state => state.group.items
    })
  },
  methods: {
    getGroupList (uin) {
      if (!uin) {
        return
      }
      this.$store.dispatch('getGroupList', {
        uin: uin
      })
    }
  },
  watch: {
    uin (newVal) {
      this.getGroupList(newVal)
    }
  },
  mounted () {
    this.getGroupList(this.uin)
  }
}
</script>

<style lang="less">
</style>
