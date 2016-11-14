<template>
  <div class="account-list">
    <div class="title">
      <h2 class="title-name">机器人</h2>
      <router-link to="/login" class="add-account" tag="span">增加账号</router-link>
    </div>
    <ul class="account-list-list">
      <router-link
        v-for="item of accounts"
        :to="{ path: '/home/group-list', query: { uin: item.uin } }"
        class="clearfix"
        :class="{ 'active': item.uin === uin }"
        tag="li"
      >
        <div class="status online" v-if="item.online"></div>
        <div class="status offline" v-else></div>
        <div class="account-name">{{ item.nick_name }}</div>
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
  async created () {
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
  .account-list-list {
    .active .account-name {
      color: @active-background-color;
      font-weight: bold;
    }
    li {
      padding: 0 10px 0 30px;
      line-height: 35px;
      cursor: default;;
      -webkit-transition: background-color .3s;
      -moz-transition: background-color .3s;
      -ms-transition: background-color .3s;
      -o-transition: background-color .3s;
      transition: background-color .3s;
      &:hover {
        color: @active-background-color;
      }
      div {
        -webkit-transition: color .3s;
        -moz-transition: color .3s;
        -ms-transition: color .3s;
        -o-transition: color .3s;
        transition: color .3s;
      }
      .status {
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
      }
    }
  }
}
</style>
