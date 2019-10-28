import { combineReducers } from 'redux'

import { NAV_UPDATE_CURRENT_LOCATION } from '../actions'

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
    case NAV_UPDATE_CURRENT_LOCATION:
      return action.payload
      break
    default:
      return state
  }
}

export default combineReducers({ current })
