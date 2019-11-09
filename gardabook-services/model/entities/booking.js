const { 
  deleteWithKeys,
  queryWithKeys,
  queryWithKeysAndConvert,
  queryGsi,
  updateContent,
  convertFromAws,
  errorPromise,
  errorMessage,
  successMessage
} = require("./dbHelper")

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
    return errorPromise("Error passing object")
  }

  const { bookingBooking, userBooking, catalogueBooking } = obj

  const op1 = await updateContent(bookingBooking, false)
  const op2 = await updateContent(userBooking, false)
  const op3 = await updateContent(catalogueBooking, false)

  return Promise.all([op1, op2, op3]).then((res, err) => {
    if (!err) {
      return convertFromAws(bookingBooking)
    } else {
      return errorMessage("Error creating booking")
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
    return errorPromise("Error passing object")
  }

  const { userBooking } = obj

  const b = await queryGsi(userBooking.pKey.S, "Booking_")

  let bookings = []

  b.Items.forEach(function (item, index) {
    const booking = queryWithKeysAndConvert(item.sKey.S, item.sKey.S)
    bookings.push(booking)
  })

  const result = await Promise.all(bookings).then(data => {
    let finalData = []
    data.forEach(function (item, index) {
      finalData = finalData.concat(item)
    })
    return { "bookings": finalData }
  })
  .catch(error => {
    console.log(error)
    return errorMessage("Error readinng booking")
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
    return errorPromise("Error passing object")
  }

  const { bookingBooking } = obj

  const bookingResult = queryWithKeys(bookingBooking.pKey.S, bookingBooking.sKey.S)

  const result = await Promise.all([bookingResult]).then(data => {
    if (data[0].Items.length > 0) {
      return convertFromAws(data[0].Items[0])
    }
    else {
      return errorMessage("Error reading booking")
    }
  })
  .catch(error => {
    console.log(error)
    return errorMessage("Error reading booking")
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
    return errorPromise("Error passing object")
  }

  const { bookingBooking } = obj

  const op1 = await updateContent(bookingBooking, false)

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return successMessage("Booking updated successfully")
    } else {
      return errorMessage("Error updating booking")
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
    return errorPromise("Error passing object")
  }

  const { bookingBooking } = obj

  const bookingBookingResult = await deleteWithKeys(bookingBooking.pKey.S, bookingBooking.sKey.S, true)

  let ops = []

  const userBookingResult = deleteWithKeys(bookingBookingResult.Attributes.userId.S, bookingBooking.pKey.S, true)

  const catalogueBookingResult = deleteWithKeys(bookingBookingResult.Attributes.catalogueId.S, bookingBooking.pKey.S, true)

  return await Promise.all([userBookingResult, catalogueBookingResult]).then((res, err) => {
    if (!err) {
      return successMessage("Booking deleted successfully")
    } else {
      return errorMessage("Error deleting booking")
    }
  })
 }

module.exports = {
  readUserBooking,
  createBooking,
  readBooking,
  updateBooking,
  deleteBooking
}
