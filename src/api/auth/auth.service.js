const bcrypt = require("bcrypt");

const User = require("../user/entities/user.entity");

// Here to data is verified again
async function verify(data) {
  // Finds the email of a user
  const user = await User.findOne({ email: data.email });

  // If the user email is false then verified will alo be false
  if (!user) {
    return { user, verified: false };
  }

  // Here the encrypted password is compare to the password created by the user
  // If it is the right password verified wil be true
  if (await bcrypt.compare(data.password, user.password)) {
    return { user, verified: true };
  }

  return { user, verified: false };
}

module.exports = {
  verify,
};
