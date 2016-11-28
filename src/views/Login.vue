<template>
  <div class="login">
    <div class="header">
      群喵 智能群管理助手
    </div>
    <div class="login-form">
      <div class="form-line clearfix">
        <label class="form-label">账号</label>
        <div class="form-input">
          <input type="text" name="account" v-model.trim="loginForm.phone" placeholder="手机号" />
        </div>
      </div>
      <div class="form-line clearfix">
        <label class="form-label">密码</label>
        <div class="form-input">
          <input type="password" name="password" v-model.trim="loginForm.password" placeholder="6-16个字符" />
        </div>
      </div>
      <div class="form-line clearfix">
        <div class="form-input">
          <a @click="submit" class="login-button">登录</a>
        </div>
      </div>
      <div class="form-line clearfix remember-password">
        <div class="form-input">
          <input type="checkbox" id="remember-password" v-model="remember" /><label for="remember-password">记住密码</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as types from '../store/types'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        phone: window.localStorage.account,
        password: window.localStorage.password
      },
      remember: !!window.localStorage.account
    }
  },
  methods: {
    async submit () {
      if (!this.loginForm.phone || !this.loginForm.password) {
        this.addALertMessage({
          type: 'error',
          message: '请输入账号和密码'
        })
        return
      }
      let message = await this.login(this.loginForm)
      if (message === 'success') {
        this.addALertMessage({
          type: 'success',
          message: '登录成功'
        })
        if (this.remember) {
          window.localStorage.account = this.loginForm.phone
          window.localStorage.password = this.loginForm.password
        } else {
          delete window.localStorage.account
          delete window.localStorage.password
        }
        this.$router.push({
          path: '/main'
        })
      } else {
        this.addALertMessage({
          type: 'error',
          message: '账号或密码错误'
        })
      }
    },
    ...mapMutations({
      addALertMessage: types.ADD_ALERT_MESSAGE
    }),
    ...mapActions(['login'])
  }
}
</script>

<style lang="less">
.login {
  background-color: #fff;
  height: 100%;
  .header {
    background-image: url(../assets/image/background/04.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    text-align: center;
    padding: 100px 0 60px 0;
    font-size: 42px;
    font-weight: bold;
    color: #fff;
  }
  .login-form {
    margin: 90px auto 0;
    width: 450px;
    text-align: center;
    .form-line {
      line-height: 75px;
      .form-label {
        display: block;
        font-size: 16px;
        float: left;
        width: 100px;
        text-align: right;
        padding-right: 40px;
      }
      .form-input {
        display: block;
        margin-left: 100px;
        input[type=text], input[type=password] {
          padding: 10px 5px;
          border-radius: 3px;
          border: 1px solid #d7d7d7;
          width: 100%;
        }
        .login-button {
          display: inline-block;
          background-color: #3399ff;
          color: #fff;
          font-size: 16px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-radius: 3px;
        }
      }
    }
    .remember-password {
      text-align: left;
      input[type=checkbox] {
        transform: translateY(2px);
      }
    }
  }
}
</style>
