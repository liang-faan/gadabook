const {
  createSession,
  readSession,
  updateSession,
  deleteSession
} = require("../session")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  userId: "cat1",
  csrfToken: "1",
  createTime: "1"
}

// createSession(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readSession(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateSession(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteSession(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
