const { createUser, readUser, updateUser, deleteUser } = require("../user")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  role: "cat1",
  username: "1",
  firstName: "cat1",
  lastName: "cat1",
  email: "cat1",
  phone: "cat1",
  dob: "cat1",
  gender: "cat1",
  address: "cat1",
  status: "cat1"
}

// createUser(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readUser(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateUser(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteUser(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
