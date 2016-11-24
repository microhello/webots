<template>
  <div class="group-list">
    <div class="title clearfix">
      <p>我的群</p>
      <p class="pull-right">
        共<span class="count">{{ groups.length || 0 }}</span>个群
      </p>
    </div>
    <!-- <ul class="list-content">
      <router-link
        v-for="item of groups"
        :to="{ path: '/home/messages', query: { uin: item.uin, nick_name: item.nick_name } }"
        :class="{ 'active': item.nick_name === nick_name }"
        tag="li"
      >
        {{ item.nick_name }}（{{ item.member_count }}人）
      </router-link>
    </ul> -->
    <ul class="account-list">
      <template v-for="item of accounts">
        <li @click="toggleSubList(item)">
          <i class="iconfont" :class="item.showGroups ? 'icon-xiangxia' :'icon-1-copy-copy'"></i>{{ item.nick_name }}
        </li>
        <ul class="sub-list" v-show="item.showGroups">
          <li>
            【地推人·上海1】🅰跨界社群
          </li>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GroupList',
  computed: {
    // uin () {
    //   return parseInt(this.$route.query.uin)
    // },
    // nick_name () {
    //   return this.$route.query.nick_name
    // },
    // currentAccount () {
    //   for (let item of this.accounts) {
    //     if (item.uin === this.uin) {
    //       return item
    //     }
    //   }
    //   return {}
    // },
    ...mapState({
      groups: state => state.group.items,
      accounts: state => state.account.items
    })
  },
  methods: {
    toggleSubList (item) {
      this.$set(item, 'showGroups', !item.showGroups)
      if (item.showGroups) {
        this.setGroups({
          uin: item.uin
        })
      }
    },
    ...mapActions(['setAccounts', 'setGroups'])
  },
  watch: {
    // groups (newVal) {
    //   if (typeof this.nick_name === 'undefined') {
    //     this.$router.replace({
    //       path: '/home/messages',
    //       query: {
    //         uin: this.groups[0].uin,
    //         nick_name: this.groups[0].nick_name
    //       }
    //     })
    //   }
    // }
  },
  mounted () {
    this.setAccounts()
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
