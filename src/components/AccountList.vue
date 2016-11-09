<template>
  <div class="account-list">
    <h2 class="account-list-title account-list-item">
      <i class="iconfont">&#xe64c;</i>
      <span>机器人</span>
    </h2>
    <ul class="account-list-list">
      <router-link
        v-for="item of accounts" 
        :to="{ path: '/home/group-list', query: { uin: item.uin } }"
        class="account-list-item clearfix"
        :class="{ 'active': item.uin === uin }"
        tag="li"
      >
        <i class="iconfont" :class="item.online ? 'icon-zaixian' : 'icon-lixian'"></i>
        <span>{{ item.nick_name }}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountList',
  computed: {
    uin () {
      return parseInt(this.$route.query.uin)
    },
    ...mapState({
      accounts: state => state.account.items
    })
  },
  methods: {
    ...mapActions({
      setAccounts: 'setAccounts'
    })
  },
  async mounted () {
    await this.setAccounts()
    if (!this.uin) {
      this.$router.replace({
        path: '/home/group-list',
        query: {
          uin: this.accounts[0].uin
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.account-list {
  border-right: 1px solid @main-border-color;
  .account-list-item {
    line-height: 35px;
    font-size: 0;
    i {
      font-size: 20px;
      float: left;
    }
    span {
      font-size: 14px;
      display: block;
      margin-left: 30px;
    }
    i, span {
      cursor: default;
      vertical-align: top;
    }
  }
  .account-list-title {
    padding: 20px 32px 0;
    i {
      color: #c0c0c0;
    }
    span {
      font-size: 16px;
    }
  }
  .account-list-list {
    .active {
      color: #fff;
      background-color: @active-background-color;
    }
    li {
      padding-left: 30%;
      -webkit-transition: background-color .3s;
      -moz-transition: background-color .3s;
      -ms-transition: background-color .3s;
      -o-transition: background-color .3s;
      transition: background-color .3s;
      span {
        -webkit-transition: color .3s;
        -moz-transition: color .3s;
        -ms-transition: color .3s;
        -o-transition: color .3s;
        transition: color .3s;
      }
      .icon-zaixian {
        color: @main-text-color-success;
      }
      .icon-lixian {
        color: @main-text-color-failure;
      }
    }
  }
}
</style>
