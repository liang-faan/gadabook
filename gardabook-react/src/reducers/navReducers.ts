import { combineReducers } from 'redux'

import { NAV_UPDATE_CURRENT_LOCATION } from '../actions/types'

interface Action {
  type: String
  payload: any
}

export const BOOKINGS = 'BOOKINGS'
export const EXPLORE = 'EXPLORE'
export const LIST = 'LIST'
export const LISTINGS = 'LISTINGS'
export const NOTIFICATIONS = 'NOTIFICATIONS'
export const CREATE_BOOKING = 'CREATE_BOOKING'
const current = (state: String = EXPLORE, action: Action) => {
  switch (action.type) {
    case NAV_UPDATE_CURRENT_LOCATION:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ current })
