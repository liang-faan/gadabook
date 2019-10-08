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
  expiryDate: "d",
  fee: "1",
  createdAt: "af",
  updatedAt: "af"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createEnrollment(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readEnrollment(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateEnrollment(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readEnrollment(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteEnrollment(test1)
  console.log(delete1)
}

test()
