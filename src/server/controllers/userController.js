'use strict';

const Crud        = require('./CRUD'),
      UserModel   = require('./../models/user');

const UserController = new Crud(UserModel);

// Appending extra property into UserController Obj
UserController.name = 'UserController';

// Overwriting CRUD methods to better serve UserModel
UserController.destroy = function (id, cb) {

  this.Model.findById({ _id: id }, (err, user) => {
    if (err) {
      // user not found on destroy
      this.errorHandler(err, user, cb);
    } else if (user) {
      user.remove((err, result) => {
        this.errorHandler(err, result, cb);
      });
    } else {
      this.errorHandler(err, user, cb);
    }
  });

};

UserController.findById = function (query, cb) {
  let totalModels = Object.keys(this.Model.base.models).join('|').toLowerCase().split('|');
  this.Model.findById(query).populate(totalModels).exec((err, docs) => {

    docs = {
      _id: docs._id,
      lastName: docs.lastName,
      firstName: docs.firstName,
      email: docs.email,
      googleId: docs.googleId,
      events: docs.events,
      kids: docs.kids
    };

    this.errorHandler(err, docs, cb);
  });

};

module.exports = UserController;
