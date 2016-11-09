<template>
  <div class="table">
    <div class="table-header">
      <span class="title">【地推人·上海1】🅰跨界社群</span>
      <router-link to="/home/group" class="back-button">返回群列表</router-link>
    </div>
    <div class="table-content">
      <table>
        <tr>
          <th>消息记录时间</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>2016-10-22      09:33</td>
          <td><router-link to="/message" class="action">查看</router-link></td>
        </tr>
        <tr v-for="n in 10">
          <td>2016-10-21      11:27</td>
          <td><a class="action">查看</a></td>
        </tr>
      </table>
    </div>
    <div class="table-footer">
      <a class="page-button">上一页</a>
      <a class="page-button">下一页</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageList'
  }
</script>

<style lang="less">
</style>
