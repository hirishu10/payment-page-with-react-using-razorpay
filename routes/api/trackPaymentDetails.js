const express = require("express");
require("dotenv").config();
const PaymentModel = require("../../model/PaymentModel");
const router = express.Router();

/**
 * Provide id as a parameter for fetching the details
 * -----
 * API Point--
 * /api/trackpayment/details/:id
 */
router.get("/", (req, res) => {
  PaymentModel.findById(req.header("id"))
    .sort({ payment_date: -1 })
    .then((data) => {
      if (data === null) {
        throw Error;
      } else {
        res.status(200).json({
          status: `success`,
          message: `Your Payment details are below:`,
          paymentDetails: data,
        });
      }
    })
    .catch((err) => {
      res.status(200).json({
        status: `failed`,
        message: `Sorry we can't find the payment details please check the tracking id`,
        errMess: err,
      });
    });
});

module.exports = router;
