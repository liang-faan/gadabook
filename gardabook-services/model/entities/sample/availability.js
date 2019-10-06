const {
  createAvailability,
  readAvailability,
  updateAvailability,
  deleteAvailability
} = require("../availability")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  catalogueId: "cat1",
  date: "1",
  time: "1",
  slot: "1",
  createdAt: "1",
  active: true
}

// createAvailability(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readAvailability(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateAvailability(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteAvailability(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
