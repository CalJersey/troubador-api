let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema({
  username: String,
  password: String,
  image: String
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);
module.exports = User;
