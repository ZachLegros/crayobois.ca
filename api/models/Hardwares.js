const mongoose = require("mongoose");

const hardwareSchema = new mongoose.Schema({
    path : String,
    color: String,
    style: String,
    price: Number,
  });
  
  const hardwares = mongoose.model("hardwares", hardwareSchema);
  
  module.exports = hardwares;