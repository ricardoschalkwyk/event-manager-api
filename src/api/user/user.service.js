const bcrypt = require("bcrypt");
const User = require("./entities/user.entity");

async function create(data) {
  // Finds a user a based on their email
  const [user] = await User.find({ email: data.email });

  // Checks if that email already exists
  if (user) {
    return null;
  }

  // Here I am using bcrypt to encrypt the password that was entered when signing up on the app
  const salt = await bcrypt.genSalt(10);

  // Here bcrypt is being add to the password
  data.password = await bcrypt.hash(data.password, salt);

  const newUser = new User(data);

  // Once the password is encrypted the user is saved
  return newUser.save();
}

async function googleCreate(data) {
  // This finds and updates a google user on sign-in
  const user = await User.findOneAndUpdate(
    { email: data.email },
    { $set: data },
    { upsert: true }
  );

  return user;
}

async function facebookCreate(data) {
  // This finds and updates a google user on sign-in
  const user = await User.findOneAndUpdate(
    { email: data.email },
    { $set: data },
    { upsert: true, new: true }
  );

  return user;
}

async function findAll() {
  // This finds all users
  const userData = User.find();

  return userData;
}

async function findOne(id) {
  // This will find one user
  try {
    // Finds them based on their id
    const user = await User.findById(id);

    // This returns a cloned user object
    const safe = user.toObject();

    // Then it will remove the password so that it doesn't show in the payload
    delete safe.password;

    // Returns the user without their password being displayed
    return safe;
  } catch (error) {
    return error;
  }
}

async function update(id, data) {
  try {
    // This runs when a user does an update, it will re-encrypt the password
    if (data.password) {
      // Here I am using bcrypt to encrypt the password that was entered when signing up on the app
      const salt = await bcrypt.genSalt(10);

      // Here bcrypt is being add to the password
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Find them based on their id
    const newUser = await User.findByIdAndUpdate(id, data, { new: true });

    // This returns a cloned user object
    const updatedUser = newUser.toObject();

    // Returns the user without their password being displayed
    delete updatedUser.password;

    return updatedUser;
  } catch (error) {
    return error;
  }
}

async function remove(id) {
  // This finds only one user determined by the id for deleting it from the database
  try {
    return User.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
}

module.exports = {
  create,
  googleCreate,
  facebookCreate,
  findAll,
  findOne,
  update,
  remove,
};
