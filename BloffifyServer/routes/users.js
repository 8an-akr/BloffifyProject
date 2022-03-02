const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: hashedPass,
      });
      const savedUser = await user.save();
      console.log(savedUser);
      const { password, ...info } = savedUser;
      res.json(info);
    } else {
      console.log("Error user already existsr");
      res.status(500).json({ msg: "User already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`login: ${password}`);
  console.log(`login: ${username}`);
  try {
    const user = await User.findOne({ username: username });
    console.log(`login: ${user}`);
    if (user) {
      const dbPassword = user.password;
      const match = await bcrypt.compare(password, dbPassword);
      if (match) {
        const accToken = jwt.sign(JSON.stringify(user), process.env.TOKEN);
        res.json(accToken);
      }
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

module.exports = router;
