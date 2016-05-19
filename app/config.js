var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoose DB');
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var urls = new Schema ({
  //id? Nope: http://stackoverflow.com/questions/8111846/how-to-set-objectid-as-a-data-type-in-mongoose
  url: String,
  baseURL: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { //http://mongoosejs.com/docs/guide.html#timestamps
    type: Date,
    default: Date.now
  } 
});

var users = new Schema ({
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

///////////////////////////////////////////////////////////
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
