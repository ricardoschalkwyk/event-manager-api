const mongoose = require("mongoose");

// Creating a schema with mongoose

// This is the structure of how a user will sign up

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
});

module.exports = mongoose.model("user", userSchema);
