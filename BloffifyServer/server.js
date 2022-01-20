//Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/index");
const {
  songsRoute,
  usersRoute,
  playlistsRouter,
} = require("./routes/router.js");
const jwt = require("jsonwebtoken");
//Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//authintication
const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//Connect the Database
connectDB().then(() => {
  console.log("Connected to DB successfully");
});

//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.send("hi");
});

//Use routes
app.use("/songs", authJWT, songsRoute);
app.use("/users", usersRoute);
app.use("/playlists", authJWT, playlistsRouter);
