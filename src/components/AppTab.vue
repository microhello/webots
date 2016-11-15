<template>
  <ul class="tab">
    <li v-for="item of tabs" :class="{ 'active': active === item }" @click="setActiveTab(item)">
      <span>{{ item.title }}</span>
      <i v-if="item.type !== 'root'" @click.stop="delTab(item)">x</i>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AppTab',
  computed: {
    ...mapState({
      tabs: state => state.tab.items,
      active: state => state.tab.active
    })
  },
  methods: {
    active (value) {
      this.$emit('active', value)
    },
    ...mapMutations({
      delTab: types.DEL_TAB,
      setActiveTab: types.ACTIVE
    })
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
  li {
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    width: 150px;
    text-align: center;
    cursor: default;
    background-color: #d7d7d7;
    position: relative;
    border-left: 3px solid #d7d7d7;
    &, & i {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }
    &.active, &:hover {
      background-color: #fff;
      border-color: @active-background-color;
      i {
        opacity: 1;
      }
    }
    span {
      display: block;
    }
    i {
      font-style: normal;
      display: inline-block;
      height: 10px;
      line-height: 10px;
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
