'use strict';

class CRUD {
  constructor(Model) {
    this.Model = Model;
  }

  find(query, cb) {
    this.Model.find(query, (err, docs) => {
      this.errorHandler(err, docs, cb);
    });
  }

  findOne(query, cb) {
    this.Model.findOne(query, (err, docs) => {
      this.errorHandler(err, docs, cb);
    });
  }

  findById(id, cb) {
    this.Model.findById({ _id: id }, (err, docs) => {
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
