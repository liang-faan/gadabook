const { ddb, tableName } = require("./ddb")

const deleteWithKeys = (pKey, sKey, returnOldValues) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: pKey
        },
        sKey: {
          S: sKey
        }
      },
      TableName: tableName
    }

    if (returnOldValues) {
      params.ReturnValues = "ALL_OLD"
    }

    ddb.deleteItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}

const queryWithKeys = (pkey, sKey) => {
  return new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: pkey
        },
        ":s1": {
          S: sKey
        }
      },
      KeyConditionExpression: "pKey = :p1 and sKey = :s1",
      TableName: tableName
    }

    ddb.query(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(JSON.stringify(data))
        resolve(data)
      }
    })
  })
}

const queryGsi = (pKey, sKeyPrefix) => {
    return new Promise((resolve, reject) => {
        var params = {
          ExpressionAttributeValues: {
            ":p1": {
              S: pKey
            },
            ":s1": {
              S: sKeyPrefix
            }
          },
          KeyConditionExpression: "pKey = :p1 and begins_with(sKey, :s1)",
          TableName: tableName
        }
    
        ddb.query(params, (err, data) => {
          if (err) {
            console.log(err, err.stack)
            reject(err)
          } else {
            console.log(JSON.stringify(data))
            resolve(data)
          }
        })
      })
}

const updateContent = (content, returnOldValues) => {
  return new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...content
      },
      TableName: tableName
    }

    if (returnOldValues) {
      params.ReturnValues = "ALL_OLD"
    }

    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}

module.exports = {
    deleteWithKeys,
    queryWithKeys,
    queryGsi,
    updateContent,
}