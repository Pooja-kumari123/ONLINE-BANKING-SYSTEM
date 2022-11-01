const mongoose = require("mongoose");

const Account = mongoose.model(
  "Account",
  new mongoose.Schema({
    userId:String,
    accountNumber:String,
    fullname: String,
    contactNumber: String,
    permanentAddress: String,
    correspondAddress:String,
    accountType:String,
    idProof:String,
    idNumber:String,
    amount:String
  })
);

module.exports = Account;
