import Vue from 'vue'

const urlPrefix = 'http://neituiyun.com'
const urlPort = ':1000'
const urlDict = {
  // 微信账号（机器人）列表
  getAccounts: '/wx/accounts',
  // 微信好友
  getContacts: '/wx/contacts'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  getAccounts ({ access_token }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getAccounts,
        method: methodDict.get,
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
  },
  getContacts ({ access_token, account_id, offset, limit }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getContacts,
        method: methodDict.get,
        params: {
          access_token: access_token,
          account_id: account_id,
          offset: offset,
          limit: limit
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
