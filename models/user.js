const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  adharNumber: String,
  birthday: String,
  state: String,
  city: String,
  pincode: String,
  accountType: String
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
