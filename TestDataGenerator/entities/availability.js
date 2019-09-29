function generateUniqueAvailability(props) {
  if (!validateProps(props)) {
    return false
  }

  var availabilityAvailability = {
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

  var catalogueAvailability = {
    pKey: {
      S: props.catalogueId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { availabilityAvailability, catalogueAvailability }
}

// TODO: Validate availability props
function validateProps(props) {
  return true
}

module.exports = {
  generateUniqueAvailability
}
