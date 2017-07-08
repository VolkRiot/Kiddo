'use strict'

const Crud        = require('./CRUD'),
      UserModel   = require('./../models/user');

const UserController = new Crud(UserModel);

// Appending extra property into UserController Obj
UserController.name = 'UserController';

module.exports = UserController;
