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
  createdAt: "1",
  updatedAt: "1"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createSession(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readSession(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateSession(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readSession(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteSession(test1)
  console.log(delete1)
}

test()
