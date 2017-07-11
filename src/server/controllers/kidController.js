'use strict'

const Crud       = require('./CRUD'),
      KidModel   = require('./../models/kid'),
      UserModel  = require('./../models/user');

const KidController = new Crud(KidModel);

// Appending extra property into KidController Obj
KidController.name = 'KidController';

// OverWriting create method for Kids Collection
KidController.create =  function (query, cb) {
  let entry = new this.Model(query);

  entry.save((err, doc) => {
    if (err) {
      this.errorHandler(err, null, cb);
    } else {
      UserModel.findOneAndUpdate({_id: doc.user_id}, {$push:{kids:doc._id}}, (err, result) => {
        if(err){
          this.errorHandler(err, null, cb);
        } else{
          this.errorHandler(err, doc, cb);
        }
      });
    }
  });

};
KidController.destroy = function (id, cb) {
  this.Model.findById({ _id: id }, (err, user) => {
    if (err) {
      console.log('user not found on destroy');
      this.errorHandler(err, user, cb);
    } else if (user) {
      console.log('user found deleting kids');
      user.remove((err, result) => {
        this.errorHandler(err, result, cb);
      });
    } else {
      this.errorHandler(err, user, cb);
    }
  });
};

module.exports = KidController;

//(TODO) find better way to add customized queries to KidController
//(TODO) saving ref to kids on user by using middleware
