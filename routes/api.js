const express = require("express");
const router = express.Router();
const User = require("../models/user");
var jwt = require("jsonwebtoken");

const decode = header => {
  if (!header) {
    return false;
  }
  const [type, token] = header.split(" ");
  console.log(type, token);
  if (type !== "Bearer" || !token) {
    return false;
  }
  return jwt.verify(token, "secretKey");
};

router.get("/favourites", (req, res, next) => {
  const id = decode(req.header("Authorization"));
  if (!id) {
    res.status(403).send({ message: "Invalid Token" });
  } else {
    User.findById(id)
      .then(user => {
        console.log(user);
        if (user) {
          res.send({ email: id, favourites: user.favourites });
        } else {
          res.status(403).send("User does not exist");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err.message || "Something went wrong!");
      });
  }
});

router.post("/favourites", (req, res, next) => {
  const id = decode(req.header("Authorization"));
  const { movieId, moviePoster } = req.body;
  if (!id) {
    res.status(403).send({ message: "Invalid Token" });
  } else if (!movieId || !moviePoster) {
    res.status(403).send({ message: "ID and Poster Required" });
  } else {
    User.findById(id)
      .then(user => {
        if (user) {
          const favourites = user.favourites || {};
          favourites[movieId] = moviePoster;
          user.favourites = favourites;
          user.markModified("favourites");
          user.save().then(savedUser => {
            console.log(savedUser);
            res.send({ email: id, favourites: savedUser.favourites });
          });
        } else {
          res.status(403).send("User does not exist");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err.message || "Something went wrong!");
      });
  }
});

router.delete("/favourites", (req, res, next) => {
  const id = decode(req.header("Authorization"));
  const { movieId } = req.body;
  if (!id) {
    res.status(403).send({ message: "Invalid Token" });
  } else if (!movieId) {
    res.status(403).send({ message: "ID Required" });
  } else {
    User.findById(id)
      .then(user => {
        if (user) {
          const favourites = user.favourites || {};
          if (movieId in favourites) {
            delete favourites[movieId];
          }
          user.favourites = favourites;
          user.markModified("favourites");
          user.save().then(savedUser => {
            console.log(savedUser);
            res.send({ email: id, favourites: savedUser.favourites });
          });
        } else {
          res.status(403).send("User does not exist");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err.message || "Something went wrong!");
      });
  }
});

module.exports = router;
