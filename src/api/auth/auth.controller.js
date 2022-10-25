const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../user/user.service");
const authService = require("./auth.service");

const router = express.Router();

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

// POST request
router.get("/google-sign-in", async (req, res, next) => {
  try {
    // Gets the code from the url query
    const { code } = req.query;

    // Then gives it to the auth to be checked
    const { id_token } = await authService.googleOAuthToken(code);

    if (!id_token) {
      res.status(400).send();
    }

    // Gets user details from token
    const user = jwt.decode(id_token);

    // Re-assign's the data to match my schema
    const newUser = await userService.googleCreate({
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
    });

    const payload = {
      email: newUser.email,
      sub: newUser._id,
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_TOKEN, {
      algorithm: "HS256",
    });

    res.json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
});

router.get("/facebook-sign-in", async (req, res, next) => {
  try {
    const { code } = req.query;

    // The token and code is give to the their necessary functions to bbe checked
    const { access_token } = await authService.facebookOAuthToken(code);
    const { user_id } = await authService.facebookVerifyToken(access_token);

    const user = await authService.getFacebookUser({
      user_id,
      access_token,
    });

    if (!access_token) {
      res.status(400).send();
    }

    // Re-assign's the data to match my schema
    const newUser = await userService.facebookCreate({
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      email: `${user.id}@facebook.com`,
    });

    const payload = {
      email: newUser.email,
      sub: newUser._id,
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_TOKEN, {
      algorithm: "HS256",
    });

    res.json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
