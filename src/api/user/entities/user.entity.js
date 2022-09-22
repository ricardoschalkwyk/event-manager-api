const mongoose = require("mongoose");

// Creating a shema with mongoose

// This is the structure of how a user will sign up

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
