const Users  = require('../models/user');


module.exports = {
  find (query, cb) {
    Users.find(query, (err, docs) => {
      this.errorHandler(err,docs, cb);
    })
  },
  findById (id, cb) {
    Users.findById({_id: id}, (err, docs) => {
      this.errorHandler(err,docs, cb);
    })
  },
  update (id, update, cb) {
    Users.findByIdAndUpdate({_id: id}, update, {new: true}, (err, docs) => {
      this.errorHandler(err,docs, cb);
    })
  },
  create (query, cb) {
    let entry = new Users(query);

    entry.save((err, docs) => {
      this.errorHandler(err,docs, cb);
    })
  },
  destroy (id, cb) {
    Users.findOneAndRemove({ _id: id }, (err, docs) => {
      this.errorHandler(err,docs, cb);
    })
  },

  // ERROR HANDLER
  errorHandler (err, docs, cb)  {
    if (err) {
      return cb(err, null);
    } else {
      return cb(null, docs);
    }
  },
  controller: 'UsersController'
  /////////////////////////
};