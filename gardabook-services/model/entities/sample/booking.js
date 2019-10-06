const {
  createBooking,
  readBooking,
  updateBooking,
  deleteBooking
} = require("../booking")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  userId: "cat1",
  availabilityId: "1",
  startTime: "1",
  endTime: "1",
  amount: "1"
}

// createBooking(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readBooking(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateBooking(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteBooking(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
