const { 
  deleteWithKeys,
  queryWithKeys,
  queryWithKeysAndConvert,
  queryGsi,
  updateContent,
  convertFromAws  
} = require("./dbHelper")

const { 
  validateProps, 
  requiredPropKeyEnum 
} = require("./validators/catalogueValidator")

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

  if (props.tag) {
    catalogueCatalogue.tag = {
      S: props.tag
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
      S: "Tag_" + props.tag
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

  const allTagCatalogue = {
    pKey: {
      S: "Tag_All"
    },
    sKey: {
      S: "Tag_" + props.tag
    }
  }

  return {
    catalogueCatalogue,
    tagCatalogue,
    availabilityCatalogue,
    keyCatalogue,
    allTagCatalogue
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
    availabilityCatalogue,
    allTagCatalogue
  } = obj

  //TODO: need to roll if fail
  const op1 = updateContent(catalogueCatalogue, false)

  const op2 = updateContent(tagCatalogue, false)
  
  const op3 = updateContent(allTagCatalogue, false)

  const op4 = updateContent(availabilityCatalogue, false)

  return await Promise.all([op1, op2, op3, op4]).then((res, err) => {
    if (!err) {
      return convertFromAws(catalogueCatalogue)
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

  const c = await queryGsi(keyCatalogue.pKey.S, "Catalogue_")

  let catalogues = []

  c.Items.forEach(function (item, index) {
    const catalogue = queryWithKeysAndConvert(item.sKey.S, item.sKey.S)
    catalogues.push(catalogue)
  })

  const result = await Promise.all(catalogues).then(data => {
    let finalData = []
    data.forEach(function (item, index) {
      finalData = finalData.concat(item)
    })
    return { "catalogues": finalData }
  })
  .catch(error => {
    console.log(error)
  })

  return result
}

const readAllTags = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.READ)
  if (!obj) {
    return false
  }

  const {
    allTagCatalogue
  } = obj

  const tags = queryGsi(allTagCatalogue.pKey.S, "Tag_")

  const result = await Promise.all([tags]).then(data => {
    let finalData = []
    data[0].Items.forEach((item, index) => {
      finalData.push(item.sKey.S)
    })
    return finalData
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

  const op1 = queryWithKeys(keyCatalogue.pKey.S, keyCatalogue.sKey.S)

  const result = await Promise.all([op1]).then(data => {
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
const updateCatalogue = async props => {
  const obj = generateObj(props, requiredPropKeyEnum.UPADTE)
  if (!obj) {
    return false
  }

  const { catalogueCatalogue, tagCatalogue, availabilityCatalogue, allTagCatalogue} = obj

  let ops = []

  const op1 = await updateContent(catalogueCatalogue, true)
  ops.push(op1)

  if (op1.Attributes.tag.S != catalogueCatalogue.tag.S) {
    const op2 = await deleteWithKeys("Tag_" + op1.Attributes.tag.S, catalogueCatalogue.pKey.S, false)
    ops.push(op2)

    const op3 = await updateContent(tagCatalogue, false)
    ops.push(op3)

    const op4 = await deleteWithKeys(allTagCatalogue.pKey.S, "Tag_" + op1.Attributes.tag.S, false)
    ops.push(op4)

    const op5 = await updateContent(allTagCatalogue, false)
    ops.push(op5)
  }

  if (op1.Attributes.availabilityId.S != catalogueCatalogue.availabilityId.S) {
    const op6 = await deleteWithKeys(op1.Attributes.availabilityId.S, catalogueCatalogue.pKey.S, false)
    ops.push(op6)

    const op7 = await updateContent(availabilityCatalogue, false)
    ops.push(op7)
  }

  return Promise.all(ops).then((res, err) => {
    if (!err) {
      return { "catalogueId": catalogueCatalogue.pKey.S }
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

  const catalogueResult = await deleteWithKeys(catalogueCatalogue.pKey.S, catalogueCatalogue.sKey.S, true)

  let ops = []

  const op2 = deleteWithKeys("Tag_" + catalogueResult.Attributes.tag.S, catalogueCatalogue.pKey.S, false)
  ops.push(op2)

  const op3 = deleteWithKeys("Tag_All", "Tag_" + catalogueResult.Attributes.tag.S, false)
  ops.push(op3)

  const op4 = deleteWithKeys(catalogueResult.Attributes.availabilityId.S, catalogueCatalogue.pKey.S, false)
  ops.push(op4)

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
  deleteCatalogue,
  readAllTags
}
