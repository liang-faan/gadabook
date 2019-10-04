'use strict';


/**
 * Create user
 * This can only be done by the logged in user.
 *
 * xIntRole String 
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(xIntRole,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * xIntRole String 
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(xIntRole,username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * xIntRole String 
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserByName = function(xIntRole,username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "userStatus" : 5,
  "phone" : "phone",
  "userId" : 1,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * xIntRole String 
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(xIntRole,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
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
exports.userLogin = function(xIntRole,username,password) {
  return new Promise(function(resolve, reject) {
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
exports.userLogout = function(xIntRole) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

