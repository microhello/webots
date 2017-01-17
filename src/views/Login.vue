<template>
  <div class="login">
    <div class="header">
      群喵 智能群管理助手
    </div>
    <ul class="login-tabs">
      <router-link to="/login" :class="{ 'active': action === '/login' }" tag="li">登录LOGIN</router-link>
      <router-link to="/register" :class="{ 'active': action === '/register' }" tag="li">注册REGISTER</router-link>
      <div class="underline" :class="{ 'on-login': action === '/login' }"></div>
    </ul>
    <div class="login-form" v-show="action === '/login'">
      <div class="form-line clearfix">
        <label class="form-label">账号</label>
        <div class="form-input">
          <input type="text" name="account" v-model.trim="loginForm.phone" @keyup.enter="submitLogin" placeholder="手机号" />
        </div>
      </div>
      <div class="form-line clearfix">
        <label class="form-label">密码</label>
        <div class="form-input">
          <input type="password" name="password" v-model.trim="loginForm.password" @keyup.enter="submitLogin" placeholder="6-16个字符" />
        </div>
      </div>
      <div class="form-line clearfix">
        <div class="form-input">
          <a @click="submitLogin" class="login-button">登录</a>
        </div>
      </div>
      <div class="form-line clearfix remember-password">
        <div class="form-input">
          <input type="checkbox" id="remember-password" v-model="remember" /><label for="remember-password">记住密码</label>
        </div>
      </div>
    </div>
    <div class="login-form" v-show="action === '/register'">
      <div class="form-line clearfix">
        <label class="form-label">账号</label>
        <div class="form-input">
          <input type="text" name="account" v-model.trim="registerForm.phone" @keyup.enter="submitRegister" placeholder="手机号" />
        </div>
      </div>
      <div class="form-line clearfix">
        <label class="form-label">密码</label>
        <div class="form-input">
          <input type="password" name="password" v-model.trim="registerForm.password" @keyup.enter="submitRegister" placeholder="6-16个字符" />
        </div>
      </div>
      <div class="form-line clearfix">
        <div class="form-input">
          <a @click="submitRegister" class="login-button">注册</a>
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
      registerForm: {
        phone: '',
        password: ''
      },
      remember: !!window.localStorage.account
    }
  },
  computed: {
    action () {
      return this.$route.path
    }
  },
  methods: {
    async submitLogin () {
      if (!this.confirmForm(this.loginForm)) {
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
        this.$router.push('/main')
      } else {
        this.addALertMessage({
          type: 'error',
          message: '账号或密码错误'
        })
      }
    },
    async submitRegister () {
      if (!this.confirmForm(this.registerForm)) {
        return
      }
      let message = await this.register(this.registerForm)
      if (message === 'success') {
        this.addALertMessage({
          type: 'success',
          message: '注册成功'
        })
        this.$router.push('/login')
      } else {
        this.addALertMessage({
          type: 'error',
          message: '注册失败：' + message
        })
      }
    },
    confirmForm (form) {
      if (!form.phone || !form.password) {
        this.addALertMessage({
          type: 'error',
          message: '请输入账号和密码'
        })
        return false
      } else {
        return true
      }
    },
    ...mapMutations({
      addALertMessage: types.ADD_ALERT_MESSAGE
    }),
    ...mapActions(['login', 'register'])
  }
}
</script>

<style lang="less">
.login {
  background-color: #fff;
  height: 100%;
  .header {
    background-image: url(../assets/image/background/04.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    text-align: center;
    padding: 100px 0 80px 0;
    font-size: 42px;
    color: #fff;
  }
  .login-tabs {
    height: 75px;
    line-height: 75px;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    position: relative;
    font-size: 0;
    .underline {
      width: 120px;
      border-bottom: 1px solid #3087b5;
      position: absolute;
      bottom: 0;
      transition: all .2s;
      left: 50%;
      &.on-login {
        transform: translateX(-100%);
      }
    }
    li {
      font-size: 16px;
      display: inline-block;
      width: 120px;
      cursor: pointer;
      transition: all .2s;
      &.active {
        color: #3087b5;
      }
    }
  }
  .login-form {
    margin: 0 auto;
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
