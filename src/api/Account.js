import Vue from 'vue'

const urlPrefix = 'http://qunmiao.wemiyun.com'
const urlPort = ':80'
const urlDict = {
  // 微信账号（机器人）列表
  getAccounts: '/wx/accounts',
  // 微信好友
  getContacts: '/wx/contacts',
  // 获取二维码登录账号
  getQrcode: '/wx/actions/get_qrcode',
  // 确认登录状态
  checkClient: '/wx/actions/check_client',
  // 上线
  startClient: '/wx/actions/start_client',
  // 下线
  stopClient: '/wx/actions/stop_client'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  getAccounts ({ access_token, online, keywords, offset, limit }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getAccounts,
        method: methodDict.get,
        params: {
          access_token: access_token,
          online: online,
          keywords: keywords,
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
  },
  getQrcode ({ access_token, name }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getQrcode,
        method: methodDict.get,
        params: {
          access_token: access_token,
          name: name
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
  checkClient ({ access_token, name }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.checkClient,
        method: methodDict.get,
        params: {
          access_token: access_token,
          name: name
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
  startClient ({ access_token, account_id }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.startClient,
        method: methodDict.get,
        params: {
          access_token: access_token,
          account_id: account_id
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
  stopClient ({ access_token, account_id }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.stopClient,
        method: methodDict.get,
        params: {
          access_token: access_token,
          account_id: account_id
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
