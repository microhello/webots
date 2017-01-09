<template>
  <div class="robot-setting">
    <h1 class="robot-setting-title">配置机器人</h1>
    <ul class="robot-setting-items">
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
            <a class="select-btn">选择监控对象</a>
          </div>
          <div class="input-checkbox">
            <input type="checkbox" id="checkbox-keywords" />
            <label for="checkbox-keywords">群关键词监控(最多三个）</label>
          </div>
          <div class="keywords-watchers">
            <div class="keywords-watchers-item" v-for="(item, index) of watchers">
              <div class="watcher-label">
                {{ item.label }}：
              </div>
              <div class="watcher-setting">
                <div class="keywords-setting">
                  <input type="text" v-model="item.keywords" />
                  <div class="input-checkbox">
                    <input type="checkbox" :id="'checkbox-keywords-' + index" v-model="item.answer.state" />
                    <label :for="'checkbox-keywords-' + index">开启自动回复</label>
                  </div>
                </div>
                <textarea class="answer-setting" v-show="item.answer.state" v-model="item.answer.messages" placeholder="设置回复语"></textarea>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <a class="submit-btn">保存</a>
  </div>
</template>

<script>
export default {
  name: 'RobotSetting',
  data () {
    return {
      watchers: [{
        label: '关键词1',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }, {
        label: '关键词2',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }, {
        label: '关键词3',
        keywords: '',
        answer: {
          state: false,
          messages: ''
        }
      }]
    }
  },
  props: {
    uin: Number
  },
  methods: {
  }
}
</script>

<style lang="less">
.robot-setting {
  padding: 40px;
  .robot-setting-title {
    font-size: 20px;
    line-height: 30px;
  }
  .robot-setting-items {
    line-height: 35px;
    padding: 20px 0;
    textarea {
      display: block;
      border-width: 1px;
      border-style: solid;
      border-color: #cccccc;
      border-radius: 5px;
      outline: 0;
      padding: 10px;
      width: 355px;
      height: 75px;
      &:focus {
        border-color: #61b0ff;
      }
    }
    li {
      .setting-item-name {
        float: left;
        width: 90px;
      }
      .setting-item-input {
        margin-left: 90px;
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
          }
        }
        .keywords-watchers {
          .keywords-watchers-item {
            margin-bottom: 15px;
            &:last-of-type {
              margin-bottom: 0;
            }
            .watcher-label {
              float: left;
              width: 70px;
            }
            .watcher-setting {
              margin-left: 70px;
              .keywords-setting {
                input[type="text"] {
                  width: 135px;
                  height: 30px;
                  line-height: 30px;
                  padding: 0 10px;
                  border-width: 1px;
                  border-style: solid;
                  border-color: #cccccc;
                  border-radius: 5px;
                  outline: 0;
                  margin-right: 30px;
                  &:focus {
                    border-color: #61b0ff;
                  }
                }
                .input-checkbox {
                  display: inline-block;
                }
              }
              .answer-setting {
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
  }
  .submit-btn {
    display: block;
    width: 140px;
    height: 40px;
    line-height: 40px;
    background-color: #169bd5;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    margin: 20px 0 0 200px;
  }
}
</style>
