const { createTag, readTag, updateTag, deleteTag } = require("../tag")

const test1 = {
  pKey: "abc123",
  sKey: "def",
  description: "cat1",
  catalogueId: "1",
  createdAt: "d",
  updatedAt: "d"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createTag(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readTag(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateTag(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readTag(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteTag(test1)
  console.log(delete1)
}

test()
