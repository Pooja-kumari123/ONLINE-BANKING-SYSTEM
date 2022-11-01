const db = require("../models");
const User = db.user;
const Account = db.account;
const Transaction = db.transaction;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  User.findOne({
    _id: req.params.userId
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send(
        {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        Accounts: user.Accounts,
        accountNumber: user.accountNumber,
        role: user.role
      }
      );
    });
};

exports.usernameBoard = (req, res) => {
  User.findOne({
    username: req.params.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send(
        {
        id: user._id,
        username: user.username,
        email: user.email,
        accountNumber: user.accountNumber,
        password: user.password,
        role: user.role
      }
      );
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.createAccount = async (req, res) => {
  User.findOne({
    _id: req.params.userId
  })
    .populate("roles", "-__v")
    .exec( async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const isMobileNumber = await Account.findOne({contactNumber: req.body.contactNumber}).exec()

      if(isMobileNumber){
        return res.status(400).send({ message: "Mobile Already Exist!" });
      }

      let accountNumber = req.body.contactNumber;
    
  const account = new Account({
    userId: req.params.userId,
    accountNumber:accountNumber,
    fullname: req.body.fullName,
    contactNumber: req.body.contactNumber,
    permanentAddress: req.body.permanentAddress,
    correspondAddress:req.body.correspondAddress,
    accountType:req.body.accountType,
    idProof:req.body.idProof,
    idNumber:req.body.idNumber,
    amount:req.body.depositamount
  });

  user.accountNumber = accountNumber;
  user.save();
  
  account.save((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ accountNumber,message: "Account was created successfully!" });
  })
    })
};

exports.getAccount = (req, res) => {
  Account.findOne({
    accountNumber: req.params.accountNumber
  })
    .exec((err, account) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!account) {
        return res.status(404).send({ message: "Account Not found." });
      }

      res.status(200).send(account);
    });
};

exports.getAllAccount = (req, res) => {
  Account.find()
    .exec((err, account) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!account) {
        return res.status(404).send({ message: "Account Not found." });
      }
      res.status(200).send(account);
    });
};

exports.transferAmount = (req, res) => {
  Account.findOne({
    userId: req.params.userId
  })
    .exec((err, account) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!account) {
        return res.status(404).send({ message: "Account Not found." });
      }

      account.amount -= Number(req.body.amount);
      account.save();

      if(account){
        Account.findOne({
          accountNumber:req.body.sendToAccountNumber
        })
        .exec((err, account) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!account) {
            return res.status(404).send({ message: "Account Not found." });
          }

          account.amount += Number(req.body.amount);
          account.save();

          const transaction = new Transaction({
            userId: req.params.userId,
            accountNumber:account.accountNumber,
            debit:req.body.amount,
            sendToAccountNumber:req.body.sendToAccountNumber,
            sendAt:new Date()
          });
        
          transaction.save((err, transaction) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          })
        })
      }
    
  const transaction = new Transaction({
    userId: req.params.userId,
    accountNumber:account.accountNumber,
    credit:req.body.amount,
    sendToAccountNumber:req.body.sendToAccountNumber,
    sendAt:new Date()
  });

  transaction.save((err, transaction) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({message: "Transafer Amount was  successfully!" });
  })
    })
};

exports.getTransaction = (req, res) => {
  Transaction.find({
    accountNumber: req.params.accountNumber
  })
    .exec((err, transaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transaction) {
        return res.status(404).send({ message: "Account Not found." });
      }

      res.status(200).send(transaction);
    });
};

exports.getAllTransaction = (req, res) => {
  Transaction.find()
    .exec((err, transaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!transaction) {
        return res.status(404).send({ message: "Transactions Not found." });
      }

      res.status(200).send(transaction);
    });
};
