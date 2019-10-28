import { combineReducers } from 'redux'
import nav from './navReducers'
import booking from './bookingReducers'

const rootReducer = combineReducers({ nav, booking })
export default rootReducer
