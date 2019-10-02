var AWS = require("aws-sdk")
var async = require("async")
var gen = require("./dataGenerator")

// AWS.config not required if 'aws configure' has been done in the cli as the sdk will automatically use it.

var env = "local"
// var env = 'remote'

var options = {
  region: "ap-southeast-1",
  apiVersion: "2012-08-10"
}
if (env === "local") {
  options.endpoint = "http://localhost:8000"
}

var dynamodb = new AWS.DynamoDB(options)

var numberOfCatalogues = 1
var numberOfUsers = 1
var numberOfTags = 1
var numberOfAvailabilties = 1
var numberOfBookings = 1
var numberOfEnrollments = 1
var numberOfSessions = 1

var allData = gen.generateAllData(
  numberOfCatalogues,
  numberOfUsers,
  numberOfTags,
  numberOfAvailabilties,
  numberOfBookings,
  numberOfEnrollments,
  numberOfSessions
)

// SETUP WORKLOADS
var work = [].concat(function(done) {
  var tableName = "gardabook-develop"
  console.log("Generated", Object.keys(allData).length, tableName)
  processDataset(done, allData, tableName)
})
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
