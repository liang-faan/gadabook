const possiblePropKeys = [
  "pKey",
  "sKey",
  "role",
  "userId",
  "password",
  "username",
  "email",
  "phone",
  "dob",
  "gender",
  "address",
  "status",
  "createdAt",
  "updatedAt",
  "token"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "role",
  "username",
  "password",
  "email",
  "phone",
  "address",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForCreateToken = [
  "pKey",
  "sKey",
  "token"
]

const requiredPropKeysForRead = ["pKey"]

const requiredPropKeysForUpdate = ["pKey", "sKey", "updatedAt"]

const requiredPropKeysForDelete = ["pKey", "sKey"]

const requiredPropKeyEnum = {
  CREATE: 1,
  READ: 2,
  UPADTE: 3,
  DELETE: 4,
  CREATETOKEN: 5,
  properties: {
    1: {
      values: requiredPropKeysForCreate
    },
    2: {
      values: requiredPropKeysForRead
    },
    3: {
      values: requiredPropKeysForUpdate
    },
    4: {
      values: requiredPropKeysForDelete
    },
    5: {
      values: requiredPropKeysForCreateToken
    },
  }
};

const validateProps = (props, validateOption) => {
  const propKeys = Object.keys(props)
  var requiredKeys = [...requiredPropKeyEnum.properties[validateOption].values]
  let correctProps = true

  propKeys.forEach(key => {
    if (!possiblePropKeys.includes(key)) {
      correctProps = false
    } else {
      const index = requiredKeys.indexOf(key)
      requiredKeys.splice(index, 1)
    }
  })

  if (requiredKeys.length > 0) {
    return false
  }

  if (!correctProps) {
    return false
  }

  return true;
}

module.exports = { validateProps, requiredPropKeyEnum }
