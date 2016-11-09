<template>
  <div class="table message">
    <div class="table-header">
      <span class="title">{{ query.receiver_name }}</span>
      <router-link :to="{ path: '/home/group-list', query: { uin: query.uin } }" class="back-button">返回</router-link>
    </div>
    <div class="message-content">
      <div class="message-line" v-for="item of messages">
        <h2 class="sub-title">{{ item.create_time | formatDate }} | {{ item.sender_name }}:</h2>
        <p>{{ item.message }}</p>
      </div>
    </div>
    <div class="table-footer">
      <a class="page-button">上一页</a>
      <a class="page-button">下一页</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Message',
  computed: {
    query () {
      return this.$route.query
    },
    ...mapState({
      messages: state => state.message.items
    })
  },
  methods: {
    setMessages (payload) {
      if (!payload.uin || !payload.receiver_name) {
        return
      }
      this.$store.dispatch('setMessages', payload)
    }
  },
  created () {
    this.setMessages(this.query)
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.message {
  min-height: 300px;
  position: relative;
  .message-content {
    padding: 10px 40px;
    margin-bottom: 45px;
    line-height: normal;
    .message-line {
      font-size: 12px;
      padding: 16px 0 16px 8px;
      border-bottom: 1px solid @main-border-color;
      word-wrap: break-word;
      .sub-title {
        font-size: 12px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
