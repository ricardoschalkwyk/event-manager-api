const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// This file contains the middleware used in this task

const bodyParser = require("body-parser");

const api = require("./api");
const middlewares = require("./middlewares");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
