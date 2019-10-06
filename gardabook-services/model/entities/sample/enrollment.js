const {
  createEnrollment,
  readEnrollment,
  updateEnrollment,
  deleteEnrollment
} = require("../enrollment")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  userId: "cat1",
  catalogueId: "1",
  fee: "1"
}

// createEnrollment(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readEnrollment(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateEnrollment(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteEnrollment(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
