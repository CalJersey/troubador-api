let mongoose = require("mongoose");
let Schema = mongoose.Schema;
passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema({
  username: String,
  password: String,
  hometown: {
    type: Schema.Types.ObjectId,
    ref: "City"
  },
  image: String
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);
module.exports = User;
