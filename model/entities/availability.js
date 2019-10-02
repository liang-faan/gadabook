var AWS = require("aws-sdk")

var dynamodb = new AWS.DynamoDB({
  region: "ap-southeast-1",
  apiVersion: "2012-08-10"
})

var tableName = "gardabook-develop"

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<string, any> | boolean}
 */
function generateAvailabilityObject(props) {
  if (!validateProps(props)) {
    return false
  }

  var availabilityAvailability = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    catalogueId: {
      S: props.catalogueId
    },
    date: {
      N: props.date
    },
    time: {
      N: props.time
    },
    slot: {
      N: props.slot
    },
    createdAt: {
      N: props.createdAt
    },
    active: {
      BOOL: props.active
    }
  }

  var catalogueAvailability = {
    pKey: {
      S: props.catalogueId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { availabilityAvailability, catalogueAvailability }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise}
 */
function createAvailability(props) {
  var correctProps = true

  // TODO: Check if required (and optional) keys for this action is present

  var obj = generateAvailabilityObject(props)
  var operations = Object.keys(obj).map(function(key) {
    var operation = obj[key]
    return new Promise(function(resolve, reject) {
      if (correctProps) {
        var params = {
          Item: {
            ...operation
          },
          TableName: tableName
        }

        dynamodb.putItem(params, function(err, data) {
          if (err) console.log(err, err.stack)
          else console.log(data)
        })

        resolve("TODO: add dynamo")
      } else {
        reject("Error with availability props")
      }
    })
  })

  return Promise.all(operations).then(function(res, err) {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

// TODO: Validate availability props
function validateProps(props) {
  return true
}

module.exports = {
  generateAvailabilityObject
}
