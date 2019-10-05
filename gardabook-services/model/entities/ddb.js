const AWS = require("aws-sdk")

// CONFIGS
const tableName = "gardabook-develop"
const env = "local"

//Create DynamoDB object
const options = {
  region: "ap-southeast-1",
  apiVersion: "2012-08-10"
}
if (env === "local") {
  options.endpoint = new AWS.Endpoint("http://localhost:8000")
}
var dynamodb = new AWS.DynamoDB(options)

module.exports = {
  ddb: dynamodb,
  tableName,
  env
}
