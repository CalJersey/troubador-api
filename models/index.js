var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Wayfarer');

module.exports.City = require('./city.js');
module.exports.Post = require('./post.js');
module.exports.User = require('./user.js');
