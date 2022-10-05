const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
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

async function googleVerify() {
  try {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: process.env.JWT_TOKEN,
      // Specify the CLIENT_ID of the app that accesses the backend
      audience: process.env.CLIENT_ID,
      // Or, if multiple clients access the backend:
    });

    const payload = ticket.getPayload();
    const userid = payload[{ id: "sub" }];
  } catch (error) {
    verify().catch(error);
  }
}

module.exports = {
  verify,
};
