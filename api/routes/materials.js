 const express = require("express");
 const router = express.Router();
 const materials = require("../models/Materials");

 router.get("/", (req, res) => {
    materials.find({}).then(function (mats) {
      res.send(mats);
        });
    });

 module.exports = router;