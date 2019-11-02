import { combineReducers } from 'redux'
import nav from './navReducers'
import booking from './bookingReducers'
import catalogue from './catalogueReducers'

const rootReducer = combineReducers({ nav, booking, catalogue })
export default rootReducer
