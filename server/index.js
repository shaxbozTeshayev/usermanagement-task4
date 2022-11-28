const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log("Mongodb disconnected", err);
  });

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());
// setup the logger
app.use(morgan("common"));

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Port " + port + " is working");
});
