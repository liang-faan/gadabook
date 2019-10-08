const { ddb, tableName } = require("./ddb")
const { validateProps } = require("./validators/sessionValidator")

// Specify properties available to each operation
// Modifications should also be updated in generateObj

const possiblePropKeys = [
  "pKey",
  "sKey",
  "userId",
  "csrfToken",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "userId",
  "csrfToken",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForRead = ["pKey"]

const requiredPropKeysForUpdate = ["pKey", "sKey", "updatedAt"]

const requiredPropKeysForDelete = ["pKey", "sKey"]

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = props => {
  if (!validateProps(props)) {
    return false
  }

  const sessionSession = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.userId) {
    sessionSession.userId = {
      S: props.userId
    }
  }

  if (props.csrfToken) {
    sessionSession.csrfToken = {
      S: props.csrfToken
    }
  }

  if (props.createdAt) {
    sessionSession.createdAt = {
      S: props.createdAt
    }
  }

  if (props.updatedAt) {
    sessionSession.updatedAt = {
      S: props.updatedAt
    }
  }

  const userSession = {
    pKey: {
      S: props.userId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { sessionSession, userSession }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createSession = async props => {
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

  const { sessionSession, userSession } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...sessionSession
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
        ...userSession
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
const readSession = async props => {
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

  const { sessionSession } = obj

  const op1 = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":v1": {
          S: sessionSession.pKey.S
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
const updateSession = async props => {
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

  const { sessionSession } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...sessionSession
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
const deleteSession = async props => {
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

  const { sessionSession, userSession } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: sessionSession.pKey.S
        },
        sKey: {
          S: sessionSession.sKey.S
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
          S: userSession.pKey.S
        },
        sKey: {
          S: userSession.sKey.S
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
  generateSessionObject: generateObj,
  createSession,
  readSession,
  updateSession,
  deleteSession
}
