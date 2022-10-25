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

async function googleOAuthToken(code) {
  // Preset the url
  const url = "https://oauth2.googleapis.com/token";

  // Values required by google
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const params = new URLSearchParams(values);

  // Gives the params to the fetch so it can make the call to google
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `${params}`,
  });

  const data = await res.json();

  return data;
}

async function getGoogleUser({ id_token, access_token }) {
  // Adds the token to the url
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

  // Then I do a fetch again with the access token and id_token
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });

  const data = await res.json();

  return data;
}

async function facebookOAuthToken(code) {
  const url = "https://graph.facebook.com/v15.0/oauth/access_token";

  // Values required by facebook
  const values = {
    client_id: process.env.FACEBOOK_CLIENT_ID,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    code,
  };

  const params = new URLSearchParams(values);

  // Gives the params to the fetch so it can make the call to facebook
  const res = await fetch(`${url}?${params}`);

  const data = await res.json();

  return data;
}

async function facebookVerifyToken(access_token) {
  const url = "https://graph.facebook.com/debug_token";

  // Gives the values to facebook
  const values = {
    input_token: access_token,
    access_token,
  };

  const params = new URLSearchParams(values);

  // Send a fetch to facebook so they can verify the tokens
  const res = await fetch(`${url}?${params}`);

  const { data } = await res.json();

  return data;
}

async function getFacebookUser({ user_id, access_token }) {
  // Set url for fetching user data
  const url = `https://graph.facebook.com/v15.0/${user_id}?access_token=${access_token}`;

  const res = await fetch(url);

  const data = await res.json();

  return data;
}

module.exports = {
  verify,
  googleOAuthToken,
  getGoogleUser,
  facebookOAuthToken,
  facebookVerifyToken,
  getFacebookUser,
};
