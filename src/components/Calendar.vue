<template>
  <div class="calendar">
    <h1 class="header">
      <i class="iconfont left" @click="prevMonth">&#xe778;</i>
      <span>{{ calendar.year }}年{{ calendar.month + 1 }}月</span>
      <i class="iconfont right" @click="nextMonth">&#xe7c0;</i>
    </h1>
    <div class="calendar-content">
      <h2 class="calendar-row">
        <span class="calendar-item">日</span>
        <span class="calendar-item">一</span>
        <span class="calendar-item">二</span>
        <span class="calendar-item">三</span>
        <span class="calendar-item">四</span>
        <span class="calendar-item">五</span>
        <span class="calendar-item">六</span>
      </h2>
      <p class="calendar-row">
        <a
          v-for="item of dates"
          class="calendar-item"
          :class="{ 'active': active(item)}"
          @click="select($event, item)"
          :disabled="new Date(item.year, item.month, item.date) > today"
          :otherMonth="item.month !== calendar.month"
        >{{ item.date }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    currentDate: Date
  },
  data () {
    return {
      calendar: {
        year: this.currentDate.getFullYear(),
        month: this.currentDate.getMonth(),
        date: this.currentDate.getDate()
      },
      now: new Date()
    }
  },
  computed: {
    dates () {
      let dates = []
      let date = new Date(this.calendar.year, this.calendar.month, 1)   // 这个月第一天Date
      let firstDay = date.getDay()                                      // 这个月第一天星期
      date.setDate(0)                                                   // date设为上个月最后一天
      let lastDatePrev = date.getDate()                                 // 上个月最后一天日期
      for (let i = 0, year = date.getFullYear(), month = date.getMonth(); i < firstDay; i++) {
        dates.unshift({
          year: year,
          month: month,
          date: lastDatePrev - i
        })
      }
      date = new Date(this.calendar.year, this.calendar.month + 1, 0)   // 这个月最后一天Date
      let lastDateThis = date.getDate()                                 // 这个月最后一天日期
      let lastDay = date.getDay()                                       // 这个月最后一天星期
      for (let i = 1, year = date.getFullYear(), month = date.getMonth(); i <= lastDateThis; i++) {
        dates.push({
          year: year,
          month: month,
          date: i
        })
      }
      date = new Date(this.calendar.year, this.calendar.month + 1, 1)   // 下个月第一天Date
      for (let i = 1, remainDay = 6 - lastDay, year = date.getFullYear(), month = date.getMonth(); i <= remainDay; i++) {
        dates.push({
          year: year,
          month: month,
          date: i
        })
      }
      return dates
    },
    today () {
      return new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate())
    }
  },
  methods: {
    select (event, date) {
      if (event.target.attributes.disabled) {
        return
      }
      if (event.target.attributes.otherMonth) {
        this.calendar.year = date.year
        this.calendar.month = date.month
        return
      }
      this.$emit('selected', new Date(date.year, date.month, date.date))
    },
    prevMonth () {
      if (this.calendar.month > 0) {
        this.calendar.month--
      } else {
        this.calendar.month = 11
        this.calendar.year--
      }
    },
    nextMonth () {
      if (this.calendar.month < 11) {
        this.calendar.month++
      } else {
        this.calendar.month = 0
        this.calendar.year++
      }
    },
    active (item) {
      return item.year === this.currentDate.getFullYear() && item.month === this.currentDate.getMonth() && item.date === this.currentDate.getDate()
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/colors";

.calendar {
  background-color: #fff;
  border: 1px solid rgba(153, 153, 153, 0.35);
  -webkit-box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  -moz-box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  box-shadow: 0px 1px 5px rgba(153, 153, 153, 0.35);
  line-height: 45px;
  width: 400px;
  cursor: default;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  padding: 20px;
  .header {
    text-align: center;
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: box;              /* OLD - Android 4.4- */
    -webkit-box-pack: space-between;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    padding: 0 15px;
    .iconfont {
      font-size: 32px;
      cursor: pointer;
    }
  }
  .calendar-content {
    padding: 0 20px;
    .calendar-row {
      text-align: center;
      display: -webkit-flex;     /* NEW - Chrome */
      display: flex;
      display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;      /* TWEENER - IE 10 */
      display: box;              /* OLD - Android 4.4- */
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      .calendar-item {
        -webkit-flex: auto;        /* Chrome */
        -ms-flex: auto;            /* IE 10 */
        flex: auto;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
        -webkit-box-flex: auto;    /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: auto;       /* OLD - Firefox 19- */
        width: 14.2857%;
        &[disabled], &[otherMonth] {
          color: @main-dashed-color;
        }
        &[disabled] {
          cursor: default;
        }
      }
      .active {
        border-radius: 50%;
        color: #fff;
        background-color: @main-text-color-failure;
      }
    }
  }
}
</style>
