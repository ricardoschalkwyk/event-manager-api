const mongoose = require("mongoose");

// Creating a schema with mongoose

// This is the structure of a event

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  occasion: String,
  time: String,
  date: String,

  // This user is added to every event so that it can be traced to
  // the user that made it
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("event", eventSchema);
