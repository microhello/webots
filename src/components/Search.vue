<template>
  <div class="search">
    <div class="search-content">
      <div class="search-content-header border-box">
        <h1 class="search-keywords">搜索"<span :title="keywords">{{ keywords }}</span>"</h1>
        <span>共{{ count }}条</span>
      </div>
      <ul class="messages-list">
        <li class="messages-list-item border-box" v-for="item of messages">
          <div class="messages-list-item-header">
            <h1>{{ item.sender_name }}</h1>
            <p class="clearfix">
              <span class="message-from">来自：{{ item.receiver_name }}</span>
              <span class="message-date">{{ item.create_time | formatDate }}</span>
            </p>
          </div>
          <div class="messages-list-item-body">
            <message :message="item.message" :keyword="keywords"></message>
          </div>
        </li>
        <div class="messages-none border-box" v-show="count === 0">
          没有找到相关消息
        </div>
      </ul>
      <paginator class="border-box" :default-page-size="limit" :item-count="count" @page-changed="onPageChanged" v-if="showPaginator"></paginator>
    </div>
  </div>
</template>

<script>
import { Message as MessageApi } from '../api'
import { mapGetters } from 'vuex'

const Message = resolve => require(['./Message'], resolve)
const Paginator = resolve => require(['./Paginator'], resolve)

export default {
  name: 'Search',
  props: {
    keywords: String
  },
  data () {
    return {
      messages: [],
      offset: 0,
      limit: 10,
      count: 0,
      showPaginator: true
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    getMessages () {
      MessageApi.getMessages({
        keywords: this.keywords,
        offset: this.offset,
        limit: this.limit,
        access_token: this.token
      }).then(data => {
        this.messages = data.items
        this.count = data.count
      })
    },
    onPageChanged ({ offset, limit }) {
      this.offset = offset
      this.limit = limit
      this.getMessages()
    }
  },
  components: {
    Message,
    Paginator
  },
  mounted () {
    this.getMessages()
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.search {
  .search-content {
    .search-content-header {
      padding: 12px 25px;
      margin-bottom: 10px;
      font-size: 0;
      h1 {
        font-size: 16px;
        display: inline-block;
        vertical-align: baseline;
        margin-right: 10px;
        span {
          color: #d81e06;
          display: inline-block;
          vertical-align: top;
          max-width: 200px;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      & > span {
        font-size: 12px;
        display: inline-block;
        vertical-align: baseline;
      }
    }
    .messages-list {
      margin-bottom: 35px;
      .messages-list-item {
        padding: 0 25px;
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .messages-list-item-header {
          padding-top: 10px;
          border-bottom: 1px solid #a3a3a3;
          h1 {
            font-size: 14px;
            line-height: 25px;
          }
          p {
            line-height: 20px;
            font-size: 12px;
            color: #a3a3a3;
            .message-from {
              float: left;
            }
            .message-date {
              float: right;
            }
          }
        }
        .messages-list-item-body {
          line-height: 20px;
          font-size: 12px;
          padding: 15px 0;
          mark {
            color: #d81e06;
            background-color: transparent;
          }
        }
      }
      .messages-none {
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>
