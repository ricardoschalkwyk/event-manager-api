const Event = require("./entities/event.entity");
const userService = require("../user/user.service");

// This finds all the event's inside the database that belong to a user
async function findAll(data) {
  const eventData = Event.find(data);

  return eventData;
}

// This finds all the event's inside the database
async function findAllUserEvents(data) {
  const eventData = await Event.find(data).populate("user");

  return eventData;
}

async function findByUserId(userId) {
  const eventData = Event.find({ user: userId });

  return eventData;
}

async function findOne(id) {
  const eventData = Event.findById(id);

  return eventData;
}

// This creates a new event
async function create(data) {
  const newEvent = new Event(data);
  // This saves the event to the database
  return newEvent.save();
}

async function update(id, data) {
  return Event.findByIdAndUpdate(id, data);
}

// This finds only one event determined by the id for deleting it from the database
async function remove(id) {
  try {
    return Event.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}

module.exports = {
  findAllUserEvents,
  findByUserId,
  findAll,
  findOne,
  update,
  create,
  remove,
};
