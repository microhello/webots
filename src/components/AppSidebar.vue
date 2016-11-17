<template>
  <ul class="app-sidebar">
    <li>
      <i class="iconfont" @click="addAccount">&#xe600;</i>
    </li>
    <li>
      <i class="iconfont" @click="setActiveTab(root)">&#xe64c;</i>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AppSidebar',
  data () {
    return {
      title: '微信群营销机器人管理'
    }
  },
  computed: {
    root () {
      return this.tabs.filter(item => item.type === 'root')[0]
    },
    ...mapState({
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
    ...mapMutations({
      addTab: types.ADD_TAB,
      setActiveTab: types.ACTIVE
    })
  }
}
</script>

<style lang="less">
.app-sidebar {
  li {
    i {
      display: block;
      width: 30px;
      margin: 0 auto;
      font-size: 30px;
      color: #515151;
      cursor: default;
    }
  }
}
</style>
