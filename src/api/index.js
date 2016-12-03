import Vue from 'vue'
import VueResource from 'vue-resource'
import User from './User'
import Account from './Account'
import Group from './Group'
import Message from './Message'
import store from '../store'
import router from '../router'
import * as types from '../store/types'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  store.commit(types.TOGGLE_SHOWLOADING, true)
  next(response => {
    store.commit(types.TOGGLE_SHOWLOADING, false)
    if (response.status === 401) {
      router.push('/login')
    }
    return response
  })
})

export {
  Account,
  Group,
  Message,
  User
}
