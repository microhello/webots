<template>
  <div class="group-list">
    <div class="title">
      <h2 class="title-name">{{ currentAccount.nick_name }}</h2>
      <span class="count">（{{ groups.length || 0 }}个群）</span>
    </div>
    <ul class="list-content">
      <router-link
        v-for="item of groups"
        :to="{ path: '/home/messages', query: { uin: item.uin, nick_name: item.nick_name } }"
        :class="{ 'active': item.nick_name === nick_name }"
        tag="li"
      >
        {{ item.nick_name }}（{{ item.member_count }}人）
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GroupList',
  computed: {
    uin () {
      return parseInt(this.$route.query.uin)
    },
    nick_name () {
      return this.$route.query.nick_name
    },
    currentAccount () {
      for (let item of this.accounts) {
        if (item.uin === this.uin) {
          return item
        }
      }
      return {}
    },
    ...mapState({
      groups: state => state.group.items,
      accounts: state => state.account.items
    })
  },
  methods: {
    setGroups () {
      if (!this.uin) {
        return
      }
      this.$store.dispatch('setGroups', { uin: this.uin })
    }
  },
  watch: {
    uin (newVal) {
      this.setGroups()
    },
    groups (newVal) {
      if (typeof this.nick_name === 'undefined') {
        this.$router.replace({
          path: '/home/messages',
          query: {
            uin: this.groups[0].uin,
            nick_name: this.groups[0].nick_name
          }
        })
      }
    }
  },
  mounted () {
    this.setGroups()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.group-list {
  position: relative;
  .title {
    .count {
      color: #868686;
    }
  }
  .list-content {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    li {
      line-height: 45px;
      padding: 0 20px;
      border-bottom: 1px solid @main-border-color;
      cursor: default;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:hover {
        background-color: rgba(48, 135, 181, .1);
      }
      &.active {
        background-color: rgba(48, 135, 181, .3);
      }
    }
  }
}
</style>
