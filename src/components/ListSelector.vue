<template>
  <div class="list-selector">
    <div class="list-selector-item">
      <h1>{{ title.candidate }}</h1>
      <div class="list-box">
        <input type="text" placeholder="搜索" />
        <ul class="candidate-list">
          <li class="item" :class="{ 'current': currentItem === item }" v-for="item of items" @click="currentItem = item" v-show="!item.selected">{{ item.nick_name }}</li>
        </ul>
      </div>
    </div>
    <div class="list-selector-item">
      <ul class="actions">
        <li><a class="add-item" @click="add">添加</a></li>
        <li><a class="remove-item" @click="remove">删除</a></li>
      </ul>
    </div>
    <div class="list-selector-item">
      <h1>{{ title.selected }}</h1>
      <div class="list-box">
        <ul class="selected-list">
          <li class="item" :class="{ 'current': currentItem === item }" v-for="item of items" @click="currentItem = item" v-show="item.selected">{{ item.nick_name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListSelector',
  data () {
    return {
      currentItem: null
    }
  },
  props: {
    title: Object,
    items: Array
  },
  methods: {
    add () {
      this.$set(this.currentItem, 'selected', true)
    },
    remove () {
      this.$set(this.currentItem, 'selected', false)
    }
  }
}
</script>

<style lang="less">
.list-selector {
  padding: 30px;
  white-space: nowrap;
  font-size: 0;
  .list-selector-item {
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    h1 {
      font-size: 14px;
      line-height: 1;
      margin-bottom: 16px;
    }
    .list-box {
      width: 220px;
      height: 290px;
      line-height: 30px;
      padding: 15px 10px;
      border-width: 1px;
      border-style: solid;
      border-color: #d7d7d7;
      border-radius: 5px;
      position: relative;
      input[type="text"] {
        width: 100%;
        height: 30px;
        background-color: #f2f2f2;
        border-width: 1px;
        border-style: solid;
        border-color: #d7d7d7;
        border-radius: 5px;
        padding: 0 10px;
        outline: 0;
        &:focus {
          border-color: #61b0ff;
        }
      }
      ul {
        height: 100%;
        overflow: auto;
        li.item {
          padding: 0 10px;
          cursor: pointer;
          &:hover {
            background-color: #f2f2f2;
          }
          &.current {
            color: #fff;
            background-color: #169bd5;
          }
        }
        &.candidate-list {
          height: auto;
          position: absolute;
          top: 55px;
          bottom: 15px;
          left: 10px;
          right: 10px;
        }
      }
    }
    .actions {
      margin: 30px 10px 0;
      li {
        margin-bottom: 15px;
        a {
          display: block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
          &.add-item {
            color: #fff;
            background-color: #169bd5;
          }
          &.remove-item {
            background-color: #f2f2f2;
          }
        }
      }
    }
  }
}
</style>
