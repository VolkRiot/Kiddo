'use strict'

const Crud        = require('./CRUD'),
      UserModel   = require('./../models/user');

const UserController = new Crud(UserModel);

// Appending extra property into UserController Obj
UserController.name = 'UserController';

//(TODO) remove .find() method from UserController (no need to display all users)

module.exports = UserController;
