var bytes = require("utf8-length")

function printPretty(data) {
  var formatted = JSON.stringify(data, null, 4)
  console.log(formatted)
  if (data) {
    console.log("Size of data:", jsonKB(data), "KB")
  }
}

function jsonKB(data) {
  // Read operation
  if (data.Items) return (bytes(JSON.stringify(data.Items)) / 1024.0).toFixed(1)
  return (bytes(JSON.stringify(data)) / 1024.0).toFixed(1)
}

var currentEpochTime = Math.floor(new Date() / 1000)
var secondsInADay = 86400
var fakerSeed = 1

module.exports = {
  printPretty,
  jsonKB,
  currentEpochTime,
  secondsInADay,
  fakerSeed
}
