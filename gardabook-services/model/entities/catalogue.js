const { ddb, tableName } = require("./ddb")
const { validateProps, requiredPropKeyEnum } = require("./validators/catalogueValidator")

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Object.<object, any> | boolean}
 */
const generateObj = (props, validateOption) => {
  if (!validateProps(props, validateOption)) {
    return false
  }

  const catalogueCatalogue = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  if (props.tagId) {
    catalogueCatalogue.tagId = {
      S: props.tagId
    }
  }

  if (props.availabilityId) {
    catalogueCatalogue.availabilityId = {
      S: props.availabilityId
    }
  }

  if (props.name) {
    catalogueCatalogue.name = {
      S: props.name
    }
  }

  if (props.currency) {
    catalogueCatalogue.currency = {
      S: props.currency
    }
  }

  if (props.tnc) {
    catalogueCatalogue.tnc = {
      S: props.tnc
    }
  }

  if (props.rate) {
    catalogueCatalogue.rate = {
      S: props.rate
    }
  }

  if (props.unit) {
    catalogueCatalogue.unit = {
      S: props.unit
    }
  }

  if (props.remark) {
    catalogueCatalogue.remark = {
      S: props.remark
    }
  }

  if (props.venue) {
    catalogueCatalogue.venue = {
      S: props.venue
    }
  }

  if (props.city) {
    catalogueCatalogue.city = {
      S: props.city
    }
  }

  if (props.address) {
    catalogueCatalogue.address = {
      S: props.address
    }
  }

  const keyCatalogue = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    }
  }

  const tagCatalogue = {
    pKey: {
      S: props.tagId
    },
    sKey: {
      S: props.pKey
    }
  }

  const availabilityCatalogue = {
    pKey: {
      S: props.availabilityId
    },
    sKey: {
      S: props.pKey
    }
  }

  return {
    catalogueCatalogue,
    tagCatalogue,
    availabilityCatalogue,
    keyCatalogue
  }
}

/**
 * @param {Object.<string, any>} props An object containing the relevant properties for update
 * @returns {Promise.<boolean>}
 */
const createCatalogue = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.CREATE)
  if (!obj) {
    return false
  }

  const {
    catalogueCatalogue,
    tagCatalogue,
    availabilityCatalogue
  } = obj

  //TODO: need to roll if fail
  const op1 = new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueCatalogue
      },
      TableName: tableName
    }
    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })

  const op2 = new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...tagCatalogue
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

  const op3 = new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...availabilityCatalogue
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

  return await Promise.all([op1, op2, op3]).then((res, err) => {
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
const readCatalogues = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const {
    keyCatalogue
  } = obj

  const c = await new Promise((resolve, reject) => {
    var params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: keyCatalogue.pKey.S
        },
        ":s1": {
          S: "Catalogue_"
        }
      },
      KeyConditionExpression: "pKey = :p1 and begins_with(sKey, :s1)",
      TableName: tableName
    }

    ddb.query(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(JSON.stringify(data))
        resolve(data)
      }
    })
  })

  let catalogues = []

  c.Items.forEach(function (item, index) {
    const catalogue = new Promise((resolve, reject) => {
      var params = {
        ExpressionAttributeValues: {
          ":p1": {
            S: item.sKey.S
          },
          ":s1": {
            S: item.sKey.S
          }
        },
        KeyConditionExpression: "pKey = :p1 and sKey = :s1",
        TableName: tableName
      }

      ddb.query(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
          reject(err)
        } else {
          console.log(JSON.stringify(data))
          resolve(data)
        }
      })
    })

    catalogues.push(catalogue)
  })

  const result = await Promise.all(catalogues).then(data => {
    return data
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
const readCatalogue = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const { keyCatalogue } = obj

  const op1 = new Promise((resolve, reject) => {
    const params = {
      ExpressionAttributeValues: {
        ":p1": {
          S: keyCatalogue.pKey.S
        },
        ":s1": {
          S: keyCatalogue.sKey.S
        }
      },
      KeyConditionExpression: "pKey = :p1 and sKey = :s1",
      TableName: tableName
    }

    ddb.query(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(JSON.stringify(data))
        resolve(data)
      }
    })
  })

  const result = await Promise.all([op1]).then(data => {
    return data
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
const updateCatalogue = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue } = obj

  const op1 = await new Promise((resolve, reject) => {
    const params = {
      Item: {
        ...catalogueCatalogue
      },
      TableName: tableName
    }
    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })

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
const deleteCatalogue = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.DELETE)
  if (!obj) {
    return false
  }

  const {
    catalogueCatalogue
  } = obj

  const catalogueResult = await new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: catalogueCatalogue.pKey.S
        },
        sKey: {
          S: catalogueCatalogue.sKey.S
        }
      },
      ReturnValues: "ALL_OLD",
      TableName: tableName
    }
    ddb.deleteItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })

  let ops = []

  const op2 = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: catalogueResult.Attributes.tagId.S
        },
        sKey: {
          S: catalogueCatalogue.pKey.S
        }
      },
      TableName: tableName
    }
    ddb.deleteItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })

  ops.push(op2)

  const op3 = new Promise((resolve, reject) => {
    const params = {
      Key: {
        pKey: {
          S: catalogueResult.Attributes.availabilityId.S
        },
        sKey: {
          S: catalogueCatalogue.pKey.S
        }
      },
      TableName: tableName
    }
    ddb.deleteItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })

  ops.push(op3)

  return Promise.all(ops).then((res, err) => {
    if (!err) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  createCatalogue,
  readCatalogues,
  readCatalogue,
  updateCatalogue,
  deleteCatalogue
}
