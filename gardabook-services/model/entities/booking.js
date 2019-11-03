const { ddb, tableName } = require("./ddb");
const { validateProps, requiredPropKeyEnum } = require("./validators/bookingValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
    return false
  }

  const bookingBooking = {
    pKey: {
      S: String(props.pKey)
    },
    sKey: {
      S: String(props.sKey)
    }
  };

  if (props.userId) {
    bookingBooking.userId = {
      S: String(props.userId)
    };
  };
  
  if (props.transactionId) {
    bookingBooking.transactionId = {
      S: String(props.transactionId)
    }
  }

  if (props.catalogueId) {
    bookingBooking.catalogueId = {
      S: String(props.catalogueId)
    }
  }

  if (props.date) {
    bookingBooking.date = {
      N: props.date
    }
  }

  if (props.time) {
    bookingBooking.time = {
      N: props.time
    }
  }

  if (props.slot) {
    bookingBooking.slot = {
      N: props.slot
    }
  }

  if (props.startTime) {
    bookingBooking.startTime = {
      N: props.startTime
    }
  }

  if (props.endTime) {
    bookingBooking.endTime = {
      N: props.endTime
    }
  }

  if (props.amount) {
    bookingBooking.amount = {
      S: String(props.amount)
    }
  }

  if (props.createdAt) {
    bookingBooking.createdAt = {
      N: props.createdAt
    }
  }

  if (props.updatedAt) {
    bookingBooking.updatedAt = {
      N: props.updatedAt
    }
  }

  const userBooking = {
    pKey: {
      S: String(props.userId)
    },
    sKey: {
      S: String(props.pKey)
    }
  }

  const catalogueBooking = {
    pKey: {
      S: String(props.catalogueId)
    },
    sKey: {
      S: String(props.pKey)
    }
  }

  return { bookingBooking, userBooking, catalogueBooking }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createBooking = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const { bookingBooking, userBooking, catalogueBooking } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...bookingBooking
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
        ...userBooking
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
        ...catalogueBooking
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
      return { bookingId: bookingBooking.pKey.S }
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readUserBooking = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { userBooking } = obj

  const b = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: userBooking.pKey.S
        },
        ":s1": {
          S: "Booking_"
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

  let bookings = []

  b.Items.forEach(function (item, index) {
    const booking = new Promise((resolve, reject) => {
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

    bookings.push(booking)
  })

  const result = await Promise.all(bookings).then(data => {
    let finalData = []
    data.forEach(function (item, index) {
      finalData = finalData.concat(item.Items)
    })
    return { "bookings": finalData }
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
const readBooking = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { bookingBooking } = obj

  const bookingResult = new Promise((resolve, reject) => {
    const params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: bookingBooking.pKey.S
        },
        ":s1": {
          S: bookingBooking.sKey.S
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

  const result = await Promise.all([bookingResult]).then(data => {
    return data[0].Items[0]
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
const updateBooking = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { bookingBooking } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...bookingBooking
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
const deleteBooking = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
  if (!obj) {
    return false
  }

  const { bookingBooking } = obj

  const bookingBookingResult = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: bookingBooking.pKey.S
        },
        sKey: {
          S: bookingBooking.sKey.S
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

  let ops = []

  const userBookingResult = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: bookingBookingResult.Attributes.userId.S
        },
        sKey: {
          S: bookingBooking.pKey.S
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

  const catalogueBookingResult = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: bookingBookingResult.Attributes.catalogueId.S
        },
        sKey: {
          S: bookingBooking.pKey.S
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

  return await Promise.all([userBookingResult, catalogueBookingResult]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  createBooking,
  readUserBooking,
  readBooking,
  updateBooking,
  deleteBooking
}
