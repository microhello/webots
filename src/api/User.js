import Vue from 'vue'
import md5 from 'md5'

const urlPrefix = 'http://neituiyun.com'
const urlPort = ':1000'
const urlDict = {
  // 测试
  trial: '/wx/auth/trial',
  // 注册
  register: '/wx/auth/register',
  // 登录
  login: '/wx/auth/login',
  // 登出
  logout: '/wx/auth/logout'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  trial ({ name, phone }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.trial,
        method: methodDict.post,
        body: {
          name: name,
          phone: phone
        }
      }).then(response => {
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          resolve(response.body)
        }
      }, response => {
        reject(response.body.message)
      })
    })
  },
  login ({ phone, password }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.login,
        method: methodDict.post,
        body: {
          phone: phone,
          password: md5(password)
        }
      }).then(response => {
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          resolve(response.body)
        }
      }, response => {
        reject(response.body.message)
      })
    })
  },
  logout ({ access_token }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.logout,
        method: methodDict.post,
        params: {
          access_token: access_token
        }
      }).then(response => {
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          resolve(response.body)
        }
      }, response => {
        reject(response.body.message)
      })
    })
  }
}
