'use strict'

const Crud       = require('./CRUD'),
      KidModel   = require('./../models/kid'),
      User       = require('./../models/user');

const KidController = new Crud(KidModel);

// Appending extra property into KidController Obj
KidController.name = 'KidController';

//(TODO) find better way to add customized queries to KidController
// OverWriting create method for Kids Collection
KidController.create =  function (query, cb) {
  let entry = new this.Model(query.body);

  entry.save((err, doc) => {
    if (err) {
      this.errorHandler(err, doc, cb);
    } else {
      User.findOneAndUpdate({_id: query.user_id}, {$push:{kids:doc._id}}, (err, doc) => {
        if(err){
          this.errorHandler(err, doc, cb);
        } else{
          this.errorHandler(err, doc, cb);
        }
      });
    }
  });
};

module.exports = KidController;