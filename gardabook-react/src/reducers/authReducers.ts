import { combineReducers } from 'redux'

import { STORE_COGNITO_TOKEN } from '../actions/types'

interface Action {
  type: String
  payload: Array<Object>
}

const cognitoToken = (state = '', action: Action) => {
  switch (action.type) {
    case STORE_COGNITO_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ cognitoToken })
