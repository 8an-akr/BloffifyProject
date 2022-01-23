const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.post("/add", async (req, res) => {
  let newSong = await new Song({
    name: req.body.name,
    artist: req.body.artist,
    id: req.body.id,
    description: req.body.description,
    img: req.body.img,
    url: req.body.url,
  }).save();
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
