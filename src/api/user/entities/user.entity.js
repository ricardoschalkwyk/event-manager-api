const mongoose = require("mongoose");

// These roles are only assigned once
const Roles = {
  User: "User",
  Admin: "Admin",
};

// Creating a schema with mongoose

// This is the structure of how a user will sign up and how data is stored
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: Roles.User },

  // This gives a relationship between an event and user
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
});

module.exports = mongoose.model("user", userSchema);
