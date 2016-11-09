import * as types from './types'
import { Account, Group, Message } from '../api'

export const getAccountList = async ({ commit }) => {
  try {
    let data = await Account.getAccountList()
    console.log('success', data)
    commit(types.GET_ACCOUNT_LIST, data)
  } catch (err) {
    console.log('failure', err)
  }
}

export const getGroupList = async ({ commit }, { uin }) => {
  try {
    let data = await Group.getGroupList(uin)
    console.log('success', data)
    commit(types.GET_GROUP_LIST, data)
  } catch (err) {
    console.log('failure', err)
  }
}

export const getMessages = async ({ commit }, payload) => {
  commit(types.DEL_MESSAGES)
  try {
    let data = await Message.getMessages(payload)
    console.log('success', data)
    commit(types.GET_MESSAGES, data)
  } catch (err) {
    console.log('failure', err)
  }
}
