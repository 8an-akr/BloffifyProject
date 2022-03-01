const express = require("express");
const router = express.Router();
const Song = require("../models/song");

router.post("/add", async (req, res) => {
  const songObj = { ...req.body, createdBy: req.user._id };
  let newSong = await new Song(songObj).save();
  res.send(newSong);
});

router.delete("/:_id", async (req, res) => {
  let song = await Song.findOne({ _id: req.params._id });
  if (!song) return res.status(400);
  if (req.user._id === song.createdBy) {
    deletedSong = await Song.deleteOne({ _id: req.params._id });
    return res.send({ msg: "OK", deletedSong });
  }
  return res.status(401);
});

router.get("/:_id", async (req, res) => {
  let song = await Song.find({ _id: req.params._id });
  res.send(song);
});
module.exports = router;

router.get("/", async (req, res) => {
  let songs = await Song.find();
  res.send(songs);
});
module.exports = router;
