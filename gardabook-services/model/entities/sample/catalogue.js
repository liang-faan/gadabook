const {
  createCatalogue,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue,
  readCataloguelist
} = require("../catalogue")

const test1 = {
  pKey: "abc1234",
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
  address: "1",
  createdAt: "d",
  updatedAt: "d"
}

const test = async () => {
  console.log("\nCREATE")
  let create1 = await createCatalogue(test1)
  console.log(create1)

  console.log("\nREAD")
  let read1 = await readCatalogue(test1)
  console.log(read1)

  console.log("\nUPDATE")
  let update1 = await updateCatalogue(test1)
  console.log(update1)

  console.log("\nREAD: ")
  let read2 = await readCatalogue(test1)
  console.log(read2)

  console.log("\nDELETE")
  let delete1 = await deleteCatalogue(test1)
  console.log(delete1)

  console.log("\nLIST")
  let list1 = await readCataloguelist({})
  console.log(list1)
}

test()
