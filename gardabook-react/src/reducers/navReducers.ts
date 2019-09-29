import { combineReducers } from 'redux'

import { UPDATE_CURRENT_NAV_LOCATION } from '../actions'

interface Action {
  type: String
  payload: any
}

export const BOOKINGS = 'BOOKINGS'
export const EXPLORE = 'EXPLORE'
export const LIST = 'LIST'
export const LISTINGS = 'LISTINGS'
export const NOTIFICATIONS = 'NOTIFICATIONS'
const current = (state: String = EXPLORE, action: Action) => {
  switch (action.type) {
    case UPDATE_CURRENT_NAV_LOCATION:
      return action.payload
      break
    default:
      return state
  }
}

export default combineReducers({ current })
