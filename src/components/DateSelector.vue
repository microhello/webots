<template>
  <div class="date-selector">
    <calendar class="calendar" v-if="showCalendar" :currentDate="currentDate" @selected="selected"></calendar>
    <div class="calendar-wrapper" v-if="showCalendar" @click="showCalendar = false"></div>
    <ul class="date-selector-list">
      <li v-for="(item, index) of dates" :class="{ 'active': item === currentDate }" @click="currentDate = item" :key="item.toLocaleDateString()">
        {{ ('0' + (item.getMonth() + 1)).slice(-2) }}-{{ ('0' + item.getDate()).slice(-2) }}
        <span v-show="now.toLocaleDateString() === item.toLocaleDateString()">今天</span>
      </li>
      <li class="select-date" key="calendar">
        <span class="label">请选择日期</span>
        <i class="button iconfont" @click="showCalendar = true">&#xe674;</i>
      </li>
    </ul>
    <div class="date-selector-detail">
      <!-- <a class="button more" @click="showMoreData" v-if="!showMore">
        更多数据<i class="iconfont">&#xe601;</i>
      </a>
      <a class="button more" @click="showMoreData" v-else>
        收起<i class="iconfont">&#xe630;</i>
      </a> -->
      <div class="detail-row">
        <div class="label">
          已经显示消息：
        </div>
        <div class="info">{{ $store.state.message.items.length }}条</div>
      </div>
      <template v-if="showMore">
        <hr class="detail-row" />
        <div class="detail-row">
          <div class="label">
            按消息发送者：
          </div>
          <div class="info">
            <span class="count">其他成员 0</span>
            <span class="count">我 0</span>
            <span class="count">系统消息 0</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="label">
            按消息内容：
          </div>
          <div class="info">
            <span class="count">文本 0</span>
            <span class="count">图片 0</span>
            <span class="count">语音 0</span>
            <span class="count">共享名片 0</span>
            <span class="count">分享链接 0</span>
            <span class="count">小视频 0</span>
            <span class="count">动画表情 0</span>
            <span class="count">其它 0</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const Calendar = resolve => require(['../components/Calendar'], resolve)

export default {
  name: 'DateSelector',
  data () {
    return {
      title: '微信群营销机器人管理',
      now: new Date(),
      currentDate: new Date(),
      showMore: false,
      showCalendar: false
    }
  },
  computed: {
    dates () {
      let dates = [this.currentDate]
      let right = 2
      for (; right > 0; right--) {
        let currentDate = dates[dates.length - 1]
        if (currentDate.toLocaleDateString() === this.now.toLocaleDateString()) {
          break
        }
        let nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
        dates.push(nextDate)
      }
      let left = right + 2
      for (; left > 0; left--) {
        let currentDate = dates[0]
        let prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1)
        dates.unshift(prevDate)
      }
      return dates
    }
  },
  methods: {
    selected (event) {
      this.currentDate = event
      this.showCalendar = false
    },
    showMoreData () {
      this.showMore = !this.showMore
      this.$nextTick(() => {
        this.$emit('height-changed', this.$el.scrollHeight)
      })
    }
  },
  watch: {
    currentDate (newVal) {
      this.$emit('selected', newVal)
    }
  },
  components: {
    Calendar
  },
  mounted () {
    this.$emit('selected', this.currentDate)
    this.$emit('height-changed', this.$el.scrollHeight)
  }
}
</script>

<style lang="less">
@import "../assets/less/colors";

.date-selector {
  font-size: 12px;
  position: relative;
  .calendar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200;
  }
  .calendar-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 199;
  }
  .date-selector-list {
    display: -webkit-flex; /* Safari */
    display: flex;
    border-width: 0 1px;
    border-style: solid;
    border-color: @main-border-color;
    height: 30px;
    li {
      flex-grow: 1;
      border-width: 1px 1px 0 0;
      border-style: solid;
      border-color: @main-border-color;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      cursor: default;
      &:last-child {
        border-right: 0;
      }
    }
    .active {
      flex-grow: 1.5;
      flex-shrink: 0;
      border-width: 1px 1px 0 1px;
      border-style: solid;
      border-color: @main-text-color-success;
      transform: translateX(-1px);
      position: relative;
      z-index: 99;
    }
    .select-date {
      font-size: 0;
      position: relative;
      .label {
        font-size: 12px;
        vertical-align: text-bottom;
        margin-right: 10px;
      }
      .iconfont {
        font-size: 22px;
        vertical-align: text-bottom;
        color: #1296db;
        cursor: pointer;
      }
    }
  }
  .date-selector-detail {
    border: 1px solid @main-text-color-success;
    transform: translateY(-1px);
    background-color: #fff;
    padding: 20px 30px;
    hr {
      margin: 0;
      border-width: 1px 0 0;
      border-style: dashed;
      border-color: @main-dashed-color;
    }
    .detail-row {
      margin-bottom: 15px;
      .label {
        float: left;
        width: 100px;
      }
      .info {
        margin-left: 100px;
        .count {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .more {
      display: inline-block;
      width: 100px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      background-color: @active-background-color;
      position: absolute;
      right: 0;
      bottom: 0;
      .iconfont {
        font-size: 12px;
      }
    }
  }
}
</style>
