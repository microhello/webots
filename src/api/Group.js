import Vue from 'vue'

const urlPrefix = 'http://neituiyun.com'
const urlPort = ':1000'
const urlDict = {
  // 微信群列表
  getGroups: '/wx/groups'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  getGroups ({ uin }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getGroups,
        method: methodDict.get,
        params: {
          uin: uin
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
