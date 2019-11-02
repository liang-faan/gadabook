import { combineReducers } from 'redux'

import { CATALOGUE_UPDATE_CATALOGUE_LIST } from '../actions/types'

interface Action {
  type: String
  payload: Array<Object>
}

const list = (state: Array<Object> = [], action: Action) => {
  switch (action.type) {
    case CATALOGUE_UPDATE_CATALOGUE_LIST:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({ list })
