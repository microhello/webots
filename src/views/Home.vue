<template>
  <div class="home clearfix">
    <account-list class="side-bar"></account-list>
    <group-list class="side-bar group-list"></group-list>
    <div class="side-content">
      <ul class="title nav">
        <li>
          <a>消息记录</a>
        </li>
        <li>
          <a>群成员</a>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const AccountList = resolve => require(['../components/AccountList'], resolve)
const GroupList = resolve => require(['../components/GroupList'], resolve)

export default {
  name: 'Home',
  components: {
    AccountList,
    GroupList
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.home {
  background: #fff;
  .side-bar {
    float: left;
    width: 200px;
    height: 100%;
    border-right: 1px solid @main-border-color;
    &.group-list {
      width: 290px;
    }
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid @main-border-color;
    .title-name {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
    }
  }
  .side-content {
    margin-left: 490px;
    height: 100%;
    position: relative;
    .nav {
      padding: 0;
      li {
        display: inline-block;
        padding: 0 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
//
// .table {
//   position: relative;
//   overflow: hidden;
//   line-height: 40px;
//   .table-header {
//     padding: 20px 40px 0;
//     font-size: 0;
//     border-bottom: 1px solid @main-border-color;
//     .title {
//       font-size: 16px;
//       margin-right: 10px;
//     }
//     .status {
//       color: #fff;
//       font-size: 12px;
//       font-style: normal;
//       display: inline-block;
//       width: 50px;
//       height: 20px;
//       line-height: 20px;
//       text-align: center;
//       -webkit-user-select:none;
//       -moz-user-select:none;
//       -ms-user-select:none;
//       user-select:none;
//       cursor: default;
//       &.on {
//         background-color: @main-text-color-success;
//       }
//       &.off {
//         background-color: @main-text-color-failure;
//       }
//     }
//     .back-button {
//       font-size: 12px;
//       color: #fff;
//       background-color: @active-background-color;
//       display: inline-block;
//       width: 100px;
//       height: 25px;
//       line-height: 25px;
//       border-radius: 5px;
//       text-align: center;
//     }
//   }
//   .table-content {
//     padding: 30px 40px 0;
//     margin-bottom: 45px;
//     table {
//       width: 100%;
//       border-collapse: collapse;
//       border: 1px solid @main-border-color;
//       tr {
//         text-align: center;
//         border-bottom: 1px solid @main-border-color;
//         &:last-child {
//           border-bottom: 0;
//         }
//         th {
//           font-weight: normal;
//           background-color: @main-background-color;
//           border: 0;
//         }
//         td {
//           .action {
//             font-size: 12px;
//             color: #fff;
//             background-color: @active-background-color;
//             display: inline-block;
//             width: 70px;
//             height: 20px;
//             line-height: 20px;
//             border-radius: 5px;
//             -webkit-user-select:none;
//             -moz-user-select:none;
//             -ms-user-select:none;
//             user-select:none;
//           }
//         }
//         th:first-child, td:first-child {
//           text-align: left;
//           padding-left: 40px;
//         }
//       }
//     }
//   }
//   .table-footer {
//     text-align: center;
//     font-size: 0;
//     height: 45px;
//     line-height: 45px;
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     .page-button {
//       font-size: 12px;
//       color: #999;
//       &:first-child {
//         margin-right: 30px;
//       }
//     }
//   }
// }
</style>
