const jwt = require("jsonwebtoken");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function auth(req, res, next) {
  // This function is being used to find the auth token that is given to a user when logging in.
  const header = req.headers.authorization || "";

  // This checks if it as a token or not, if it does not it send the message
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // This try-catch handles the verification of the token given to the user
  try {
    const [, token] = header.split(" ");

    const user = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = user;

    next();

    return user;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
  }
}

function errorHandler(err, req, res) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  auth,
  errorHandler,
};
