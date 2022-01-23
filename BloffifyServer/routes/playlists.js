const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");

router.post("/new", async (req, res) => {
  try {
    const playlist = new Playlist({
      name: req.body.name,
      createdBy: req.user._id,
      songs: [],
      img: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/CNiQsbatLUiCIbJuVN98_woGXyxQ-i0-M2sahuEKp3ydrN4wq5dhQmjZUzj260V8_5Rn6_CytCHR7nDtKcFk0EVrLfpmq3ZUK1HF68MC-TvuuuT7rwCUQ4f2rvRc4snyHV3DVE1bKSN_URirlCj2mCSaB-dCo_r3dmCnO_LRd9RaRuGOtjW_X5u_Wljlskuv3xDiw6cQcCQCNKBH8mboPQ==/NzU6NjU6NDBUODItMTAtMg==",
    });
    const savedPlaylist = await playlist.save();
    res.json(savedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.put("/:playlist/:song_id", async (req, res) => {
  try {
    let playlist = await Playlist.findOneAndUpdate(
      { name: req.params.playlist },
      { $push: { songs: req.params.song_id } }
    );
    res.send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/:_id", async (req, res) => {
  let playlist = await Playlist.findOne({ _id: req.params._id });
  if (!playlist) return res.status(400);
  if (req.user._id === playlist.createdBy) {
    deletedSong = await Song.deleteOne({ _id: req.params._id });
    return res.send({ deletedSong });
  }
  return res.status(401);
});

router.get("/", async (req, res) => {
  userPlalists = await Playlist.find({ createdBy: req.user._id });
  console.log(userPlalists);
  res.send(userPlalists);
});

module.exports = router;
