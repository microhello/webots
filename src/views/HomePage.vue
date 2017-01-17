<template>
  <div class="homepage">
    <div class="header">
      <img class="background unselectable" src="../assets/image/background/02.png" />
      <div class="header-content">
        <ul class="nav">
          <li>
            <img src="../assets/image/logo/01.png" />
          </li>
          <li class="pull-right">
            <router-link to="/register" class="unselectable">注册</router-link>
          </li>
          <li class="pull-right split">
            |
          </li>
          <li class="pull-right">
            <router-link to="/login" class="unselectable">登录</router-link>
          </li>
        </ul>
        <div class="title-wrapper">
          <div class="title">
            <h1>智能群管理助手，高效社群运营助推器</h1>
            <router-link to="/register" class="join-button unselectable">立即试用</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-item function">
        <h2>为社群运营人员提供智能群管理服务</h2>
        <h3>将<em>智能助理</em>引入微信群，简化社群运营，提升运营效率</h3>
        <div class="function-box">
          <div class="function-box-item img-box">
            <img src="../assets/image/common/01.png" />
          </div>
          <ul class="function-box-item function-list">
            <li>
              <label>多账户</label>
              <p>多账号，多群整合为一</p>
            </li>
            <li>
              <label>群消息</label>
              <p>海量群消息结构化管理，统计与分析</p>
            </li>
            <li>
              <label>群值守</label>
              <p>关键字监控，有效消息留存，短信提醒</p>
            </li>
            <li>
              <label>拉群帮</label>
              <p>设定拉群策略，自助拉群</p>
            </li>
            <li>
              <label>群客服</label>
              <p>消息模板，智能聊天，工单管理</p>
            </li>
            <li>
              <label>群营销</label>
              <p>客户分析，需求捕获，策略群发，内容自动投放</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-item service">
        <div class="service-item">
          <i class="iconfont">&#xe640;</i>
          <h2>群运营</h2>
          <p>智能助理将用户加为好友</p>
          <p>自动拉用户进入指定群</p>
          <p>通讯录好友，群成员数据统计与分析</p>
          <p>服务/产品内容投放</p>
          <p>群记录保存，内容沉淀，运营效果分析</p>
        </div>
        <div class="service-item">
          <i class="iconfont">&#xe612;</i>
          <h2>群客服</h2>
          <p>设定消息模板和关键词，智能客服自动答复</p>
          <p>智能客服加用户为通讯录好友，私聊</p>
          <p>对于群内不合规行为，设定智能客服监管</p>
          <p>工单系统</p>
        </div>
        <div class="service-item">
          <i class="iconfont">&#xe61b;</i>
          <h2>群营销</h2>
          <p>群消息记录分类保存，结构化管理</p>
          <p>根据分析结果分类用户群，投放广告</p>
          <p>群值守，设定关键词，在线与短信提醒</p>
          <p>有效消息留存，定位消息用户，完成销售行为</p>
        </div>
      </div>
      <div class="content-item join">
        <h2>现在选择群喵，让你的运营更简单，高效</h2>
        <router-link to="/register" class="join-button unselectable">立即试用</router-link>
      </div>
    </div>
    <ul class="footer">
      <li>联系我们</li>
      <li>在线咨询： 209736950</li>
      <li>手机： 13162502127</li>
      <li>邮箱： service@wemiyun.com</li>
    </ul>
    <ul class="float-navi">
      <li>
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2183133171&site=qq&menu=yes">
          <i class="iconfont">&#xe66e;</i>
          <p>在线咨询</p>
        </a>
      </li>
      <li class="phone">
        <a>
          <i class="iconfont">&#xe622;</i>
          <p>电话咨询</p>
        </a>
        <span>13162502127</span>
      </li>
      <!-- <li>
        <a @click="toggleModal">
          <i class="iconfont">&#xe67a;</i>
          <p>申请试用</p>
        </a>
      </li> -->
      <li>
        <a @click="goTop">
          <i class="iconfont">&#xe60c;</i>
          <p>返回顶部</p>
        </a>
      </li>
    </ul>
    <!-- <div class="modal" v-if="showModal">
      <div class="backdrop" @click="toggleModal"></div>
      <div class="dialog">
        <div class="dialog-header">申请试用<i class="iconfont" @click="toggleModal">&#xe652;</i></div>
        <div class="dialog-body">
          <h1>请填写以下信息：</h1>
          <div class="form-line">
            <label>姓名：</label>
            <input type="text" v-model.trim="trialForm.name" />
          </div>
          <div class="form-line">
            <label>手机：</label>
            <input type="text" v-model.trim="trialForm.phone" />
          </div>
        </div>
        <div class="dialog-footer">
          <a class="unselectable" @click="submit">立即申请</a>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex'
// import * as types from '../store/types'

export default {
  name: 'HomePage',
  // data () {
  //   return {
  //     showModal: false,
  //     trialForm: {
  //       name: '',
  //       phone: ''
  //     }
  //   }
  // },
  methods: {
    goTop () {
      window.scrollTo(0, 0)
    }
    // toggleModal () {
    //   this.showModal = !this.showModal
    //   if (!this.showModal) {
    //     this.trialForm.name = ''
    //     this.trialForm.phone = ''
    //   }
    // },
    // async submit () {
    //   if (!this.trialForm.name || !this.trialForm.phone) {
    //     this.addALertMessage({
    //       type: 'error',
    //       message: '请填写申请信息'
    //     })
    //     return
    //   }
    //   let message = await this.trial(this.trialForm)
    //   if (message === 'success') {
    //     this.addALertMessage({
    //       type: 'success',
    //       message: '提交成功'
    //     })
    //   } else {
    //     this.addALertMessage({
    //       type: 'error',
    //       message: message
    //     })
    //     return
    //   }
    //   this.toggleModal()
    // },
    // ...mapMutations({
    //   addALertMessage: types.ADD_ALERT_MESSAGE
    // }),
    // ...mapActions(['trial'])
  }
}
</script>

