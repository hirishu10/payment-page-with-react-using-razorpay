const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Modal for the Payment Page Database.
 * name : String
 * email : String
 * phoneNumber : Number
 * amount : Number
 * razorpay_order_id : String
 * razorpay_payment_id : String
 * razorpay_signature : String
 * payment_date : Date
 *
 * --
 * Here we create schema means the table row value like sql database
 */
const paymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  razorpay_order_id: {
    type: String,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
    unique: true,
  },
  razorpay_signature: {
    type: String,
    unique: true,
  },
  payment_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PaymentModal = mongoose.model("paymentDetails", paymentSchema);
