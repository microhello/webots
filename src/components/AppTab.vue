<template>
  <ul class="tab">
    <li v-for="item of tabs" :class="{ 'active': active === item }" @click="setActiveTab(item)" :title="item.title">
      <span>{{ item.title }}</span>
      <i class="iconfont" v-if="item.type !== 'root'" @click.stop="delTab(item)">&#xe601;</i>
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
        case 'Mass':
          this.renameTab({ tab: this.root, title: '群发信息' })
          break
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.tab {
  height: 60px;
  line-height: 60px;
  overflow-y: hidden;
  background-color: #fff;
  display: box;              /* OLD - Android 4.4- */
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;
  li {
    width: 130px;
    font-size: 14px;
    text-align: center;
    position: relative;
    cursor: pointer;
    padding: 0 26px;
    i {
      color: #939393;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      height: 16px;
      line-height: 15px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:hover {
        border-radius: 50%;
        color: #fff!important;
        background-color: #d81e06;
      }
    }
    span {
      display: inline-block;
      position: relative;
      color: #939393;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
      -webkit-transition: color .3s;
      -moz-transition: color .3s;
      -ms-transition: color .3s;
      -o-transition: color .3s;
      transition: color .3s;
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        background-color: #5598ed;
        position: absolute;
        bottom: -3px;
        -webkit-transition: bottom .3s;
        -moz-transition: bottom .3s;
        -ms-transition: bottom .3s;
        -o-transition: bottom .3s;
        transition: bottom .3s;
      }
    }
    &.active {
      span {
        color: #333;
        &::after {
          bottom: 0;
        }
      }
      i {
        color: #333;
      }
    }
    &:hover {
      i {
        transform: translateY(-50%) rotate(90deg);
      }
    }
    // &, & i {
    //   -webkit-transition: all .3s;
    //   -moz-transition: all .3s;
    //   -ms-transition: all .3s;
    //   -o-transition: all .3s;
    //   transition: all .3s;
    // }
    // &.active, &:hover {
    //   background-color: #fff;
    //   i {
    //     opacity: 1;
    //   }
    // }
    // &.active {
    //   border-top: 2px solid @active-background-color;
    // }
    // p {
    //   padding-right: 20px;
    //   word-break: keep-all;
    //   white-space: nowrap;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    // }
    // i {
    //   display: inline-block;
    //   height: 16px;
    //   line-height: 16px;
    //   position: absolute;
    //   top: 50%;
    //   right: 10px;
    //   transform: translateY(-50%);
    //   cursor: pointer;
    //   opacity: 0;
    // }
  }
}
</style>
