const express = require("express");
const router = express.Router();
const hardwares = require("../models/Hardwares");

router.get("/", (req, res) => {
   hardwares.find({}).then(function (haws) {
     res.send(haws);
       });
   });

module.exports = router;