<template>
  <div class="mass">
    <div class="mass-sidebar border-box">
      <ul>
        <li :class="{ 'active': item === currentAccount }" v-for="item of accounts" @click="currentAccount = item">
          <span class="avatar"></span>
          <span class="nick-name">{{ item.nick_name }}</span>
          <span class="state online" v-if="item.online">在线</span>
          <span class="state offline" v-else>离线</span>
        </li>
      </ul>
    </div>
    <div class="mass-content">
      <div class="mass-message-box border-box clearfix">
        <p>
          <span class="name">发送机器人：</span>
          <span class="info">TINE</span>
        </p>
        <p>
          <span class="name">群发信息群：</span>
          <span class="info">互联网+招聘渠道，中国招聘领袖峰会<a class="select-btn" @click="showGroupSelector = true">重新选择</a></span>
          <modal v-if="showGroupSelector" @close="showGroupSelector = false">
            <list-selector :items="groups.items" :title="groups.title"></list-selector>
          </modal>
        </p>
        <div class="message-edit-box">
          <ul class="message-edit-box-tabs">
            <li :class="{ 'active': messageEditorState === 'text' }">
              <a @click="toggleEditorState('text')"><i class="iconfont">&#xe627;</i>文字信息</a>
            </li>
            <li :class="{ 'active': messageEditorState === 'img' }">
              <a @click="toggleEditorState('img')"><i class="iconfont">&#xe67f;</i>图片</a>
            </li>
          </ul>
          <div class="message-edit-box-input">
            <textarea v-if="messageEditorState === 'text'"></textarea>
            <div class="upload-img-box" v-if="messageEditorState === 'img'">
              <input type="file" @change="previewImage" accept="image/jpeg,image/png,image/gif" style="display: none;" />
              <a @click="selectImage">
                <img :src="imageURL" v-if="imageURL">
                <div class="img-select-btn" v-else>
                  <i class="iconfont">&#xe67d;</i>
                  <span>上传图片</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <a class="send-btn shadow-box">群发信息</a>
      </div>
      <div class="mass-message-paginator border-box clearfix">
        <h1 class="mass-message-paginator-title">群发记录</h1>
        <paginator class="mass-message-paginator-items" :default-page-size="1" :item-count="11" :display-page-index-length="6"></paginator>
      </div>
      <div class="mass-message-history border-box">
        <div class="mass-message-history-header">
          <p>发送至：小猫吃鱼，网吧五连坐，三剑客，几个大傻逼</p>
          <p>2017-01-11 14:09:22</p>
        </div>
        <div class="mass-message-history-body">
          <message :message="message"></message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as types from '../store/types'

const Paginator = resolve => require(['../components/Paginator'], resolve)
const Message = resolve => require(['../components/Message'], resolve)
const Modal = resolve => require(['../components/Modal'], resolve)
const ListSelector = resolve => require(['../components/ListSelector'], resolve)

export default {
  name: 'Mass',
  data () {
    let accounts = [{
      nick_name: 'TINE0',
      online: true
    }, {
      nick_name: 'TINE1',
      online: true
    }, {
      nick_name: 'TINE2',
      online: false
    }, {
      nick_name: 'TINE3',
      online: false
    }]
    return {
      img: '请选择图片',
      message: '开课啦！招聘兄弟会帮主乔顿Jordan今晚8点开讲，欢迎大家收听[玫瑰]\n【课程时间】11.9周三晚8点\n【课程主题】星巴克人才招聘与发展\n【课程大纲】1.关于星巴克的那些事儿；2.星巴克的企业文化和员工发展；3.星巴克的人才发展； 4.721原则\n【参与方式】点击链接进入直播间收听课程→http://m.qlchat.com/live/channel/channelPage/290000051870374.htm\n报名成功后可回听11.2微课《离职预防的5个制胜妙招》\n收藏后找不到链接？请点击“微信→我→收藏',
      accounts: accounts,
      currentAccount: accounts[0],
      messageEditorState: 'text',
      image: null,
      showGroupSelector: false,
      groups: {
        title: {
          candidate: '全部群',
          selected: '已选择'
        },
        items: [{
          nick_name: '安工大上海校友',
          selected: true
        }, {
          nick_name: '饭团'
        }, {
          nick_name: '小猫吃鱼'
        }, {
          nick_name: '产品狗&运营喵'
        }]
      }
    }
  },
  computed: {
    imageURL () {
      return this.image ? window.URL.createObjectURL(this.image) : null
    }
  },
  methods: {
    toggleEditorState (newState) {
      this.messageEditorState = newState
      if (newState !== 'img') {
        this.image = null
      }
    },
    selectImage () {
      let el = this.$el.querySelector('input[type="file"]')
      el.click()
    },
    previewImage (event) {
      let file = event.target.files[0]
      if (!file) {
        return
      }
      let supportedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (supportedTypes.indexOf(file.type) >= 0) {
        this.image = file
      } else {
        this.addAlertMessage({
          type: 'error',
          message: '文件格式只支持：jpg、jpeg 和 png'
        })
      }
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE
    })
  },
  components: {
    Paginator,
    Message,
    Modal,
    ListSelector
  }
}
</script>

