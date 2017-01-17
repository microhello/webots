<template>
  <ul class="app-header">
    <li class="app-header-brand shadow-box">
      <img src="../assets/image/logo/02.jpg" />
    </li>
    <li class="app-header-search shadow-box clearfix">
      <input type="text" name="keywords" placeholder="搜索关键词：多个关键词使用“+”或“,”分隔" v-model="keywords" @keyup.enter="search" />
      <i class="iconfont" @click="search">&#xe66f;</i>
    </li>
    <li class="app-header-account shadow-box">
      <span>
        <a @click="showAddAccount = true"><i class="iconfont">&#xe67d;</i> 添加账号</a>
      </span>
      <modal v-if="showAddAccount" @close="closeAddAccount">
        <add-account></add-account>
      </modal>
      <span>
        <a @click="showDropdown = true">{{ username }} <i class="iconfont" style="font-size: 12px;">&#xe611;</i></a>
      </span>
      <ul class="account-dropdown shadow-box" @click="showDropdown = false" v-show="showDropdown">
        <li @click="Logout">退出</li>
        <div class="dropdown-wrapper"></div>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as types from '../store/types'

const AddAccount = resolve => require(['./AddAccount'], resolve)
const Modal = resolve => require(['./Modal'], resolve)

export default {
  name: 'AppHeader',
  data () {
    return {
      keywords: '',
      username: 'wemiyun',
      showDropdown: false,
      showAddAccount: false
    }
  },
  methods: {
    closeAddAccount () {
      this.showAddAccount = false
      this.getAccounts()
    },
    search () {
      this.keywords = this.keywords.replace(/^[+,]+|[+,]+$/g, '').replace(/[+,]{2,}/g, $ => $[0])
      if (this.keywords === '' || this.$route.name === 'Login') {
        return
      }
      this.addTab({
        title: '搜索：' + this.keywords,
        data: {
          keywords: this.keywords
        },
        type: 'search'
      })
      this.keywords = ''
    },
    async Logout () {
      await this.logout()
      window.location.reload()
    },
    ...mapMutations({
      addTab: types.ADD_TAB
    }),
    ...mapActions({
      logout: 'logout',
      getAccounts: 'setAccounts'
    })
  },
  components: {
    AddAccount,
    Modal
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.app-header {
  padding: 15px 0;
  background-color: #fff;
  padding-right: 40px;
  font-size: 0;
  line-height: 45px;
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: box;              /* OLD - Android 4.4- */
  -webkit-box-pack: space-between;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -ms-justify-content: space-between;
  -o-justify-content: space-between;
  justify-content: space-between;
  & > li {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    height: 45px;
    line-height: 45px;
  }
  .app-header-brand {
    width: 180px;
    text-align: center;
    img {
      height: 25px;
      vertical-align: middle;
    }
  }
  .app-header-search {
    min-width: 300px;
    width: 40%;
    position: relative;
    input[type=text] {
      display: block;
      font-size: 12px;
      padding: 0 45px 0 15px;
      width: 100%;
      height: 45px;
      border-radius: 5px;
      border: 1px solid #fff;
      outline: 0;
      -webkit-transition: border-color .3s;
      -moz-transition: border-color .3s;
      -ms-transition: border-color .3s;
      -o-transition: border-color .3s;
      transition: border-color .3s;
      &::placeholder {
        color: #d1d1d1;
      }
      &:focus {
        border-color: #5598ed;
      }
    }
    i {
      font-size: 18px;
      color: #333;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 5px 5px 0;
      width: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      cursor: pointer;
    }
  }
  .app-header-account {
    float: right;
    font-size: 0;
    position: relative;
    & > span {
      font-size: 12px;
      display: inline-block;
      width: 120px;
      height: 25px;
      line-height: 25px;
      vertical-align: middle;
      text-align: center;
      border-right: 1px solid #d1d1d1;
      &:last-of-type {
        border-right: 0;
      }
    }
    .account-dropdown {
      width: 120px;
      position: absolute;
      top: 45px;
      right: 0;
      z-index: 10000;
      border-radius: 0;
      li {
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
        position: relative;
        z-index: 10000;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        &:last-of-type {
          border-bottom: 0;
        }
      }
      .dropdown-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
      }
    }
  }
}
</style>
