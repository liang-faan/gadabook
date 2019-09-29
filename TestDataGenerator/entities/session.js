function generateSessionObject(
  pKey,
  sKey,
  userId,
  csrfToken,
  createTime,
  active
) {
  var sessionSession = {
    pKey: {
      S: pKey
    },
    sKey: {
      S: sKey
    },
    userId: {
      S: userId
    },
    csrfToken: {
      S: csrfToken
    },
    createTime: {
      S: createTime
    },
    active: {
      BOOL: active
    }
  }

  return { sessionSession }
}

module.exports = {
  generateSessionObject
}
