<template>
  <div class="app-header">
    <h1 class="header-title">{{ title }}</h1>
    <div class="header-search">
      <input type="text" name="keywords" placeholder="搜索关键词：多个关键词使用“+”或“,”分隔" v-model="keywords" @keyup.enter="search" />
      <i class="button iconfont" @click="search">&#xe620;</i>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AppHeader',
  data () {
    return {
      title: '微信群助理机器人',
      keywords: ''
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
    ...mapMutations({
      addTab: types.ADD_TAB
    })
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.app-header {
  background-color: #fff;
  line-height: 60px;
  .header-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    font-weight: bold;
    padding: 0 20px;
  }
  .header-search {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    input[type=text] {
      width: 300px;
      height: 30px;
      border: 1px solid @main-border-color;
      border-radius: 15px;
      background-color: @main-background-color;
      outline: 0;
      padding: 0 40px 0 15px;
    }
    i {
      color: #707070;
      position: absolute;
      top: 50%;
      right: 15px;
      display: inline-block;
      line-height: normal;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
}
</style>
