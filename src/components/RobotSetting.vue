<template>
  <div class="robot-setting">
    <ul class="robot-setting-items border-box">
      <li class="clearfix">
        <div class="setting-item-name">机器人：</div>
        <div class="setting-item-input">
          老大哥看着我
        </div>
      </li>
      <li class="clearfix">
        <div class="setting-item-name">群行为监控：</div>
        <div class="setting-item-input">
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-join" />
            <label for="checkbox-join">进群监控</label>
          </div>
          <textarea placeholder="设置自动回复群公告"></textarea>
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-exit" />
            <label for="checkbox-exit">退群监控</label>
          </div>
        </div>
      </li>
    </ul>
    <ul class="robot-setting-items border-box">
      <li class="clearfix">
        <div class="setting-item-name">群消息监控：</div>
        <div class="setting-item-input">
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-call" />
            <label for="checkbox-call">@我消息监控</label>
          </div>
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-contact" />
            <label for="checkbox-contact">监控特定群好友（最多三个）</label>
            <a class="select-btn" @click="showContactSelector = true">选择监控对象</a>
            <modal v-if="showContactSelector" @close="showContactSelector = false">
              <list-selector :items="ContactWatcher.items" :title="ContactWatcher.title"></list-selector>
            </modal>
          </div>
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-keywords" />
            <label for="checkbox-keywords">群关键词监控(最多三个）</label>
          </div>
          <div class="keywords-watchers">
            <div class="keywords-watchers-item" v-for="(item, index) of watchers">
              <input type="text" v-model="item.keywords" :placeholder="item.placeholder" />
              <input type="text" v-model="item.answer.messages" placeholder="输入自动回复短语" />
              <div class="input-checkbox">
                <input type="checkbox" :id="'checkbox-keywords-' + index" v-model="item.answer.state" />
                <label :for="'checkbox-keywords-' + index">开启自动回复</label>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="setting-item-input">
      <a class="submit-btn">保存配置</a>
    </div>
  </div>
</template>

<script>
const Modal = resolve => require(['../components/Modal'], resolve)
const ListSelector = resolve => require(['../components/ListSelector'], resolve)

export default {
  name: 'RobotSetting',
  data () {
    return {
      watchers: [{
        placeholder: '设置关键词一',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }, {
        placeholder: '设置关键词二',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }, {
        placeholder: '设置关键词三',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }],
      showContactSelector: false,
      ContactWatcher: {
        title: {
          candidate: '全部群成员',
          selected: '监控群成员'
        },
        items: [{
          nick_name: '王尼玛',
          selected: true
        }, {
          nick_name: '张全蛋'
        }, {
          nick_name: '赵铁柱'
        }, {
          nick_name: '李小花'
        }]
      }
    }
  },
  props: {
    uin: Number
  },
  components: {
    Modal,
    ListSelector
  }
}
</script>

<style lang="less">
.robot-setting {
  .robot-setting-items {
    padding: 15px 40px 15px 0;
    line-height: 35px;
    margin-bottom: 10px;
    font-size: 14px;
    textarea {
      width: 600px;
      height: 170px;
      margin: 10px 0;
      font-size: 12px;
    }
    li {
      .setting-item-name {
        float: left;
        width: 110px;
        text-align: right;
      }
      .setting-item-input {
        margin-left: 110px;
        .input-checkbox {
          display: block;
          input[type="checkbox"] {
            margin: 0;
            vertical-align: middle;
            transform: translateY(-1px);
            outline: 0;
          }
          .select-btn {
            color: #169bd5;
            text-decoration: underline;
            margin-left: 20px;
          }
        }
        .keywords-watchers {
          margin: 10px 0;
          .keywords-watchers-item {
            margin-bottom: 15px;
            &:last-of-type {
              margin-bottom: 0;
            }
            input[type="text"] {
              font-size: 12px;
              width: 240px;
              height: 35px;
              line-height: 35px;
              border-width: 1px;
              border-style: solid;
              border-color: #cccccc;
              border-radius: 5px;
              outline: 0;
              padding: 10px;
              margin-left: 15px;
              &:focus {
                border-color: #61b0ff;
              }
            }
            .input-checkbox {
              display: inline-block;
              margin-left: 15px;
            }
          }
        }
      }
    }
  }
  .submit-btn {
    display: block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    background-color: #169bd5;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    margin: 30px 0 15px 110px;
  }
}
</style>
