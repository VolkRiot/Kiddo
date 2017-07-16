'use strict';

const Crud         = require('./CRUD'),
      EventModel   = require('./../models/event'),
      UserModel    = require('./../models/user'),
      KidModel     = require('./../models/kid');

const EventController = new Crud(EventModel);

// Appending extra property into UserController Obj
EventController.name = 'EventController';

// OverWriting create method for Kids Collection
EventController.create =  function (query, cb) {
  let entry = new this.Model(query);

  entry.save((err, doc) => {

    if (err || !doc) {
      let err = 'Fail on save event';
      return this.errorHandler(err, doc, cb);
    }

    KidModel.findOneAndUpdate({_id: doc.kid_id}, {$push:{events:doc._id}}, (err, result) => {

      if (err || !result) {
        let err = 'Fail on save event';
        return this.errorHandler(err, null, cb);
      }

      UserModel.findOneAndUpdate({_id: doc.user_id}, {$push:{events:doc._id}}, (err, result) => {

        if(err || !result){
          let err = 'Fail on save event';
          return this.errorHandler(err, null, cb);
        }
        this.errorHandler(err, doc, cb);
      });

    });

  });
};

module.exports = EventController;
//(TODO) find better way to add customized queries to EventController
