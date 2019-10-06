const { ddb, tableName } = require("./ddb")
const { validateProps } = require("./validators/availabilityValidator")

const possiblePropKeys = [
  "pKey",
  "sKey",
  "catalogueId",
  "date",
  "time",
  "slot",
  "createdAt",
  "active"
]

const requiredPropKeysForCreate = [
  "pKey",
  "sKey",
  "catalogueId",
  "date",
  "time",
  "slot",
  "createdAt",
  "active"
]

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateAvailabilityObject = props => {
  if (!validateProps(props)) {
    return false
  }

  const availabilityAvailability = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    catalogueId: {
      S: props.catalogueId
    },
    date: {
      N: props.date
    },
    time: {
      N: props.time
    },
    slot: {
      N: props.slot
    },
    createdAt: {
      N: props.createdAt
    },
    active: {
      BOOL: props.active
    }
  }

  const catalogueAvailability = {
    pKey: {
      S: props.catalogueId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { availabilityAvailability, catalogueAvailability }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createAvailability = async props => {
  // Check properties
  const propKeys = Object.keys(props)
  let correctProps = true

  const requiredPropKeys = [...requiredPropKeysForCreate]

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
  const obj = generateAvailabilityObject(props)
  if (!obj) {
    return false
  }

  const { availabilityAvailability, catalogueAvailability } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...availabilityAvailability
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

  const op2 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueAvailability
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

  return Promise.all([op1, op2])
    .then((res, err) => {
      if (!err) {
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

module.exports = {
  generateAvailabilityObject,
  createAvailability
}
