<template>
  <div class="table message">
    <div class="table-header">
      <span class="title">{{ currentGroup.nick_name }}{{ '(' + currentGroup.member_count + '人)'}}</span>
      <router-link :to="{ path: '/home/group-list', query: { uin: query.uin } }" class="back-button">返回</router-link>
    </div>
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
    currentGroup () {
      for (let item of this.groups) {
        if (item.nick_name === this.query.receiver_name && item.uin === this.query.uin) {
          return item
        }
      }
      return {}
    },
    payload () {
      return {
        uin: this.query.uin,
        receiver_name: this.query.receiver_name,
        start_time: this.time.start,
        end_time: this.time.end
      }
    },
    // messages () {
    //   return [{
    //     account_id: '@3570627337074279f499d3898abae5eb28762fe6eed75c937c99278c3f2f443d',
    //     create_time: 1478794504,
    //     message: '<div></div>\n\n\n\n',
    //     msg_id: '6739472728310394156',
    //     msg_type: 3,
    //     receiver_name: '💟皮皮果最爱稻草人💟提问群',
    //     sender_name: '多多'
    //   }]
    // },
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
  .date-selector {
    margin: 20px 40px 0;
  }
  .message-content {
    margin: 20px 40px;
    margin-bottom: 45px;
    padding: 0 16px;
    line-height: normal;
    background-color: @main-background-color;
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
