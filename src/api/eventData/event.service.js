const Event = require("./entities/event.entity");

async function findAll(data) {
  // This finds all the event's inside the database that belong to a user
  const eventData = Event.find(data);

  return eventData;
}

async function findAllUserEvents(data) {
  // This finds all the event's inside the database
  const eventData = await Event.find(data).populate("user");

  return eventData;
}

async function findByUserId(userId) {
  // finds events that relate to a user
  const eventData = Event.find({ user: userId });

  return eventData;
}

async function findOne(id) {
  // Find a certain event
  const eventData = Event.findById(id).populate(["members", "user"]);

  return eventData;
}

async function create(data) {
  // This creates a new event
  const newEvent = new Event(data);
  // This saves the event to the database
  return newEvent.save();
}

async function update(id, data) {
  // Find by event id and updates it
  return Event.findByIdAndUpdate(id, data);
}

async function join(id, userId) {
  // Find the id of an event
  const event = await Event.findById(id);

  // Then pushes a users id into the array of the list
  event.members.push(userId);

  return event.save();
}

async function leave(id, userId) {
  const event = await Event.findById(id).populate("members");

  // Loops through members
  const filtered = event.members.filter(
    // Checks if _id is not equal to userId
    (member) => member._id.toString() !== userId
  );
  // This allows you to then leave a members list without removing everyone

  event.members = filtered;

  return event.save();
}

async function remove(id) {
  // This finds only one event determined by the id for deleting it from the database
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
  join,
  leave,
  remove,
};
