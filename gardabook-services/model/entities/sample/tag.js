const { createTag, readTag, updateTag, deleteTag } = require("../tag")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  description: "cat1",
  catalogueId: "1"
}

// createTag(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readTag(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateTag(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteTag(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
