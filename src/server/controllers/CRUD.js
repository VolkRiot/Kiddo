'use strict';

class CRUD {
  constructor(Model) {
    this.Model = Model;

    this.errorHandler = this.errorHandler.bind(this);
  }

  findById(query, cb) {
    let totalModels = Object.keys(this.Model.base.models).join('|').toLowerCase().split('|');

    this.Model.findById(query).populate(totalModels).exec((err, docs) => {
      this.errorHandler(err, docs, cb);
    });

  }

  update(id, update, cb) {
    this.Model.findByIdAndUpdate(
        { _id: id },
        update,
        { new: true },
        (err, docs) => {
          this.errorHandler(err, docs, cb);
        }
    );
  }

  create(query, cb) {
    let entry = new this.Model(query);

    entry.save((err, docs) => {
      this.errorHandler(err, docs, cb);
    });
  }

  destroy(id, cb) {
    this.Model.findOneAndRemove({ _id: id }, (err, docs) => {
      this.errorHandler(err, docs, cb);
    });
  }

  // ERROR HANDLER
  errorHandler(err, docs, cb) {
    if (err) {
      return cb(err, null);
    } else {
      return cb(null, docs);
    }
  }
}

module.exports = CRUD;
