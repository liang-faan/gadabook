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
  //todo return static string - user success logout. 
  var xIntRole = '';
  var token = '';
  var userId = '';
  if (process.env.NODE_ENV == 'development') {
    xIntRole = req.swagger.params['Authorization'].value;
  } else {
    // xIntRole = req
    token = request.headers['Authorization'];
  }
  User.userLogout(xIntRole)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
  });
  // var token = "eyJraWQiOiIrVUhOYjQ0bGlSZ2VDbGNKV2VicEdJc01Ubm9MbVE2ZXkxNVRBbDNJdmVjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxYzMxNGE5MS1kYzZlLTRmOWItOGE5My1lZWM0Y2NlNGE3NWQiLCJldmVudF9pZCI6ImJmMTFjMWFhLTFlMjMtNGJjMC1iM2RhLWM3MmU0NTRmNzc3YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzI3NzQyOTAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9uOTBsN1dtd1AiLCJleHAiOjE1NzI3Nzc4OTAsImlhdCI6MTU3Mjc3NDI5MCwianRpIjoiN2IyZDJhYjYtOTNjMy00MWE4LWJkNTMtMDNkMjBiNzNkNTgwIiwiY2xpZW50X2lkIjoiMWF2ODdnYWZrMzVtbXZtazdnNGNzdTZmcjYiLCJ1c2VybmFtZSI6Im9hdXRoMi1nb29nbGVAamVyb21lMTNAZXhhbXBsZS5jb20ifQ.Foo6KHuRTeJeerJBvFjg-u6iYxxCqOyH_rno2sGuIG6UVap0wNl-RDQ5tmD-uUIS2Pxau002MuKkmWXVSjKN7sve4kM3WJxmjsJS8y6LFryflwfTtC5HNphefeQ5OnmT5Kn7OCa4JqyTx9hwC_zS7v0ww3av-vHQP75Ox9FL0k4_QuFj_4FBojJbQIKhUqD8BvwMearpj-2CdAhoYBEFkgX-n0UVS3AEvp1x0gEEoursp6jnRVMcPJbKcYXICG1oN1Q6i0d_MaHX_p42CrO7GItvQT_-s1nPFfEKj0DxQIU1-zzDzGiyep4im1P-9ZC1FzWnxlLIpHvwpsrJjQw3GA"
  // var jti = "1c314a91-dc6e-4f9b-8a93-eec4cce4a75d"
  // var sub = "7b2d2ab6-93c3-41a8-bd53-03d20b73d580"

  // User.writeRevokeToken(token, jti, sub)
  //   .then(function (response) {

  //     if (!response) {
  //       console.log("writeRevokeToken failed")
  //       return
  //     }

  //     console.log("writeRevokeToken suceeded")

  //     User.readRevokeToken(jti, sub)
  //       .then(function (response) {
  //         if (!response) {
  //           console.log("readRevokeToken failed")
  //           return
  //         }

  //         if (!response.pKey) {
  //           console.log("readRevokeToken failed")
  //           return
  //         }

  //         console.log("readRevokeToken suceeded")
  //       })
  //       .catch(function (response) {
  //         console.log("readRevokeToken failed")
  //       });
  //   })
  //   .catch(function (response) {
  //     console.log("writeRevokeToken failed")
  //   });
};