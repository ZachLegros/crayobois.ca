require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const uuidv4 = require("uuid/v4");
const mongoose = require("mongoose");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/mats", (req, res) => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      //response
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
