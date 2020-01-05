require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

// Import routes
const materialsRoute = require("./routes/materials");
const hardwaresRoute = require("./routes/hardwares");

app.use("/mats", materialsRoute);
app.use("/haws", hardwaresRoute);

// mongoose connection
mongoose
  .connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected to mongoDB!");
    }
  )
  .catch(err => {
    console.log("Connexion to mongoDB failed...", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
