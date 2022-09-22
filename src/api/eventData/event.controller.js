const express = require("express");
const { auth } = require("../../middlewares");
const eventService = require("./event.service");

const router = express.Router();

// GET request
// The auth function is called here for verifying the token on get requests
router.get("/", auth, async (req, res, next) => {
  try {
    // Inside this try I'm trying to find a certain users events
    const { sub } = req.user;

    // By using the userId i can findAll of the users events
    const data = await eventService.findAll({ userId: sub });

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    // Inside this try I'm trying to find a certain users events
    // const { sub } = req.user;

    // By using the userId i can findAll of the users events
    const data = await eventService.findOne(req.params.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const data = await eventService.update(req.params.id, req.body);

  res.json(data);
});

// POST request
router.post("/", auth, async (req, res) => {
  // Again sub is used for the userId
  const { sub } = req.user;

  // Data is created from an input field on the front-end
  // Then userId is added to that created data
  const data = await eventService.create({
    ...req.body,
    userId: sub,
  });

  if (data.length === 0) {
    res.status(404).json({
      message: "Could not create event",
    });
  }

  res.json(data);
});

// DELETE request
router.delete("/:id", async (req, res) => {
  // Removes data determined by the event id
  const data = await eventService.remove(req.params.id);

  if (!data) {
    res.status(404).json({
      message: "Could not find event",
    });
  }

  res.json(data);
});

module.exports = router;
