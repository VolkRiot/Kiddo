'use strict'

const Crud        = require('./CRUD'),
      UserModel   = require('./../models/kid');

const KidController = new Crud(UserModel);

// Appending extra property into KidController Obj
KidController.name = 'KidController';

module.exports = KidController;