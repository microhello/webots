<template>
  <div class="account-list">
    <div class="title">
      <h2 class="title-name">机器人</h2>
      <span @click="addAccount" class="button add-account">增加账号</span>
    </div>
    <ul class="account-list-items">
      <router-link
        v-for="item of accounts"
        :to="{ path: '/home/message', query: { uin: item.uin } }"
        class="clearfix"
        :class="{ 'active': item.uin === uin }"
        tag="li"
      >
        <div class="account-status online" v-if="item.online"></div>
        <div class="account-status offline" v-else></div>
        <div class="account-name">{{ item.nick_name }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AccountList',
  computed: {
    uin () {
      return parseInt(this.$route.query.uin)
    },
    ...mapState({
      accounts: state => state.account.items,
      tabs: state => state.tab.items
    })
  },
  methods: {
    addAccount () {
      this.addTab({
        title: '增加账号',
        value: new Date().valueOf(),
        type: 'new-account'
      })
    },
    ...mapActions({
      setAccounts: 'setAccounts'
    }),
    ...mapMutations({
      addTab: types.ADD_TAB
    })
  },
  async mounted () {
    await this.setAccounts()
    if (!this.uin) {
      this.$router.replace({
        path: '/home/message',
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
  position: relative;
  .title {
    position: relative;
    .add-account {
      display: inline-block;
      width: 80px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background-color: @active-background-color;
      border-radius: 5px;
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
}

.account-list-items {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  .active .account-name {
    color: @active-background-color;
    font-weight: bold;
  }
  li {
    padding: 0 10px 0 30px;
    line-height: 35px;
    cursor: default;;
    &:hover {
      color: @active-background-color;
    }
    .account-status {
      float: left;
      &::before {
        color: #fff;
        font-size: 12px;
        text-align: center;
        display: inline-block;
        width: 35px;
        height: 20px;
        line-height: 20px;
      }
      &.online::before {
        content: "在线";
        background-color: @main-text-color-success;
      }
      &.offline::before {
        content: "离线";
        background-color: @main-text-color-failure;
      }
    }
    .account-name {
      margin-left: 45px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }
  }
}
</style>
