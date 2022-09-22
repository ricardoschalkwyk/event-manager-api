const bcrypt = require("bcrypt");
const User = require("./entities/user.entity");

async function create(data) {
  const [user] = await User.find({ email: data.email });

  if (user) {
    return null;
  }

  // Here I am using becrypt to encrypt the password that was entered when signing up on the app
  const salt = await bcrypt.genSalt(10);

  // Here becrypt is being add to the password
  data.password = await bcrypt.hash(data.password, salt);

  const newUser = new User(data);

  // Once the password is encrypted the user is saved
  return newUser.save();
}

async function findAll() {
  const userData = User.find();

  return userData;
}

async function findOne(id) {
  try {
    return User.findById(id);
  } catch (error) {
    return error;
  }
}

async function update(id, data) {
  try {
    if (data.password) {
      // Here I am using bcrypt to encrypt the password that was entered when signing up on the app
      const salt = await bcrypt.genSalt(10);

      // Here bcrypt is being add to the password
      data.password = await bcrypt.hash(data.password, salt);
    }

    return User.findByIdAndUpdate(id, data);
  } catch (error) {
    return error;
  }
}

// This finds only one event determined by the id for deleting it from the database
async function remove(id) {
  try {
    return User.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
