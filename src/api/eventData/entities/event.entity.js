const mongoose = require("mongoose");

// Creating a shema with mongoose

// This is the structure of a event

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  occasion: String,
  time: String,
  date: String,

  // This userId is added to every event so that it can be traced to
  // the user that made it
  userId: String,
});

module.exports = mongoose.model("event", eventSchema);
