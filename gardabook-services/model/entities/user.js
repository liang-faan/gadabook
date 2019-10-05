function generateUserObject(props) {
  if (!validateProps(props)) {
    return false
  }

  var userUser = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    role: {
      S: props.role
    },
    username: {
      S: props.username
    },
    firstName: {
      S: props.firstName
    },
    lastName: {
      S: props.lastName
    },
    email: {
      S: props.email
    },
    phone: {
      S: props.phone
    },
    dob: {
      N: props.dob
    },
    gender: {
      S: props.gender
    },
    address: {
      S: props.address
    },
    status: {
      S: props.status
    },
    active: {
      BOOL: props.active
    }
  }

  return { userUser }
}

// TODO: Validate user props
function validateProps(props) {
  return true
}

module.exports = {
  generateUserObject
}
