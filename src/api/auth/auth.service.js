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

    return { payload };
  } catch (error) {
    verify().catch(error);
  }
}

async function googleOAuthToken(code) {
  try {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    };

    const params = new URLSearchParams(values);

    console.log(params);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `${params}`,
    });

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  verify,
  googleVerify,
  googleOAuthToken,
};
