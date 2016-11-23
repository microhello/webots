import Vue from 'vue'

const urlPrefix = 'http://neituiyun.com'
const urlPort = ':1000'
const urlDict = {
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
  rigister ({ phone, password }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.register,
        method: methodDict.post,
        data: {
          phone: phone,
          password: password
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
