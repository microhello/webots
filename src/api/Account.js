import Vue from 'vue'

const urlPrefix = 'http://neituiyun.com'
const urlPort = ':1000'
const urlDict = {
  // 微信账号列表
  getAccounts: '/wx/accounts'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  getAccounts () {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getAccounts,
        method: methodDict.get,
        params: {}
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
