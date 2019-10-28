const getBooking = require('./get')

const booking1 = getBooking.data1
const booking2 = getBooking.data2

const data1 = { bookings: [booking1, booking2] }

module.exports = {
  data1,
}
