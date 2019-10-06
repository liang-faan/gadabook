const {
  createCatalogue,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue
} = require("../catalogue")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  enrollmentId: "cat1",
  name: "1",
  currency: "1",
  tnc: "1",
  rate: "1",
  unit: "1",
  remark: "1",
  tagId: "1",
  venue: "1",
  type: "1",
  city: "1",
  address: "1"
}

// createCatalogue(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

readCatalogue(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))

//   updateCatalogue(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))

// deleteCatalogue(test1)
//   .then(res => {
//     console.log("res")
//     console.log(res)
//   })
//   .catch(err => console.log(err))
