const express = require("express");

// All the controllers are imported to be used for the endpoints

const user = require("./user/user.controller");

const event = require("./eventData/event.controller");

const auth = require("./auth/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/users", user);

router.use("/events", event);

router.use("/auth", auth);

module.exports = router;
