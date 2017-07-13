'use strict'

const Crud        = require('./CRUD'),
      UserModel   = require('./../models/user');

const UserController = new Crud(UserModel);

// Appending extra property into UserController Obj
UserController.name = 'UserController';
UserController.destroy = function (id, cb) {

  this.Model.findById({ _id: id }, (err, user) => {
    if (err) {
      console.log('user not found on destroy');
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


//(TODO) remove .find() method from UserController (no need to display all users)

module.exports = UserController;
