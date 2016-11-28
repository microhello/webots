<template>
  <div class="group-list">
    <div class="title clearfix">
      <p>我的群</p>
      <p class="pull-right">
        共<span class="count">{{ groupsCount }}</span>个群
      </p>
    </div>
    <ul class="account-list">
      <template v-for="account of accounts">
        <li @click="toggleSubList(account)">
          <i class="iconfont" :class="account.showGroups ? 'icon-xiangxia' : 'icon-1-copy-copy'"></i>{{ account.nick_name }}
        </li>
        <ul class="sub-list">
          <router-link v-for="group of account.groups" :to="{ path: '/main/messages', query: { uin: account.uin, nick_name: group.nick_name } }" tag="li">
            {{ group.nick_name || '（未命名）' }}
          </router-link>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Group } from '../api'

export default {
  name: 'GroupList',
  data () {
    return {
      groupsCount: 0
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.account.items
    }),
    ...mapGetters(['token'])
  },
  methods: {
    async toggleSubList (item) {
      if (item.showGroups) {
        this.$set(item, 'groups', [])
      } else {
        let groups = await Group.getGroups({
          uin: item.uin,
          access_token: this.token
        })
        this.$set(item, 'groups', groups.items)
      }
      this.$set(item, 'showGroups', !item.showGroups)
    }
  },
  mounted () {
    Group.getGroups({ access_token: this.token, limit: 0 }).then(({ count }) => {
      this.groupsCount = count
    })
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.group-list {
  position: relative;
  .title {
    p {
      display: inline-block;
    }
    .count {
      color: #169BD5;
    }
  }
  .account-list {
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
    .sub-list {
      li {
        padding: 0 20px 0 40px;
      }
    }
  }
}
</style>
