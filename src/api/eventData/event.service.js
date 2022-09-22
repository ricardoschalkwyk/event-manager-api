const Event = require("./entities/event.entity");

// This finds all the event's inside the database
async function findAll(data) {
  const eventData = Event.find(data);

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
  findAll,
  findOne,
  update,
  create,
  remove,
};
