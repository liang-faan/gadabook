function generateUniqueUser(
  pKey,
  sKey,
  role,
  username,
  firstName,
  lastName,
  email,
  phone,
  dob,
  gender,
  address,
  status,
  active
) {
  var userUser = {
    pKey: {
      S: pKey
    },
    sKey: {
      S: sKey
    },
    role: {
      S: role
    },
    username: {
      S: username
    },
    firstName: {
      S: firstName
    },
    lastName: {
      S: lastName
    },
    email: {
      S: email
    },
    phone: {
      S: phone
    },
    dob: {
      N: dob
    },
    gender: {
      S: gender
    },
    address: {
      S: address
    },
    status: {
      S: status
    },
    active: {
      BOOL: active
    }
  }

  return { userUser }
}

module.exports = {
  generateUniqueUser
}
