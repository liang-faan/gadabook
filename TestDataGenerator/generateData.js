var AWS = require("aws-sdk")
var async = require("async")
var gen = require("./dataGenerator")

// AWS.config not required if 'aws configure' has been done in the cli as the sdk will automatically use it.

var dynamodb = new AWS.DynamoDB({ region: "ap-southeast-1" })
var tableName = "gardabook-develop"

var numberOfCatalogues = 5
var numberOfUsers = 10
var numberOfTags = 2
var numberOfAvailabilties = 3
var numberOfBookings = 5
var numberOfEnrollments = 3

var allData = gen.generateAllData(
  numberOfCatalogues,
  numberOfUsers,
  numberOfTags,
  numberOfAvailabilties,
  numberOfBookings,
  numberOfEnrollments
)

// SETUP WORKLOADS
var work = [].concat(
  function(done) {
    // var tableName = "Gardabook.User"
    console.log("Generated", Object.keys(allData).length, "User")
    processDataset(done, allData, tableName)
  },
  function(done) {
    // var tableName = "Gardabook.Tag"
    console.log("Generated", Object.keys(allData).length, "Tag")
    processDataset(done, allData, tableName)
  },
  function(done) {
    // var tableName = "Gardabook.Availability"
    console.log("Generated", Object.keys(allData).length, "Availability")
    processDataset(done, allData, tableName)
  },
  function(done) {
    // var tableName = "Gardabook.Catalogue"
    console.log("Generated", Object.keys(allData).length, "Catalogue")
    processDataset(done, allData, tableName)
  },
  function(done) {
    // var tableName = "Gardabook.Bookings"
    console.log("Generated", Object.keys(allData).length, "Bookings")
    processDataset(done, allData, tableName)
  },
  function(done) {
    // var tableName = "Gardabook.Enrollment"
    console.log("Generated", Object.keys(allData).length, "Enrollment")
    processDataset(done, allData, tableName)
  }
)
// END SETUP WORKLOADS

function startProcessingDataSeries() {
  async.series(work, function(err, data) {
    if (err) console.log("Unexpected Error: ", err, err.stack)
  })
}

startProcessingDataSeries()

function executeBatchPut(params) {
  var request = dynamodb.batchWriteItem(params)
  return request.promise()
}

function processDataset(done, allData, tableName, UnprocessedItems) {
  console.log("processDataset")
  var params = buildParams()
  console.log(params)
  var requestItemCount = params.RequestItems[tableName].length
  if (requestItemCount === 0) {
    done()
    return
  }

  executeBatchPut(params)
    .then(processBatchPutResponse)
    .catch(handleError)

  function processBatchPutResponse(response) {
    var request

    if (!response.UnprocessedItems || !response.UnprocessedItems.length) {
      console.log("   Wrote", requestItemCount, "items to table", tableName)
      processDataset(done, allData, tableName)
      return
    }

    var unprocessedCount = Object.keys(response.UnprocessedItems).length
    if (unprocessedCount > 0) {
      console.log(
        "   Wrote",
        requestItemCount - unprocessedCount,
        "items to table",
        tableName,
        "(Unable to process",
        unprocessedCount,
        "items)"
      )
      processDataset(done, allData, tableName, response.UnprocessedItems)
    }
  }

  function buildParams() {
    var dataSet = allData
    console.log("dataSet")
    console.log(dataSet)
    var params = {
      RequestItems: {},
      ReturnConsumedCapacity: "TOTAL"
    }
    params.RequestItems[tableName] = []

    if (UnprocessedItems) {
      params.RequestItems = UnprocessedItems
    }

    for (var id in dataSet) {
      if (params.RequestItems[tableName].length === 25) break

      var request = {
        PutRequest: {
          Item: dataSet[id]
        }
      }

      params.RequestItems[tableName].push(request)
      delete dataSet[id]
    }
    return params
  }

  function handleError(err) {
    console.log("   Error:", err, err.stack)
    if (params.RequestItems.length !== 0) {
      processDataset(done, allData, tableName, params.RequestItems)
    }
  }
}
