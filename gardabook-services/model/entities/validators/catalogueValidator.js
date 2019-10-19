
const possiblePropKeys = [
  "pKey",
  "sKey",
  "enrollmentId",
  "name",
  "currency",
  "tnc",
  "rate",
  "unit",
  "remark",
  "tagId",
  "venue",
  "type",
  "city",
  "address",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "name",
  "currency",
  "tnc",
  "rate",
  "unit",
  "remark",
  "tagId",
  "venue",
  "type",
  "city",
  "address",
  "createdAt",
  "updatedAt"
]

const requiredPropKeysForRead = ["pKey", "sKey"]

const requiredPropKeysForUpdate = ["pKey", "sKey", "updatedAt"]

const requiredPropKeysForDelete = ["pKey", "sKey"]

const requiredPropKeyEnum = {
  CREATE: 1,
  READ: 2,
  UPADTE: 3,
  DELETE: 4,
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
    }
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
