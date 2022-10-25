const mongoose = require("mongoose");

// THis is the structure of the roles given to users
const rolesSchema = new mongoose.Schema({
  roleId: {
    type: String,
    unique: true,
    required: [true, "Role Id required"],
  },

  type: {
    type: String,
    unique: true,
    required: [true, "Role type is required"],
  },

  rights: [
    {
      name: String,
      path: String,
      url: String,
    },
  ],

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.model("roles", rolesSchema);
