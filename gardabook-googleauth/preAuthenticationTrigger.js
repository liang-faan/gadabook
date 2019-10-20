exports.handler = (event, context, callback) => {
  const { userAttributes } = event.request
  if (userAttributes['custom:passwordAuth'] === 'yes') {
    callback(null, event)
  } else {
    var error = new Error('Cannot authenticate user with this method.')
    callback(error, event)
  }
}