<style lang="less">
@import "../assets/less/colors.less";

.homepage {
  @label-color: #187be0;
  @padding_left_and_right: 100%/6;
  .join-button {
    font-size: 16px;
    display: inline-block;
    width: 140px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 10px;
  }
  .header {
    position: relative;
    font-size: 0;
    max-height: 600px;
    overflow: hidden;
    .background {
      width: 100%;
    }
    .header-content {
      position: absolute;
      top: 0;
      right: @padding_left_and_right;
      bottom: 0;
      left: @padding_left_and_right;
      .nav {
        height: 90px;
        line-height: 90px;
        font-size: 0;
        li {
          font-size: 14px;
          display: inline-block;
          img {
            height: 35px;
            vertical-align: middle;
          }
          a {
            color: #fff;
            // background-color: transparent;
            // border: 1px solid #fff;
            // border-radius: 5px;
            // display: inline-block;
            // width: 90px;
            // line-height: 35px;
            // text-align: center;
            // vertical-align: middle;
          }
        }
        .split {
          margin: 0 20px;
          color: #fff;
        }
      }
      .title-wrapper {
        position: absolute;
        top: 90px;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        .title {
          position: absolute;
          top: 50%;
          right: 0;
          left: 0;
          transform: translateY(-50%);
          h1 {
            color: #fff;
            font-size: 42px;
            margin-bottom: 10%;
          }
        }
      }
    }
  }
  .content {
    .content-item {
      padding: 0 @padding_left_and_right;
    }
    .function {
      background-color: #fff;
      padding-top: 120px;
      padding-bottom: 120px;
      h2 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 10px;
      }
      h3 {
        font-size: 14px;
        text-align: center;
        color: #45525b;
        em {
          color: @label-color;
          font-style: normal;
        }
      }
      .function-box {
        margin-top: 20px;
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .function-box-item {
          flex-basis: 40%;
        }
        .img-box {
          img {
            width: 100%;
            max-width: 400px;
          }
        }
        .function-list {
          font-size: 16px;
          li {
            margin-bottom: 10px;
            &:last-of-type {
              margin-bottom: 0;
            }
            label {
              width: 65px;
              float: left;
              color: @label-color;
            }
            p {
              margin-left: 65px;
            }
          }
        }
      }
    }
    .service {
      padding-top: 50px;
      padding-bottom: 50px;
      background-color: #ececec;
      font-size: 0;
      .service-item {
        display: inline-block;
        width: 33.33333%;
        vertical-align: top;
        text-align: center;
        padding: 0 20px;
        i {
          display: inline-block;
          width: 120px;
          height: 120px;
          line-height: 120px;
          border-radius: 50%;
          font-size: 60px;
          color: #fff;
          background-color: @label-color;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 25px;
        }
        p {
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
    .join {
      padding-top: 75px;
      padding-bottom: 75px;
      background-image: url(../assets/image/background/03.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      h2 {
        color: #fff;
        font-size: 24px;
        margin-bottom: 35px;
      }
      .join-button {
        line-height: 50px;
      }
    }
  }
  .footer {
    color: #fff;
    background-color: #485359;
    text-align: center;
    padding: 15px 0;
    font-size: 0;
    li {
      font-size: 14px;
      display: inline-block;
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .float-navi {
    position: fixed;
    right: 0;
    bottom: 20%;
    li {
      margin-bottom: 5px;
      color: #fff;
      width: 100%;
      height: 100px;
      text-align: center;
      overflow: hidden;
      a {
        color: #fff;
        display: inline-block;
        width: 70px;
        height: 100px;
        float: right;
        background-color: rgba(0, 0, 0, .3);
        transition: background-color .3s;
        &:hover {
          background-color: #2e8ded;
        }
      }
      i {
        font-size: 28px;
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        padding-bottom: 20px;
      }
      &.phone {
        width: 70px;
        transition: all .3s;
        background-color: rgba(0, 0, 0, .3);
        cursor: default;
        a {
          cursor: default;
          background-color: transparent;
        }
        span {
          display: inline-block;
          width: 130px;
          height: 100px;
          line-height: 100px;
        }
        &:hover {
          width: 200px;
          background-color: #2e8ded;
        }
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100000;
    .backdrop {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .3);
    }
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 100001;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 300px;
      background-color: #fff;
      box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
      .dialog-header {
        padding: 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        background-color: #F8F8F8;
        i {
          float: right;
          cursor: pointer;
        }
      }
      .dialog-body {
        padding: 20px;
        line-height: 24px;
        h1 {
          font-size: 14px;
        }
        .form-line {
          margin-top: 20px;
          line-height: 35px;
          label {
            display: inline-block;
            vertical-align: middle;
            float: left;
            width: 100px;
            text-align: right;
            padding-right: 20px;
          }
          input[type=text] {
            display: inline-block;
            vertical-align: middle;
            padding: 5px;
            width: 240px;
          }
        }
      }
      .dialog-footer {
        padding: 20px;
        text-align: right;
        a {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          color: #fff;
          background-color: #2e8ded;
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
