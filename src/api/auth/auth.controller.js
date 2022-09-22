const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../user/user.service");
const authService = require("./auth.service");

const router = express.Router();

// POST request
router.post("/sign-in", async (req, res) => {
  let message = "Success";
  let token;

  // This will verify where the user that is logging in actually exists
  const { user, verified } = await authService.verify({
    email: req.body.email,
    password: req.body.password,
  });

  const userData = user.toObject();

  if (verified) {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    token = jwt.sign(JSON.stringify(payload), process.env.JWT_TOKEN, {
      algorithm: "HS256",
    });
  }

  // Here a check is done again if data entered is incorrect
  if (!verified) {
    message = "Email or password is incorrect";
    res.status(401).json({ verified, message, token });
  } else {
    delete userData.password;
    res.json({
      verified,
      message,
      token,
      user: userData,
    });
  }
});

// POST request
router.post("/sign-up", async (req, res) => {
  // Here to data is taken from the sign-up page to create a new user
  const data = await userService.create(req.body);

  if (!data) {
    res
      .status(422)
      .json({ message: "Unable to sign-up user, try again later" });
  } else {
    res.json({ message: "User has been created.", email: data.email });
  }
});

module.exports = router;
