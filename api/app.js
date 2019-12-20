require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const uuidv4 = require("uuid/v4");
const mongoose = require("mongoose");
const app = express();

//Import routes
const materialsRoute = require("./routes/materials");

app.use("/mats", materialsRoute);


//mongoose connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to mongoDB!"))

//Schemas



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




module.exports = app;
