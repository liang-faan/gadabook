function generateCatalogueObject(props) {
  if (!validateProps(props)) {
    return false
  }

  var catalogueCatalogue = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    enrollmentId: {
      S: props.enrollmentId
    },
    name: {
      S: props.name
    },
    currency: {
      S: props.currency
    },
    tnc: {
      S: props.tnc
    },
    rate: {
      S: props.rate
    },
    venue: {
      S: props.venue
    },
    type: {
      S: props.type
    },
    city: {
      S: props.city
    },
    address: {
      S: props.address
    },
    active: {
      BOOL: props.active
    }
  }

  var tagCatalogue = {
    pKey: {
      S: props.tagId
    },
    sKey: {
      S: props.pKey
    }
  }

  var enrollmentCatalogue = {
    pKey: {
      S: props.enrollmentId
    },
    sKey: {
      S: props.pKey
    }
  }

  return { catalogueCatalogue, tagCatalogue, enrollmentCatalogue }
}

// TODO: Validate catalogue props
function validateProps(props) {
  return true
}

module.exports = {
  generateCatalogueObject
}
