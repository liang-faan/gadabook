const {
  createBooking,
  readBooking,
  updateBooking,
  deleteBooking
} = require("../booking")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  userId: "cat1",
  availabilityId: "1",
  startTime: "1",
  endTime: "1",
  amount: "1",
  createdAt: "1",
  updatedAt: "1"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createBooking(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readBooking(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateBooking(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readBooking(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteBooking(test1)
  console.log(delete1)
}

test()
