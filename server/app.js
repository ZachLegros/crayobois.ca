var express = require("express");
var logger = require("morgan");
const uuidv4 = require("uuid/v4");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/creez-votre-stylo", (req, res) => {
  //mongoDB shit right here
  res.json([
    {
      id: uuidv4(),
      name: "Amarante",
      path: "./bois/Amarante.jpg",
      origin: "Amérique du Sud (Brésil)",
      price: "10$"
    },
    {
      id: uuidv4(),
      name: "Black Limba",
      path: "./bois/Black_Limba.jpg",
      origin: "Canada",
      price: "15$"
    },
    {
      id: uuidv4(),
      name: "Black Palm",
      path: "./bois/Black_Palm.jpg",
      origin: "Floride",
      price: "30$"
    }
  ]);
});

module.exports = app;
