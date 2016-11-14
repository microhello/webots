<template>
  <div class="message" @click="action">
    <date-selector class="date-selector" @selected="selected"></date-selector>
    <div class="message-content">
      <div class="message-line" v-for="item of messages">
        <h2 class="sub-title">{{ item.create_time | formatDate }} | {{ item.sender_name }}:</h2>
        <p v-transcoding:br>{{ item.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const DateSelector = resolve => require(['../components/DateSelector'], resolve)

export default {
  name: 'Message',
  data () {
    return {
      time: {
        start: null,
        end: null
      }
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
      messages: state => state.message.items,
      groups: state => state.group.items
    })
  },
  methods: {
    setMessages () {
      if (!this.payload.uin || !this.payload.receiver_name) {
        return
      }
      this.$store.dispatch('setMessages', this.payload)
    },
    selected (event) {
      this.time.start = parseInt(new Date(event.getFullYear(), event.getMonth(), event.getDate()) / 1000)
      this.time.end = parseInt(new Date(event.getFullYear(), event.getMonth(), event.getDate() + 1) / 1000)
    },
    action () {
      console.log(this.$el.clientHeight)
    }
  },
  watch: {
    payload (newVal) {
      this.setMessages()
    }
  },
  components: {
    DateSelector
  },
  created () {
    if (this.groups.length === 0) {
      this.$store.dispatch('setGroups', { uin: this.query.uin })
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.message {
  min-height: 500px;
  padding: 20px 10px;
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
    margin-bottom: 45px;
    padding: 0 16px;
    line-height: normal;
    background-color: @main-background-color;
    overflow-y: scroll;
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
