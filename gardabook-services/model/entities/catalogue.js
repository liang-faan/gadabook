const { ddb, tableName } = require("./ddb")
const { validateProps } = require("./validators/catalogueValidator")

// Specify properties available to each operation
// Modifications should also be updated in generateObj

const possiblePropKeys = [
  "pKey",
  "sKey",
  "enrollmentId",
  "name",
  "currency",
  "tnc",
  "rate",
  "unit",
  "remark",
  "tagId",
  "venue",
  "type",
  "city",
  "address"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "enrollmentId",
  "name",
  "currency",
  "tnc",
  "rate",
  "unit",
  "remark",
  "tagId",
  "venue",
  "type",
  "city",
  "address"
]

const requiredPropKeysForRead = ["pKey"]

const requiredPropKeysForUpdate = ["pKey", "sKey"]

const requiredPropKeysForDelete = ["pKey", "sKey"]

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = props => {
  if (!validateProps(props)) {
    return false
  }

  const catalogueCatalogue = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.enrollmentId) {
    catalogueCatalogue.enrollmentId = {
      S: props.enrollmentId
    }
  }

  if (props.name) {
    catalogueCatalogue.name = {
      S: props.name
    }
  }

  if (props.currency) {
    catalogueCatalogue.currency = {
      S: props.currency
    }
  }

  if (props.tnc) {
    catalogueCatalogue.tnc = {
      S: props.tnc
    }
  }

  if (props.rate) {
    catalogueCatalogue.rate = {
      S: props.rate
    }
  }

  if (props.unit) {
    catalogueCatalogue.unit = {
      S: props.unit
    }
  }

  if (props.remark) {
    catalogueCatalogue.remark = {
      S: props.remark
    }
  }

  if (props.venue) {
    catalogueCatalogue.venue = {
      S: props.venue
    }
  }

  if (props.type) {
    catalogueCatalogue.type = {
      S: props.type
    }
  }

  if (props.city) {
    catalogueCatalogue.city = {
      S: props.city
    }
  }

  if (props.address) {
    catalogueCatalogue.address = {
      S: props.address
    }
  }

  const tagCatalogue = {
    pKey: {
      S: props.tagId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { catalogueCatalogue, tagCatalogue }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createCatalogue = async props => {
  // Check properties
  const propKeys = Object.keys(props)
  let correctProps = true

  const requiredPropKeys = [...requiredPropKeysForCreate]

  propKeys.forEach(key => {
    if (!possiblePropKeys.includes(key)) {
      correctProps = false
    } else {
      const index = requiredPropKeys.indexOf(key)
      requiredPropKeys.splice(index, 1)
    }
  })

  if (requiredPropKeys.length > 0) {
    correctProps = false
  }

  if (!correctProps) {
    return false
  }

  // Create API payload and call
  const obj = generateObj(props)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue, tagCatalogue, enrollmentCatalogue } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueCatalogue
      },
      TableName: tableName
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

  const op2 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...tagCatalogue
      },
      TableName: tableName
    }
    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject()
      } else {
        console.log(data)
        resolve()
      }
    })
  })

  return Promise.all([op1, op2]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readCatalogue = async props => {
  // Check properties
  const propKeys = Object.keys(props)
  let correctProps = true

  const requiredPropKeys = [...requiredPropKeysForRead]

  propKeys.forEach(key => {
    if (!possiblePropKeys.includes(key)) {
      correctProps = false
    } else {
      const index = requiredPropKeys.indexOf(key)
      requiredPropKeys.splice(index, 1)
    }
  })

  if (requiredPropKeys.length > 0) {
    correctProps = false
  }

  if (!correctProps) {
    return false
  }

  // Create API payload and call
  const obj = generateObj(props)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue } = obj

  const op1 = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":v1": {
          S: catalogueCatalogue.pKey.S
        }
      },
      KeyConditionExpression: "pKey = :v1",
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

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return op1
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const updateCatalogue = async props => {
  // Check properties
  const propKeys = Object.keys(props)
  let correctProps = true

  const requiredPropKeys = [...requiredPropKeysForUpdate]

  propKeys.forEach(key => {
    if (!possiblePropKeys.includes(key)) {
      correctProps = false
    } else {
      const index = requiredPropKeys.indexOf(key)
      requiredPropKeys.splice(index, 1)
    }
  })

  if (requiredPropKeys.length > 0) {
    correctProps = false
  }

  if (!correctProps) {
    return false
  }

  // Create API payload and call
  const obj = generateObj(props)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueCatalogue
      },
      TableName: tableName
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

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const deleteCatalogue = async props => {
  // Check properties
  const propKeys = Object.keys(props)
  let correctProps = true

  const requiredPropKeys = [...requiredPropKeysForDelete]

  propKeys.forEach(key => {
    if (!possiblePropKeys.includes(key)) {
      correctProps = false
    } else {
      const index = requiredPropKeys.indexOf(key)
      requiredPropKeys.splice(index, 1)
    }
  })

  if (requiredPropKeys.length > 0) {
    correctProps = false
  }

  if (!correctProps) {
    return false
  }

  // Create API payload and call
  const obj = generateObj(props)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue, tagCatalogue } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: catalogueCatalogue.pKey.S
        },
        sKey: {
          S: catalogueCatalogue.sKey.S
        }
      },
      TableName: tableName
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

  const op2 = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: tagCatalogue.pKey.S
        },
        sKey: {
          S: tagCatalogue.sKey.S
        }
      },
      TableName: tableName
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

  return Promise.all([op1, op2]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  generateCatalogueObject: generateObj,
  createCatalogue,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue
}
