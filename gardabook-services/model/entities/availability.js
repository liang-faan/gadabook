const { 
  deleteWithKeys,
  queryWithKeys,
  queryGsi,
  updateContent 
} = require("./dbHelper")

const { 
  validateProps, 
  requiredPropKeyEnum 
} = require("./validators/availabilityValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
    return false
  }

  const availabilityAvailability = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.catalogueId) {
    availabilityAvailability.catalogId = {
      S: props.catalogueId
    }
  }

  if (props.date) {
    availabilityAvailability.date = {
      N: props.date
    }
  }

  if (props.time) {
    availabilityAvailability.time = {
      N: props.time
    }
  }

  if (props.slot) {
    availabilityAvailability.slot = {
      N: props.slot
    }
  }

  if (props.createdAt) {
    availabilityAvailability.createdAt = {
      S: props.createdAt
    }
  }

  if (props.updatedAt) {
    availabilityAvailability.updatedAt = {
      S: props.updatedAt
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
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const { availabilityAvailability } = obj

  const op1 = await updateContent(availabilityAvailability, false)

  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readAvailability = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { availabilityAvailability } = obj

  const op1 = await queryWithKeys(availabilityAvailability.pKey.S, availabilityAvailability.sKey.S)
  
  return Promise.all([op1]).then((res, err) => {
    if (!err) {
      return op1
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const updateAvailability = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { availabilityAvailability } = obj

  const op1 = await new updateContent(availabilityAvailability, false)

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
const deleteAvailability = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
  if (!obj) {
    return false
  }

  const { availabilityAvailability } = obj

  const op1 = await new deleteWithKeys(availabilityAvailability.pKey.S, availabilityAvailability.sKey.S, false)

  return Promise.all([op1, op2]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  createAvailability,
  readAvailability,
  updateAvailability,
  deleteAvailability
}
