const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // next two statements throw a server error
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
