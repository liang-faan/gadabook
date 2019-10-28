import axios from 'axios'

import { rootUrl } from '../settings'
import { BOOKING_UPDATE_CURRENT_BOOKING } from './index'

export const getBooking = () => dispatch => {
  axios.get(`${rootUrl}/booking/1`).then(res => {
    console.log(res.data)
    // dispatch(res)
  })
}
