import { combineReducers } from 'redux'
import nav from './navReducers'
import booking from './bookingReducers'
import catalogue from './catalogueReducers'
import view from './viewReducers'
import auth from './authReducers'

const rootReducer = combineReducers({ nav, booking, catalogue, view, auth })
export default rootReducer
