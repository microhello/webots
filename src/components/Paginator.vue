<template>
  <ul class="paginator unselectable">
    <li>
      <a class="prev-page" :class="{ 'disabled': firstPage }" @click="prevPage"><i class="iconfont">&#xe61c;</i></a>
    </li>
    <li v-for="pageIndex of pageList">
      <a class="page-btn" :class="{ 'active': pageIndex === pageNum }" @click="changePage(pageIndex)"></a>
    </li>
    <li>
      <a class="next-page" :class="{ 'disabled': lastPage }" @click="nextPage"><i class="iconfont">&#xe61a;</i></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Paginator',
  data () {
    return {
      pageNum: 1,
      pageSize: this.defaultPageSize
    }
  },
  props: {
    defaultPageSize: {
      type: Number,
      default: 10
    },
    itemCount: {
      type: Number,
      default: 0
    },
    displayPageIndexLength: {
      type: Number,
      default: 9
    }
  },
  computed: {
    pageCount () {
      return this.itemCount > 0 ? Math.ceil(this.itemCount / this.pageSize) : 1
    },
    firstPage () {
      return this.pageNum <= 1
    },
    lastPage () {
      return this.pageNum >= this.pageCount
    },
    pageList () {
      let current = this.pageNum
      let length = this.pageCount
      let displayLength = this.displayPageIndexLength
      let indexes = []
      let intHalfOfLength = parseInt(displayLength / 2)
      let start, end
      if (intHalfOfLength === displayLength / 2) {
        start = current - intHalfOfLength + 1
        end = current + intHalfOfLength
      } else {
        start = current - intHalfOfLength
        end = current + intHalfOfLength
      }
      // let start = Math.round(current - displayLength / 2)
      // let end = Math.round(current + displayLength / 2)
      if (start <= 1) {
        start = 1
        end = displayLength
        if (end > length) {
          end = length
        }
      }
      if (end > length) {
        end = length
        start = end - displayLength + 1
        if (start <= 1) {
          start = 1
        }
      }
      for (let i = start; i <= end; i++) {
        indexes.push(i)
      }
      return indexes
    }
  },
  methods: {
    changePage (newPageNum) {
      if (this.pageNum === newPageNum) {
        this.$emit('page-changed', {
          offset: (newPageNum - 1) * this.pageSize,
          limit: this.pageSize
        })
        return
      }
      this.pageNum = newPageNum
    },
    prevPage () {
      if (this.firstPage) {
        return
      }
      this.pageNum--
    },
    nextPage () {
      if (this.lastPage) {
        return
      }
      this.pageNum++
    }
  },
  watch: {
    pageNum (newPageNum) {
      this.$emit('page-changed', {
        offset: (newPageNum - 1) * this.pageSize,
        limit: this.pageSize
      })
    }
  }
}
</script>

<style lang="less">
@active-color: #5598ed;
@inactive-color: #cfcfcf;
.paginator {
  display: table;
  margin: 0 auto;
  line-height: 50px;
  font-size: 0;
  li {
    display: inline-block;
    vertical-align: middle;
    .prev-page, .next-page {
      display: inline-block;
      vertical-align: middle;
      line-height: 20px;
      i {
        font-size: 20px;
        vertical-align: middle;
        color: @active-color;
      }
    }
    .prev-page {
      margin: 0 30px 0 15px;
    }
    .next-page {
      margin: 0 15px 0 30px;
    }
    .page-btn {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
      text-align: center;
      width: 18px;
      height: 8px;
      line-height: 8px;
      border-radius: 4px;
      background-color: @inactive-color;
    }
    a.active {
      background-color: @active-color;
    }
    a.disabled {
      cursor: default;
      i {
        color: @inactive-color;
      }
    }
  }
}
</style>
