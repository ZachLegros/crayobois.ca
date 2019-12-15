require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const uuidv4 = require("uuid/v4");
const mongoose = require("mongoose");
const app = express();

//Schemas

const materialSchema = new mongoose.Schema({
  path : String,
  name: String,
  origin: String,
  price: String,
  type: String
});

const materials = mongoose.model("materials", materialSchema);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/mats", (req, res) => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Connected to mongoDB!"))
    .then(() => {
      materials.find({}).then(function (mats) {
        res.send(mats);
        });
    })
    //.then(mongoose.disconnect())
  });

module.exports = app;
