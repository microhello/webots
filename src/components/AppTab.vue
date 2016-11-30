<template>
  <ul class="tab">
    <li v-for="item of tabs" :class="{ 'active': active === item }" @click="setActiveTab(item)" :title="item.title">
      <p>{{ item.title }}</p>
      <i class="iconfont" v-if="item.type !== 'root'" @click.stop="delTab(item)">&#xe652;</i>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AppTab',
  computed: {
    root () {
      return this.tabs.filter(item => item.type === 'root')[0]
    },
    ...mapState({
      tabs: state => state.tab.items,
      active: state => state.tab.active
    })
  },
  methods: {
    ...mapMutations({
      delTab: types.DEL_TAB,
      setActiveTab: types.ACTIVE,
      renameTab: types.RENAME_TAB
    })
  },
  watch: {
    $route (newVal) {
      switch (newVal.name) {
        case 'Home':
          this.renameTab({ tab: this.root, title: '首页' })
          break
        case 'Account':
          this.renameTab({ tab: this.root, title: '账号' })
          break
        case 'Messages':
          this.renameTab({ tab: this.root, title: '群消息' })
          break
        case 'Watcher':
          this.renameTab({ tab: this.root, title: '群值守' })
          break
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.tab {
  height: 40px;
  line-height: 40px;
  overflow-y: hidden;
  font-size: 0;
  display: -webkit-flex;
  display: flex;
  li {
    flex-basis: 150px;
    max-width: 150px;
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    cursor: default;
    background-color: #d7d7d7;
    position: relative;
    &, & i {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }
    &.active, &:hover {
      background-color: #fff;
      i {
        opacity: 1;
      }
    }
    &.active {
      border-top: 2px solid @active-background-color;
    }
    p {
      padding-right: 20px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    i {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0;
    }
  }
}
</style>
