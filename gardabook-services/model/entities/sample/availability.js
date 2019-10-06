const { createAvailability, readAvailability } = require("../availability")

const test1 = {
  pKey: "abc",
  sKey: "def",
  catalogueId: "cat",
  date: "1",
  time: "1",
  slot: "1",
  createdAt: "1",
  active: true
}

readAvailability(test1)
  .then(res => {
    console.log("res")
    console.log(res)
  })
  .catch(err => console.log(err))
