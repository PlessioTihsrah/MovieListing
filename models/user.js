const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  password: {
    type: String,
    required: true
  },
  favourites: {
    type: Schema.Types.Mixed,
    default: {}
  }
});

const User = mongoose.model("movieUsers", UserSchema);

module.exports = User;
