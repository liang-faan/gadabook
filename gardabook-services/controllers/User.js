'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    body = req.params['body'].value;
  }
  User.createUser(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser(req, res, next) {
  var xIntRole = '';
  var username;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    username = req.swagger.params['username'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    username = req.params['username'].value;
  }
  User.deleteUser(xIntRole, username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserByName = function getUserByName(req, res, next) {
  var xIntRole = '';
  var username;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    username = req.swagger.params['username'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    username = req.params['username'].value;
  }
  User.getUserByName(xIntRole, username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUser = function updateUser(req, res, next) {
  var xIntRole = '';
  var body;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    body = req.swagger.params['body'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    body = req.params['body'].value;
  }
  User.updateUser(xIntRole, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogin = function userLogin(req, res, next) {

  var xIntRole = '';
  var username;
  var password;
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
    username = req.swagger.params['username'].value;
    password = req.swagger.params['password'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
    username = req.params['username'].value;
    password = req.params['password'].value;
  }

  User.userLogin(xIntRole, username, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogout = function userLogout(req, res, next) {
  var xIntRole = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['x-int-role'].value;
  } else {
    xIntRole = req.params['x-int-role'].value;
  }
  User.userLogout(xIntRole)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};