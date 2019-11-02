exports.handler = (event, context, callback) => {
  const { userName, callerContext } = event
  const atCount = (userName.match(new RegExp('@', 'g')) || []).length
  if (atCount === 1) {
    callback(null, event)
  } else if (
    atCount === 2 &&
    callerContext.clientId === 'd0or9299ilbul3m29ohq86n1i'
  ) {
    callback(null, event)
  } else {
    var error = new Error('Cannot authenticate user with this method.')
    callback(error, event)
  }
}
