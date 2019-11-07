import { combineReducers } from 'redux'

import { UPDATE_LOADING_SCREEN, UPDATE_SIGNIN_TYPE } from '../actions/types'

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

export default combineReducers({ loadingScreen })
