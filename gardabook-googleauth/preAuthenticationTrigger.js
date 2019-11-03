exports.handler = (event, context, callback) => {
  const { userName, callerContext } = event
  const atCount = (userName.match(new RegExp('@', 'g')) || []).length
  if (atCount === 1) {
    callback(null, event)
  } else if (
    atCount === 2 &&
    callerContext.clientId === '1av87gafk35mmvmk7g4csu6fr6'
  ) {
    callback(null, event)
  } else {
    var error = new Error('Cannot authenticate user with this method.')
    callback(error, event)
  }
}
