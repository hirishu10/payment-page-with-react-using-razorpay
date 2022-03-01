const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// Connect database MONGO_DB
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log("mongodb connected.....");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes for every API
app.use("/api/create/order", require("./routes/api/createOrder"));
app.use(
  "/api/create/order/paymentdetail/Save",
  require("./routes/api/paymentData")
);
app.use(
  "/api/trackpayment/details/:id",
  require("./routes/api/trackPaymentDetails")
);

//
const PORT = process.env.PORT || 5000;

// Static Page for the Website
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  //
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
});
