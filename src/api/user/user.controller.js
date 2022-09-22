const express = require("express");

const { auth } = require("../../middlewares");

const userService = require("./user.service");

const router = express.Router();

// POST request
router.get("/", auth, async (req, res, next) => {
  try {
    // By using the userId I can findAll of the users
    const data = await userService.findAll();

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    // By using the userId i can findAll of the users
    const data = await userService.findOne(req.params.id);

    if (!data) {
      res.status(404).json({
        message: "Could not find user",
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const data = await userService.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// POST request
router.post("/", auth, async (req, res, next) => {
  try {
    // Here to data is taken to create a new user
    const data = await userService.create(req.body);

    if (!data) {
      res.status(422).json({ message: "Unable to add user, try again later" });
    } else {
      res.json({
        message: "User has been created.",
        email: data.email,
        _id: data._id,
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE request
router.delete("/:id", auth, async (req, res, next) => {
  try {
    // Removes user determined by the user_id
    const data = await userService.remove(req.params.id);

    if (!data) {
      res.status(404).json({
        message: "Could not find user",
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
