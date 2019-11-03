const {
  createUser,
  readUser,
  deleteUser,
  updateUser
} = require('../model/entities/user')

const { newUuid } = require('../utils/uuidGenerator')

var _ = require('lodash')

exports.createUser = function (xIntRole, body) {

  var userId = newUuid("User_")

  var params = {
    pKey: String(userId),
    sKey: String(userId),
    userId: String(userId),
    role: String(body.role),
    username: String(body.username),
    password: String(body.password),
    email: String(body.email),
    phone: String(body.phone),
    dob: String(body.dob),
    gender: String(body.gender),
    address: String(body.address),
    status: String(body.status),
    createdAt: String(Date.now()),
    updatedAt: String(Date.now()),
  }

  if (createUser(params)) {
    return params
  }

  return { message: "Create user failed", params }
}


exports.deleteUser = function (xIntRole, userId) {

  var params = {
    pKey: String(userId),
    sKey: String(userId)
  }

  return deleteUser(params)

}

exports.readUser = function (xIntRole, username) {

  var params = {
    username: username,
  }

  return readUser(params)
}


exports.updateUser = function (xIntRole, body) {

}


/**
 * Logs user into the system
 * 
 *
 * xIntRole String 
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.userLogin = function (xIntRole, username, password) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * xIntRole String 
 * no response value expected for this operation
 **/
exports.userLogout = function (xIntRole) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

