require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const uuidv4 = require("uuid/v4");
const mongoose = require("mongoose");
const app = express();
var paypal = require('paypal-rest-sdk');

// paypal config
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AX2YJ4MnXEEz9dg767vDL2mBOhp4mUsv7Bn_ut1Q55dCEN8SmTgotaBGeVjEAntxZUT7f6whOygQq09s',
  'client_secret': 'EDpTN9Ls6ItktmjwhO1ssCduiCcdtdhZ8Nlq-K3yf9oYOjIrMUdmamoBvse-19h2RCACjKKaSzsA4ypD'
});

// Import routes
const materialsRoute = require("./routes/materials");
const hardwaresRoute = require("./routes/hardwares");

app.use("/mats", materialsRoute);
app.use("/haws", hardwaresRoute);

app.post("/pay", (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/utilisateur",
        "cancel_url": "http://localhost:3000/utilisateur"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "CAD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};
 
paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0; i < payment.links.length; i++) {
        if(payment.links[i].rel === "approval_url"){
          res.redirect(payment.links[i].href)
        }
      }
  }
});

});

app.get("/succes", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "CAD",
        "total": "25.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("get payment response");
      console.log(JSON.stringify(payment));
    }
  });
});

app.get("/cancel", (req, res) => res.send("cancelled"));

// mongoose connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {console.log("Connected to mongoDB!")})


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
