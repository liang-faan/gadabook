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
  updatedAt: "d"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createAvailability(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readAvailability(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateAvailability(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readAvailability(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteAvailability(test1)
  console.log(delete1)
}

test()
