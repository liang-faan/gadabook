import { combineReducers } from 'redux'

import {
  BOOKING_UPDATE_BOOKING_LIST,
  BOOKING_UPDATE_CURRENT_BOOKING,
} from '../actions/types'

interface Action {
  type: String
  payload: Array<Object>
}

const list = (state: Array<Object> = [], action: Action) => {
  switch (action.type) {
    case BOOKING_UPDATE_BOOKING_LIST:
      return action.payload
    default:
      return state
  }
}

const current = (state: Object = {}, action: Action) => {
  switch (action.type) {
    case BOOKING_UPDATE_CURRENT_BOOKING:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ list, current })
