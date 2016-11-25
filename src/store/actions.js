import * as types from './types'
import { Account, Group, Message, User } from '../api'

export const setAccounts = async ({ state, commit }) => {
  try {
    let data = await Account.getAccounts({ access_token: state.user.token })
    console.log('getAccounts success', data)
    commit(types.SET_ACCOUNTS, data)
  } catch (err) {
    console.log('getAccounts failure', err)
  }
}

export const setGroups = async ({ state, commit }, payload) => {
  try {
    payload.access_token = state.user.token
    let data = await Group.getGroups(payload)
    console.log('getGroups success', data)
    commit(types.SET_GROUPS, data)
  } catch (err) {
    console.log('getGroups failure', err)
  }
}

export const setMessages = async ({ state, commit }, payload) => {
  try {
    payload.offset = state.message.offset
    payload.limit = state.message.limit
    payload.access_token = state.user.token
    let data = await Message.getMessages(payload)
    if (data.items.length < state.message.limit) {
      if (state.message.items.length >= state.message.count) {
        commit(types.ADD_ALERT_MESSAGE, { type: 'error', message: '暂无新消息' })
      }
      commit(types.SET_MESSAGES, { action: 'splice', items: data })
    } else {
      commit(types.SET_MESSAGES, { action: 'concat', items: data })
      commit(types.NEXT_PAGE)
    }
    console.log('getMessages success', data)
  } catch (err) {
    console.log('getMessages failure', err)
  }
}

export const trial = async ({ commit }, payload) => {
  try {
    let data = await User.trial(payload)
    console.log('trial success', data)
  } catch (err) {
    console.log('trial failure', err)
    return err
  }
  return 'success'
}

export const login = async ({ commit }, payload) => {
  try {
    let data = await User.login(payload)
    console.log('login success', data)
    commit(types.LOGIN, data)
  } catch (err) {
    console.log('login failure', err)
    return err
  }
  return 'success'
}
