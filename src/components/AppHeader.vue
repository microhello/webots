<template>
  <ul class="app-header clearfix">
    <li class="brand">
      <img src="../assets/image/logo/02.jpg" />
    </li>
    <li class="header-search">
      <input type="text" name="keywords" placeholder="搜索关键词：多个关键词使用“+”或“,”分隔" v-model="keywords" @keyup.enter="search" />
      <i class="button iconfont" @click="search">&#xe620;</i>
    </li>
    <li class="account-dropdown pull-right">
      <a @click="toggleDropdown">{{ username }}<i class="iconfont">&#xe601;</i></a>
      <ul class="dropdown" @click="toggleDropdown" v-show="showDropdown">
        <li @click="Logout">
          退出
        </li>
      </ul>
      <div class="dropdown-wrapper" @click="toggleDropdown" v-show="showDropdown"></div>
    </li>
    <li class="split pull-right">
      |
    </li>
    <li class="add-account pull-right">
      <i class="iconfont">&#xe622;</i>
      <a @click="showAddAccount = true">新增账号</a>
      <add-account v-if="showAddAccount" @cancel="showAddAccount = false"></add-account>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as types from '../store/types'

const AddAccount = resolve => require(['./AddAccount'], resolve)

export default {
  name: 'AppHeader',
  data () {
    return {
      title: '微信群助理机器人',
      keywords: '',
      username: 'wemiyun',
      showDropdown: false,
      showAddAccount: false
    }
  },
  methods: {
    search () {
      this.keywords = this.keywords.replace(/^[+,]+|[+,]+$/g, '').replace(/[+,]{2,}/g, $ => $[0])
      if (this.keywords === '' || this.$route.name === 'Login') {
        return
      }
      this.addTab({
        title: '搜索：' + this.keywords,
        value: this.keywords,
        type: 'search'
      })
      this.keywords = ''
    },
    async Logout () {
      await this.logout()
      window.location.reload()
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    },
    ...mapMutations({
      addTab: types.ADD_TAB
    }),
    ...mapActions(['logout'])
  },
  components: {
    AddAccount
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.app-header {
  background-color: #fff;
  line-height: 60px;
  padding: 0 40px;
  font-size: 0;
  li {
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
  }
  .brand {
    margin-right: 40px;
    img {
      height: 25px;
      vertical-align: middle;
    }
  }
  .header-search {
    display: inline-block;
    position: relative;
    input[type=text] {
      font-size: 12px;
      vertical-align: middle;
      width: 300px;
      height: 30px;
      border: 1px solid #ececec;
      border-radius: 5px;
      background-color: @main-background-color;
      outline: 0;
      padding-left: 45px;
      transition: border-color .2s;
      &:focus {
        border-color: #169bd5;
      }
      &::placeholder {
        color: #d1d1d1;
      }
    }
    i {
      color: #707070;
      position: absolute;
      top: 50%;
      left: 15px;
      display: inline-block;
      line-height: normal;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .split {
    color: #d7d7d7;
    margin: 0 20px;
  }
  li.add-account {
    i {
      display: inline-block;
      transform: translateY(-1px);
    }
  }
  .account-dropdown {
    position: relative;
    width: 100px;
    text-align: center;
    i {
      margin-left: 10px;
    }
    .dropdown {
      position: absolute;
      z-index: 500;
      width: 100%;
      line-height: 35px;
      background-color: #fff;
      -moz-box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.349019607843137);
      -webkit-box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.349019607843137);
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.349019607843137);
      li {
        display: block;
        font-size: 12px;
        cursor: default;
        &:hover {
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
    .dropdown-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 499;
    }
  }
}
</style>
