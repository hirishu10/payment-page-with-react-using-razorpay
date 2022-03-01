const express = require("express");
require("dotenv").config();
const PaymentModel = require("../../model/PaymentModel");

const router = express.Router();

/**
 * name : String
 * email : String
 * phoneNumber : Number
 * amount : Number
 * razorpay_order_id : String
 * razorpay_payment_id : String
 * razorpay_signature : String
 * -----
 * API Point--
 * /api/create/order/paymentdetail/Save
 */
router.post("/", (req, res) => {
  const newPaymentData = new PaymentModel({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    amount: req.body.amount / 100,
    razorpay_order_id: req.body.razorpay_order_id,
    razorpay_payment_id: req.body.razorpay_payment_id,
    razorpay_signature: req.body.razorpay_signature,
  });
  newPaymentData
    .save()
    .then((item) => {
      res.json({
        status: `success`,
        message: `Your data successfully added in the database`,
        data: item,
      });
    })
    .catch((err) => {
      res.json({
        status: `failed`,
        message: `Sorry can't add data in the database`,
        errMess: err,
      });
    });
});

module.exports = router;
