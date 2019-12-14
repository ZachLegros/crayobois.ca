const dotenv = require('dotenv')
const express = require("express");
const logger = require("morgan");
const uuidv4 = require("uuid/v4");
const mongoose = require("mongoose");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/mats", (req, res) => {
  //mongoDB shit right here
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("response")
    })
    .catch(err => {
      console.log(err);
    });

  /*res.json([
    {
      id: uuidv4(),
      name: "Amarante",
      path: "https://firebasestorage.googleapis.com/v0/b/crayobois.appspot.com/o/bois%2FAmarante.jpg?alt=media&token=ee3dcdd1-a6d1-4955-bb43-1e5ff403ba88",
      origin: "Amérique du Sud (Brésil)",
      price: "10$"
    },
    {
      id: uuidv4(),
      name: "Black Limba",
      path: "https://firebasestorage.googleapis.com/v0/b/crayobois.appspot.com/o/bois%2FBlack_Limba.jpg?alt=media&token=8fe1dc5c-f52f-41ac-81cf-bb83556cad10",
      origin: "Canada",
      price: "15$"
    },
    {
      id: uuidv4(),
      name: "Black Palm",
      path: "https://firebasestorage.googleapis.com/v0/b/crayobois.appspot.com/o/bois%2FBlack_Palm.jpg?alt=media&token=cbb0254a-bd8d-41cd-b36a-c60a9eb76b94",
      origin: "Floride",
      price: "30$"
    }
  ]);*/
});

module.exports = app;
