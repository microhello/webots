import Vue from 'vue'

const urlPrefix = 'http://qunmiao.wemiyun.com'
const urlPort = ':80'
const urlDict = {
  // 群消息
  getMessages: '/wx/msgs',
  // 群消息统计
  getGroupStat: '/wx/groups/stat',
  // 群值守统计
  getGuardStat: '/wx/guards/stat'
}
const methodDict = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

export default {
  getMessages ({ uin, receiver_name, start_time, end_time, keywords, offset, limit, access_token }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getMessages,
        method: methodDict.get,
        params: {
          uin: uin,
          receiver_name: receiver_name,
          start_time: start_time,
          end_time: end_time,
          keywords: keywords,
          offset: offset,
          limit: limit,
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
  getGroupStat ({ access_token }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getGroupStat,
        method: methodDict.get,
        params: {
          access_token: access_token,
          limit: 8
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
  getGuardStat ({ access_token }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        url: urlPrefix + urlPort + urlDict.getGuardStat,
        method: methodDict.get,
        params: {
          access_token: access_token,
          limit: 8
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
