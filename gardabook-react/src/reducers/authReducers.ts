import { combineReducers } from 'redux'

import {
  UPDATE_COGNITO_TOKEN,
  USE_GOOGLE_LOGIN,
  UPDATE_SIGNIN_TYPE,
  UPDATE_LOGOUT_FLAG,
} from '../actions/types'

interface Action {
  type: String
  payload: Array<Object>
}

const cognitoToken = (state = '', action: Action) => {
  switch (action.type) {
    case UPDATE_COGNITO_TOKEN:
      return action.payload
    default:
      return state
  }
}

const showGoogleLogin = (state = true, action) => {
  switch (action.type) {
    case USE_GOOGLE_LOGIN:
      return action.payload
    default:
      return state
  }
}

const defaultSigninStatus = 'COGNITO'
const signinType = (state: String = defaultSigninStatus, action: Action) => {
  switch (action.type) {
    case UPDATE_SIGNIN_TYPE:
      return action.payload
    default:
      return state
  }
}

const defaultLogoutFlag = false
const logoutFlag = (state: Boolean = defaultLogoutFlag, action: Action) => {
  switch (action.type) {
    case UPDATE_LOGOUT_FLAG:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  cognitoToken,
  showGoogleLogin,
  signinType,
  logoutFlag,
})
