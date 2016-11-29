<template>
  <div class="add-account">
    <div class="add-account-wrapper" @click="cancel"></div>
    <div class="login-box">
      <div class="step1" v-show="step === 1" @click="step = 2">
        <h1>新增托管微信</h1>
        <ul class="step-body">
          <li>
            <div class="qrcode-box">
              <h2>请使用微信扫描二维码</h2>
              <img src="../assets/image/login.png" />
              <div class="progress-bar">
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
      <div class="step2" v-show="step === 2" @click="step = 3">
        <div class="step-body">
          <i class="iconfont">&#xe612;</i>
          <ul class="account-info">
            <li>
              <span class="info-title">昵称/名字：</span>
              <span class="info-value">许夜</span>
            </li>
            <li>
              <span class="info-title">托管UIN：</span>
              <span class="info-value">3300264983</span>
            </li>
          </ul>
          <a class="to-account-setting">进入账号设置</a>
        </div>
      </div>
      <div class="step1 step3" v-show="step === 3" @click="step = 1">
        <h1>上线托管微信</h1>
        <ul class="step-body">
          <li>
            <div class="qrcode-box">
              <h2>请使用微信扫描二维码</h2>
              <img src="../assets/image/login.png" />
              <div class="progress-bar">
                <div class="cover"></div>
              </div>
            </div>
          </li>
          <li class="qrcode-illustration">
            <ul class="account-info">
              <li>
                <span class="info-title">昵称/名字：</span>
                <span class="info-value">许夜</span>
              </li>
              <li>
                <span class="info-title">托管UIN：</span>
                <span class="info-value">3300264983</span>
              </li>
            </ul>
            <p>1、请保证上线微信与首次托管微信微同一微信。</p>
            <p>2、请在有效时间内扫码，超过时间二维码自动刷新。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddAccount',
  data () {
    return {
      step: 1
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    }
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
    .step1 {
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
              width: 0;
              height: 100%;
            }
            &:hover > .cover {
              transition: width 10s linear;
              width: 100%;
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
    .step2 > .step-body {
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
    .step3 > .step-body > .qrcode-illustration {
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
