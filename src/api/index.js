const express = require("express");

// All the controllers are imported to be used for the endpoints

// Endpoints set for user
const user = require("./user/user.controller");

// Endpoints set for events
const event = require("./eventData/event.controller");

// Endpoints set for auth
const auth = require("./auth/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

// Routes set for user
router.use("/users", user);

// Routes set for events
router.use("/events", event);

// Routes set for auth
router.use("/auth", auth);

module.exports = router;
