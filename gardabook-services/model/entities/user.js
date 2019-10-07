const { ddb, tableName } = require("./ddb")
const { validateProps } = require("./validators/userValidator")

// Specify properties available to each operation
// Modifications should also be updated in generateObj

const possiblePropKeys = [
  "pKey",
  "sKey",
  "role",
  "username",
  "firstName",
  "lastName",
  "email",
  "phone",
  "dob",
  "gender",
  "address",
  "status",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "role",
  "username",
  "firstName",
  "lastName",
  "email",
  "phone",
  "dob",
  "gender",
  "address",
  "status",
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

  const userUser = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.role) {
    userUser.role = {
      S: props.role
    }
  }

  if (props.username) {
    userUser.username = {
      S: props.username
    }
  }

  if (props.firstName) {
    userUser.firstName = {
      S: props.firstName
    }
  }

  if (props.lastName) {
    userUser.lastName = {
      S: props.lastName
    }
  }

  if (props.email) {
    userUser.email = {
      S: props.email
    }
  }

  if (props.phone) {
    userUser.phone = {
      S: props.phone
    }
  }

  if (props.dob) {
    userUser.dob = {
      S: props.dob
    }
  }

  if (props.gender) {
    userUser.gender = {
      S: props.gender
    }
  }

  if (props.address) {
    userUser.address = {
      S: props.address
    }
  }

  if (props.status) {
    userUser.status = {
      S: props.status
    }
  }

  const userlistUser = {
    pKey: {
      S: "Userlist"
    },
    sKey: {
      S: props.pKey
    }
  }

  return { userUser, userlistUser }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createUser = async props => {
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
  console.log(requiredPropKeys)
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

  const { userUser, userlistUser } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...userUser
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
        ...userlistUser
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
const readUser = async props => {
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

  const { userUser } = obj

  const op1 = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":v1": {
          S: userUser.pKey.S
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
const updateUser = async props => {
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

  const { userUser } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...userUser
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
const deleteUser = async props => {
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

  const { userUser, userlistUser } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: userUser.pKey.S
        },
        sKey: {
          S: userUser.sKey.S
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
          S: userlistUser.pKey.S
        },
        sKey: {
          S: userlistUser.sKey.S
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

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readUserlist = async props => {
  const op1 = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":v1": {
          S: "Userlist"
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

module.exports = {
  generateUserObject: generateObj,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  readUserlist
}
