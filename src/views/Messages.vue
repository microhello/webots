<template>
  <div class="messages">
    <date-selector class="date-selector" @selected="selected" @height-changed="newTop"></date-selector>
    <div class="message-content" :style="{ 'top': messageContentTop + 'px' }" @scroll="nextPage">
      <div class="message-line" v-for="item of messages">
        <h2 class="sub-title">{{ item.create_time | formatDate }} | {{ item.sender_name }}:</h2>
        <message :message="item.message"></message>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/types'

const DateSelector = resolve => require(['../components/DateSelector'], resolve)
const Message = resolve => require(['../components/Message'], resolve)

export default {
  name: 'Messages',
  data () {
    return {
      time: {
        start: null,
        end: null
      },
      messageContentTop: 0
    }
  },
  computed: {
    query () {
      this.$route.query.uin = parseInt(this.$route.query.uin)
      return this.$route.query
    },
    payload () {
      return {
        uin: this.query.uin,
        receiver_name: this.query.nick_name,
        start_time: this.time.start,
        end_time: this.time.end
      }
    },
    ...mapState({
      messages: state => state.message.items
    })
  },
  methods: {
    setMessages () {
      if (typeof this.payload.uin === 'undefined' || typeof this.payload.receiver_name === 'undefined') {
        return
      }
      this.$store.dispatch('setMessages', this.payload)
    },
    selected (event) {
      this.time.start = parseInt(new Date(event.getFullYear(), event.getMonth(), event.getDate()) / 1000)
      this.time.end = parseInt(new Date(event.getFullYear(), event.getMonth(), event.getDate() + 1) / 1000)
    },
    newTop (newVal) {
      this.messageContentTop = newVal + 10
    },
    nextPage (event) {
      let offsetHeight = event.target.offsetHeight
      let scrollTop = event.target.scrollTop
      let scrollHeight = event.target.scrollHeight
      let scrollBottom = scrollHeight - scrollTop - offsetHeight
      // console.log(scrollBottom)
      if (scrollBottom === 0 && scrollTop !== 0) {
        this.setMessages()
      }
    },
    ...mapMutations({
      delMessages: types.DEL_MESSAGES
    })
  },
  watch: {
    payload () {
      this.delMessages()
      this.setMessages()
    }
  },
  components: {
    DateSelector,
    Message
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.messages {
  min-height: 500px;
  margin: 20px 10px;
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .date-selector {
    margin-bottom: 10px;
  }
  .message-content {
    padding: 0 16px;
    line-height: normal;
    background-color: @main-background-color;
    overflow-y: scroll;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    .message-line {
      font-size: 12px;
      padding: 16px 0;
      border-bottom: 1px solid #fff;
      word-wrap: break-word;
      .sub-title {
        font-size: 12px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
