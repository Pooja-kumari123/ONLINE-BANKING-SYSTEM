const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    userId:String,
    accountNumber:String,
    credit:Number,
    debit:Number,
    sendToAccountNumber:String,
    sendAt:Date
  })
);

module.exports = Transaction;
