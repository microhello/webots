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

export const setMessages = async ({ commit }, payload) => {
  commit(types.DEL_MESSAGES)
  try {
    let data = await Message.getMessages(payload)
    console.log('success', data)
    commit(types.SET_MESSAGES, data)
  } catch (err) {
    console.log('failure', err)
  }
}
