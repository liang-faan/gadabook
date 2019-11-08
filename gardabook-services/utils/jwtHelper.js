
const getJwtUser = (event) => {
  return event.cognitoPoolClaims.sub;
}

const validateUserId = (jwtSub, userId) => {
  if (userId == 'User_' + jwtSub) {
    return true
  }
  else {
    return false
  }
}

module.exports = {
    getJwtUser,
    validateUserId 
}