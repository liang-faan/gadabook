exports.handler = async (event, context, callback) => {
  const { userName, callerContext } = event
  const atCount = (userName.match(new RegExp('@', 'g')) || []).length
  if (atCount === 1) {
    callback(null, event)
  } else if (
    atCount === 2 &&
    callerContext.clientId === 'CLIENT_ID_NOT_APPLICABLE'
  ) {
    callback(null, event)
  } else {
    var error = new Error('Cannot authenticate user with this method.')
    callback(error, event)
  }
}

// const kmsKeyId = '486f9d76-81ef-42e3-9c41-87bafd8549a3'
// const decryptPassword = encrpytedPassword => {
//   return new Promise((resolve, reject) => {
//     const params = {
//       KeyId: kmsKeyId,
//       Plaintext: buffer,
//     }
//     kms.encrypt(params, (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data.CiphertextBlob)
//       }
//     })
//   })
// }
