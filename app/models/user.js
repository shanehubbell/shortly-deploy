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

usersSchema.pre('save', function(next) {
  this.on('creating', this.hashPassword);
  next();
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

User.prototype.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

module.exports = User;
