const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    path : String,
    name: String,
    origin: String,
    price: Number,
    nature: String,
    type: String
  });
  
  const materials = mongoose.model("materials", materialSchema);
  
  module.exports = materials;