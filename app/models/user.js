var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var Schema = mongoose.Schema;
var usersSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  timestamps: {
    type: Date,
    default: Date.now
  } 
});

// compile schema into model
var User = mongoose.model('User', usersSchema);
//somewhere we do new User later
          // {  We may need to add this, but we think these are implied.
          //   tableName: 'users',
          //   hasTimestamps: true,
          // }


User.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
