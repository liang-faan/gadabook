function generateUniqueEnrollment(props) {
  if (!validateProps(props)) {
    return false
  }

  var enrollmentEnrollment = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    userId: {
      S: props.userId
    },
    expiryDate: {
      N: props.expiryDate
    },
    fee: {
      S: props.fee
    },
    active: {
      BOOL: props.active
    }
  }

  var userEnrollment = {
    pKey: {
      S: props.userId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { enrollmentEnrollment, userEnrollment }
}

// TODO: Validate enrollment props
function validateProps(props) {
  return true
}

module.exports = {
  generateUniqueEnrollment
}
