const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN: ", email);
  if (!email || !password) {
    res.status(403).json({ message: "Email and Password Required" });
  } else {
    User.findById(email)
      .then(user => {
        if (!user) {
          res.status(403).send({ message: "Wrong Email and Password" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign(user._id, process.env.SECRET);
            console.log("verified");
            res.send({ email: user._id, token, favourites: user.favourites });
          } else {
            res.status(403).send({ message: "Wrong Email and Password" });
          }
        }
      })
      .catch(e => {
        console.log(e);
        res.status(500).send({ message: e.message });
      });
  }
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  console.log("SIGNUP: ", email);
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!email || !password) {
    res.status(403).json({ message: "Email and Password Required" });
  } else if (!emailRegex.test(email)) {
    res.send({ message: "Invalid Email" });
  } else {
    const hashed_password = bcrypt.hashSync(password, 10);
    User.create({ _id: email, password: hashed_password, favourites: {} })
      .then(user => {
        console.log(user);
        let token = jwt.sign(user._id, process.env.SECRET);
        res.json({ email: user._id, token, favourites: user.favourites });
      })
      .catch(e => {
        if (e.code === 11000) {
          res.status(403).send({ message: "User already exists!" });
        } else {
          res.status(500).send({ message: e.errmsg });
        }
      });
  }
});

module.exports = router;
