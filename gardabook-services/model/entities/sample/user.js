const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  readUserlist
} = require("../user")

const test1 = {
  pKey: "abc1234",
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
  status: "cat1",
  createdAt: "123",
  updatedAt: "123"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createUser(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readUser(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateUser(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readUser(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteUser(test1)
  console.log(delete1)

  console.log("\nLIST")
  let list1 = await readUserlist({})
  console.log(list1)
}

test()
