import { combineReducers } from 'redux'

import { UPDATE_LOADING_SCREEN, UPDATE_SIGNIN_STATUS } from '../actions/types'

interface Action {
  type: String
  payload: any
}

const defaultLoadingScreen = false
const loadingScreen = (
  state: Boolean = defaultLoadingScreen,
  action: Action
) => {
  switch (action.type) {
    case UPDATE_LOADING_SCREEN:
      return action.payload
    default:
      return state
  }
}

const defaultSigninStatus = false
const googleSigninStatus = (
  state: Boolean = defaultSigninStatus,
  action: Action
) => {
  switch (action.type) {
    case UPDATE_SIGNIN_STATUS:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ loadingScreen, googleSigninStatus })
