var mongoose = require('mongoose');
var crypto = require('crypto');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var urlsSchema = new Schema ({
  //id? Nope: http://stackoverflow.com/questions/8111846/how-to-set-objectid-as-a-data-type-in-mongoose
  url: String,
  baseURL: String,
  code: String,
  title: String,
  visits: {
    type: Number,
    default: 0
  },
  timestamps: { //http://mongoosejs.com/docs/guide.html#timestamps
    type: Date,
    default: Date.now
  } 
});

// compile schema into model
var Link = mongoose.model('Link', urlsSchema);

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;