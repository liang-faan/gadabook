function generateSessionObject(props) {
  if (!validateProps(props)) {
    return false
  }

  var sessionSession = {
    pKey: {
      S: props.pKey
    },
    sKey: {
      S: props.sKey
    },
    userId: {
      S: props.userId
    },
    csrfToken: {
      S: props.csrfToken
    },
    createTime: {
      S: props.createTime
    },
    active: {
      BOOL: props.active
    }
  }

  return { sessionSession }
}

// TODO: Validate session props
function validateProps(props) {
  return true
}

module.exports = {
  generateSessionObject
}
