const { ddb, tableName } = require("./ddb")

const { 
  deleteWithKeys,
  queryWithKeys,
  queryWithKeysAndConvert,
  updateContent 
} = require("./dbHelper")

const { 
  validateProps, 
  requiredPropKeyEnum 
} = require("./validators/userValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
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

  if (props.userId) {
    userUser.userId = {
      S: props.userId
    }
  }

  if (props.password) {
    userUser.password = {
      S: props.password
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

  if (props.createdAt) {
    userUser.createdAt = {
      S: props.createdAt
    }
  }

  if (props.updatedAt) {
    userUser.updatedAt = {
      S: props.updatedAt
    }
  }

  const userToken = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.token) {
    userToken.token = {
      S: props.token
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

  return { userUser, userlistUser, userToken }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createUser = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const { userUser } = obj

  const op1 = updateContent(userUser, false)

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return { userId: userUser.pKey }
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
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { userUser } = obj

  const op1 = queryWithKeys(userUser.sKey.S, userUser.sKey.S)

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
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { userUser } = obj

  const op1 = updateContent(userUser, false)

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
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
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

const readRevokeToken = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { userToken } = obj

  const op1 = queryWithKeysAndConvert(userToken.pKey.S, userToken.sKey.S)

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return op1
    } else {
      return false
    }
  })
}

const writeRevokeToken = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATETOKEN)
  if (!obj) {
    return false
  }

  const { userToken } = obj

  const op1 = updateContent(userToken, false)

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
  readUserlist,
  readRevokeToken,
  writeRevokeToken
}