<style lang="less">
.mass {
  min-height: 100%;
  position: relative;
  .mass-sidebar {
    width: 250px;
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    ul {
      width: 100%;
      height: 100%;
      padding: 15px;
      overflow-y: auto;
      li {
        background-color: #f3f3f3;
        border-radius: 2px;
        line-height: 45px;
        padding: 0 57px 0 15px;
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
        white-space: nowrap;
        font-size: 0;
        &:last-of-type {
          margin-bottom: 0;
        }
        &.active {
          background-color: #f9f8fb;
          box-shadow: 0 2px 6px -1px rgba(0, 0, 0, .2);
          &::before {
            content: "";
            display: block;
            width: 2px;
            height: 100%;
            position: absolute;
            left: 0;
            background-color: #5598ed;
          }
        }
        span {
          display: inline-block;
          vertical-align: middle;
          &.avatar {
            background-color: #7598ff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          &.nick-name {
            font-size: 14px;
            width: 100%;
            padding-right: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
          }
          &.state {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            width: 32px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #fff;
            &.online {
              background-color: #30a84f;
            }
            &.offline {
              background-color: #feba00;
            }
          }
        }
      }
    }
  }
  .mass-content {
    margin-left: 270px;
    .border-box {
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .mass-message-box {
      padding: 20px 25px;
      font-size: 14px;
      p {
        line-height: 30px;
        .select-btn {
          color: #169bd5;
          text-decoration: underline;
          margin-left: 20px;
        }
      }
      .message-edit-box {
        margin: 15px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
        .message-edit-box-tabs {
          border-bottom: 1px solid #ccc;
          line-height: 40px;
          font-size: 0;
          li {
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            width: 120px;
            text-align: center;
            line-height: 40px;
            &.active {
              color: #169bd5;
            }
            i {
              font-size: 13px;
              margin-right: 10px;
              display: inline-block;
              vertical-align: top;
            }
          }
        }
        .message-edit-box-input {
          @min-height: 200px;
          min-height: @min-height;
          textarea {
            border: 0;
            width: 100%!important;
            min-height: @min-height;
          }
          .upload-img-box {
            padding: 20px;
            font-size: 0;
            a {
              font-size: 16px;
              color: #ccc;
              border: 3px dotted #ccc;
              display: inline-block;
              text-align: center;
              img {
                max-width: 100%;
                max-height: 160px;
              }
              .img-select-btn {
                width: 160px;
                height: 160px;
                padding-top: 30px;
                i {
                  font-size: 50px;
                  display: block;
                }
                span {
                  display: block;
                }
              }
            }
          }
        }
      }
      .send-btn {
        display: block;
        float: right;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: #5598ed;
        text-align: center;
      }
    }
    .mass-message-paginator {
      line-height: 45px;
      padding: 0 25px;
      .mass-message-paginator-title {
        font-size: 16px;
        display: inline-block;
        vertical-align: top;
      }
      .mass-message-paginator-items {
        float: right;
        line-height: 45px;
        vertical-align: middle;
      }
    }
    .mass-message-history {
      padding: 25px;
      .mass-message-history-header {
        line-height: 30px;
        border-bottom: 1px solid #ccc;
      }
      .mass-message-history-body {
        padding: 15px 0;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
