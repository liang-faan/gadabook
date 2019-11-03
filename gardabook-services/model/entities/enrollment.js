const { ddb, tableName } = require("./ddb")

const { 
  deleteWithKeys,
  queryWithKeys,
  queryWithKeysAndConvert,
  queryGsi,
  updateContent,
  convertFromAws 
} = require("./dbHelper")

const { validateProps, requiredPropKeyEnum } = require("./validators/enrollmentValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
    return false
  }
  const keyEnrollment = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  const enrollmentEnrollment = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.userId) {
    enrollmentEnrollment.userId = {
      S: props.userId
    }
  }

  if (props.catalogueId) {
    enrollmentEnrollment.catalogueId = {
      S: props.catalogueId
    }
  }

  if (props.expiryDate) {
    enrollmentEnrollment.expiryDate = {
      S: props.expiryDate
    }
  }

  if (props.fee) {
    enrollmentEnrollment.fee = {
      S: props.fee
    }
  }

  if (props.createdAt) {
    enrollmentEnrollment.createdAt = {
      S: props.createdAt
    }
  }

  if (props.updatedAt) {
    enrollmentEnrollment.updatedAt = {
      S: props.updatedAt
    }
  }

  const userEnrollment = {
    pKey: {
      S: props.userId
    },
    sKey: {
      S: props.pKey
    }
  }

  const catalogueEnrollment = {
    pKey: {
      S: props.catalogueId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { enrollmentEnrollment, userEnrollment, catalogueEnrollment, keyEnrollment }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment, userEnrollment, catalogueEnrollment } = obj

  const op1 = await updateContent(enrollmentEnrollment, false)

  const op2 = await updateContent(userEnrollment, false)

  const op3 = await updateContent(catalogueEnrollment, false)

  return Promise.all([op1, op2, op3]).then((res, err) => {
    if (!err) {
      return convertFromAws(enrollmentEnrollment)
    } else {
      return false
    }
  })
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for read
 * @returns {Promise.<object>}
 */
const readUserEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { userEnrollment } = obj

  const b = await queryGsi(userEnrollment.pKey.S, "Enrollment_")

  let enrollments = []

  b.Items.forEach(function (item, index) {
    const enrollment = queryWithKeysAndConvert(item.sKey.S, item.sKey.S)
    enrollments.push(enrollment)
  })

  const result = await Promise.all(enrollments).then(data => {
    let finalData = []
    data.forEach(function (item, index) {
      finalData = finalData.concat(item)
    })
    return { "enrollments": finalData }
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
const readEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment } = obj

  const enrollmentResult = queryWithKeys(enrollmentEnrollment.pKey.S, enrollmentEnrollment.sKey.S)

  const result = await Promise.all([enrollmentResult]).then(data => {
    return convertFromAws(data[0].Items[0])
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
const updateEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment } = obj

  const op1 = await updateContent(enrollmentEnrollment, false) 
  
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
const deleteEnrollment = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
  if (!obj) {
    return false
  }

  const { enrollmentEnrollment } = obj

  const enrollmentEnrollmentResult = await deleteWithKeys(enrollmentEnrollment.pKey.S, enrollmentEnrollment.sKey.S, true)

  const userEnrollmentResult = deleteWithKeys(enrollmentEnrollmentResult.Attributes.userId.S, enrollmentEnrollment.pKey.S, false)

  const catalogueEnrollmenResult = deleteWithKeys(enrollmentEnrollmentResult.Attributes.catalogueId.S, enrollmentEnrollment.pKey.S, false)

  return await Promise.all([userEnrollmentResult, catalogueEnrollmenResult]).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  createEnrollment,
  readUserEnrollment,
  readEnrollment,
  updateEnrollment,
  deleteEnrollment
}
