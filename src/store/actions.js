import * as types from './types'
import { Account, Group, Message } from '../api'

export const setAccounts = async ({ commit }) => {
  try {
    let data = await Account.getAccounts()
    console.log('success', data)
    commit(types.SET_ACCOUNTS, data)
  } catch (err) {
    console.log('failure', err)
  }
}

export const setGroups = async ({ commit }, payload) => {
  try {
    let data = await Group.getGroups(payload)
    console.log('success', data)
    commit(types.SET_GROUPS, data)
  } catch (err) {
    console.log('failure', err)
  }
}

export const setMessages = async ({ state, commit }, payload) => {
  try {
    payload.offset = state.message.pageIndex * state.message.pageSize
    payload.limit = state.message.pageSize
    let data = await Message.getMessages(payload)
    if (data.length < state.message.pageSize) {
      commit(types.SET_MESSAGES, { action: 'splice', items: data })
    } else {
      commit(types.SET_MESSAGES, { action: 'concat', items: data })
      commit(types.NEXT_PAGE)
    }
    console.log('success', data)
  } catch (err) {
    console.log('failure', err)
  }
}
