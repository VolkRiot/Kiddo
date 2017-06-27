const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;

const db = mongoose;

db.connection.on('error', err => {
  console.log('Mongoose Error: ', err);
});

db.connection.once('open', () => {
  console.log('Mongoose connection successful.');
});


module.exports = db;