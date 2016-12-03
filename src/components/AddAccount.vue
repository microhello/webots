<template>
  <div class="add-account">
    <div class="add-account-wrapper" @click="close"></div>
    <div class="login-box">
      <i class="iconfont close-btn" @click="close">&#xe652;</i>
      <template v-if="showQrCode">
        <div class="step-add step-online" v-if="accountInfo">
          <h1>上线托管微信</h1>
          <ul class="step-body">
            <li>
              <div class="qrcode-box">
                <h2>请使用微信扫描二维码</h2>
                <img class="qr-code" :src="imgUrl" />
                <div class="progress-bar" :class="{ 'timing': timing }">
                  <div class="cover"></div>
                </div>
              </div>
            </li>
            <li class="qrcode-illustration">
              <ul class="account-info">
                <li>
                  <span class="info-title">昵称/名字：</span>
                  <span class="info-value">{{ accountInfo.nick_name }}</span>
                </li>
                <li>
                  <span class="info-title">托管UIN：</span>
                  <span class="info-value">{{ accountInfo.uin }}</span>
                </li>
              </ul>
              <p>1、请保证上线微信与首次托管微信微同一微信。</p>
              <p>2、请在有效时间内扫码，超过时间二维码自动刷新。</p>
            </li>
          </ul>
        </div>
        <div class="step-add" v-else>
        <h1>新增托管微信</h1>
        <ul class="step-body">
          <li>
            <div class="qrcode-box">
              <h2>请使用微信扫描二维码</h2>
              <img class="qr-code" :src="imgUrl" />
              <div class="progress-bar" :class="{ 'timing': timing }">
                <div class="cover"></div>
              </div>
            </div>
          </li>
          <li class="qrcode-illustration">
            <p>1、扫描二维码将微信上线到托管状态，可在账号设置中下线。</p>
            <p>2、请在有效时间内扫码，超过时间二维码自动刷新。</p>
          </li>
        </ul>
      </div>
      </template>
      <div class="step-success" v-else>
        <div class="step-body">
          <i class="iconfont">&#xe612;</i>
          <ul class="account-info">
            <li>
              <span class="info-title">昵称/名字：</span>
              <span class="info-value">{{ account.nick_name}}</span>
            </li>
            <li>
              <span class="info-title">托管UIN：</span>
              <span class="info-value">{{ account.uin }}</span>
            </li>
          </ul>
          <a @click="toAccount" class="to-account-setting">进入账号设置</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Account } from '../api'
import { mapGetters, mapMutations } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'AddAccount',
  data () {
    let randomString = (len = 8) => {
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = chars.length
      let name = ''
      for (let i = 0; i < len; i++) {
        name += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return name
    }
    return {
      showQrCode: true,
      timeoutId: 0,
      checkId: 0,
      timing: false,
      imgUrl: null,
      name: randomString(),
      account: {}
    }
  },
  props: {
    accountInfo: Object
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    toAccount () {
      this.close()
      this.$router.push('/main/account')
    },
    close () {
      this.clear()
      this.$emit('close')
    },
    timeout () {
      this.timing = false
      clearTimeout(this.checkId)
      Account.getQrcode({ access_token: this.token, name: this.name }).then(data => {
        console.log('getQrcode success', data)
        this.imgUrl = window.URL.createObjectURL(data)
        this.checkId = setTimeout(() => {
          this.check()
        }, 5000)
        this.timeoutId = setTimeout(() => {
          this.timeout()
        }, 300000)
        this.timing = true
      }, data => {
        console.log('getQrcode failure', data)
        this.addAlertMessage({
          type: 'error',
          message: '获取二维码失败，请稍后再试'
        })
      })
    },
    check () {
      Account.checkClient({ access_token: this.token, name: this.name }).then(data => {
        console.log(data)
        if (data.account_id) {
          this.account = data
          this.showQrCode = false
          this.clear()
        } else {
          this.checkId = setTimeout(() => {
            this.check()
          }, 5000)
        }
      })
    },
    clear () {
      clearTimeout(this.timeoutId)
      clearTimeout(this.checkId)
    },
    ...mapMutations({
      addAlertMessage: types.ADD_ALERT_MESSAGE
    })
  },
  mounted () {
    this.timeout()
  }
}
</script>

<style lang="less">
div.add-account {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100000;
  .add-account-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100001;
    background-color: rgba(0, 0, 0, .6);
  }
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100002;
    transform: translate(-50%, -50%);
    background-color: #f2f2f2;
    padding: 60px 70px;
    border-radius: 5px;
    line-height: normal;
    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      transform: translateX(100%);
      display: inline-block;
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 26px;
      cursor: pointer;
    }
    .step-body {
      width: 575px;
      text-align: center;
      .account-info {
        margin: 60px auto;
        li {
          display: block;
          margin-bottom: 10px;
          font-size: 0;
          &:last-of-type {
            margin-bottom: 0;
          }
          span {
            font-size: 14px;
            display: inline-block;
            width: 50%;
          }
          .info-title {
            text-align: right;
            padding-right: 10px;
          }
          .info-value {
            text-align: left;
          }
        }
      }
    }
    .step-add {
      h1 {
        font-size: 16px;
        margin-bottom: 30px;
      }
      .step-body {
        font-size: 0;
        li {
          display: inline-block;
          vertical-align: top;
          width: 50%;
          text-align: right;
        }
        .qrcode-box {
          display: inline-block;
          text-align: center;
          h2 {
            margin-bottom: 10px;
            font-size: 12px;
          }
          img {
            width: 200px;
            margin-bottom: 10px;
          }
          .progress-bar {
            height: 15px;
            background-color: #c9c9c9;
            .cover {
              background-color: #00cc66;
              width: 100%;
              height: 100%;
            }
            &.timing > .cover {
              transition: width 300s linear;
              width: 0;
            }
          }
        }
        .qrcode-illustration {
          text-align: left;
          padding: 26px 50px;
          p {
            font-size: 12px;
            margin-bottom: 20px;
            color: #868686;
          }
        }
      }
    }
    .step-success > .step-body {
      i {
        font-size: 80px;
        color: #2aa515;
        display: inline-block;
        height: 84px;
      }
      .to-account-setting {
        color: #169BD5;
      }
    }
    .step-online > .step-body > .qrcode-illustration {
      padding-right: 0;
      .account-info {
        margin: 0 0 40px;
        li {
          display: block;
          width: 100%;
          padding: 10px 0;
          border-bottom: 1px solid #e4e4e4;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
