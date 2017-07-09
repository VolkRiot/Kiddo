'use strict'

const Crud         = require('./CRUD'),
      EventModel   = require('./../models/event.js'),
      User         = require('./../models/user');

const EventController = new Crud(EventModel);

// Appending extra property into UserController Obj
EventController.name = 'EventController';

//(TODO) find better way to add customized queries to EventController
// OverWriting create method for Kids Collection
EventController.create =  function (query, cb) {
  let entry = new this.Model(query.body);

  entry.save((err, doc) => {
    if (err) {
      this.errorHandler(err, doc, cb);
    } else {
      User.findOneAndUpdate({_id: query.user_id}, {$push:{events:doc._id}}, (err, doc) => {
        if(err){
          this.errorHandler(err, doc, cb);
        } else{
          this.errorHandler(err, doc, cb);
        }
      });
    }
  });
};

module.exports = EventController;
