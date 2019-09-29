function generateBookingObject(props) {
  if (!validateProps(props)) {
    return false
  }

  var bookingBooking = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    userId: {
      S: props.userId
    },
    availabilityId: {
      S: props.availabilityId
    },
    startTime: {
      N: props.startTime
    },
    endTime: {
      N: props.endTime
    },
    amount: {
      S: props.amount
    },
    active: {
      BOOL: props.active
    }
  }

  var userBooking = {
    pKey: {
      S: props.userId
    },
    sKey: {
      S: props.pKey
    }
  }

  var availabilityBooking = {
    pKey: {
      S: props.availabilityId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { bookingBooking, userBooking, availabilityBooking }
}

// TODO: Validate booking props
function validateProps(props) {
  return true
}

module.exports = {
  generateBookingObject
}
