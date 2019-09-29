function generateUniqueTag(props) {
  if (!validateProps(props)) {
    return false
  }

  var tagTag = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    description: {
      S: props.description
    },
    active: {
      BOOL: props.active
    }
  }

  return { tagTag }
}

// TODO: Validate tag props
function validateProps(props) {
  return true
}

module.exports = {
  generateUniqueTag
}
