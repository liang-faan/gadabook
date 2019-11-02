const { ddb, tableName } = require("./ddb")
const { validateProps, requiredPropKeyEnum } = require("./validators/enrollmentValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
    return false
  }
  const keyEnrollment = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  const enrollmentEnrollment = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.userId) {
    enrollmentEnrollment.userId = {
      S: props.userId
    }
  }

  if (props.catalogueId) {
    enrollmentEnrollment.catalogueId = {
      S: props.catalogueId
    }
  }

  if (props.expiryDate) {
    enrollmentEnrollment.expiryDate = {
      S: props.expiryDate
    }
  }

  if (props.fee) {
    enrollmentEnrollment.fee = {
      S: props.fee
    }
  }

  if (props.createdAt) {
    enrollmentEnrollment.createdAt = {
      S: props.createdAt
    }
  }

  if (props.updatedAt) {
    enrollmentEnrollment.updatedAt = {
      S: props.updatedAt
    }
  }

  const userEnrollment = {
    pKey: {
      S: props.userId
    },
    sKey: {
      S: props.pKey
    }
  }

  const catalogueEnrollment = {
    pKey: {
      S: props.catalogueId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { enrollmentEnrollment, userEnrollment, catalogueEnrollment, keyEnrollment }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment, userEnrollment, catalogueEnrollment } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...enrollmentEnrollment
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
        ...userEnrollment
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

  const op3 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueEnrollment
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

  return Promise.all([op1, op2, op3]).then((res, err) => {
    if (!err) {
      return { enrollmentId: enrollmentEnrollment.pKey.S }
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readUserEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { userEnrollment } = obj

  const b = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: userEnrollment.pKey.S
        },
        ":s1": {
          S: "Enrollment_"
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

  let enrollments = []

  b.Items.forEach(function (item, index) {
    const enrollment = new Promise((resolve, reject) => {
      var params = {
        ExpressionAttributeValues: {
          ":p1": {
            S: item.sKey.S
          },
          ":s1": {
            S: item.sKey.S
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

    enrollments.push(enrollment)
  })

  const result = await Promise.all(enrollments).then(data => {
    let finalData = []
    data.forEach(function (item, index) {
      finalData = finalData.concat(item.Items)
    })
    return { "enrollments": finalData }
  })
  .catch(error => {
    console.log(error)
  })

  return result
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment } = obj

  const enrollmentResult = new Promise((resolve, reject) => {
    const params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: enrollmentEnrollment.pKey.S
        },
        ":s1": {
          S: enrollmentEnrollment.sKey.S
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

  const result = await Promise.all([enrollmentResult]).then(data => {
    return data
  })
  .catch(error => {
    console.log(error)
  })

  return result
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const updateEnrollment = async props => {
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

  const { enrollmentEnrollment } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...enrollmentEnrollment
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
const deleteEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment } = obj

  const enrollmentEnrollmentResult = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: enrollmentEnrollment.pKey.S
        },
        sKey: {
          S: enrollmentEnrollment.sKey.S
        }
      },
      ReturnValues: "ALL_OLD",
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

  const userEnrollmentResult = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: enrollmentEnrollmentResult.Attributes.userId.S
        },
        sKey: {
          S: enrollmentEnrollment.pKey.S
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

  const catalogueEnrollmenResult = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: enrollmentEnrollmentResult.Attributes.catalogueId.S
        },
        sKey: {
          S: enrollmentEnrollment.pKey.S
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

  return await Promise.all([userEnrollmentResult, catalogueEnrollmenResult]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  createEnrollment,
  readUserEnrollment,
  readEnrollment,
  updateEnrollment,
  deleteEnrollment
}
