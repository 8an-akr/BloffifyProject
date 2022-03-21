const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist");

router.post("/new", async (req, res) => {
  try {
    const playlist = new Playlist({
      name: req.body.name,
      createdBy: req.user._id,
      songs: [],
      img: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/CNiQsbatLUiCIbJuVN98_woGXyxQ-i0-M2sahuEKp3ydrN4wq5dhQmjZUzj260V8_5Rn6_CytCHR7nDtKcFk0EVrLfpmq3ZUK1HF68MC-TvuuuT7rwCUQ4f2rvRc4snyHV3DVE1bKSN_URirlCj2mCSaB-dCo_r3dmCnO_LRd9RaRuGOtjW_X5u_Wljlskuv3xDiw6cQcCQCNKBH8mboPQ==/NzU6NjU6NDBUODItMTAtMg==",
    });
    const savedPlaylist = await playlist.save();
    console.log("New playlist saved");
    res.json(savedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.put("/:playlist/:song_id", async (req, res) => {
  console.log(req.params);
  try {
    let playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.playlist },
      { $push: { songs: req.params.song_id } }
    );
    console.log(playlist);
    res.send(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/:_id", async (req, res) => {
  let playlist = await Playlist.findOne({ _id: req.params._id });
  console.log("first", playlist);
  if (!playlist) return res.status(400);
  let deletedPlaylist = await Playlist.deleteOne({ _id: req.params._id });
  return res.send(deletedPlaylist);
});

// router.delete("/:_id", async (req, res) => {
//   let playlist = await playlist.findOne({ _id: req.params._id });
//   if (!playlist) return res.status(400);
//   if (req.user._id === playlist.createdBy) {
//     console.log(`new ObjectId("${req.user._id}")`);
//     console.log(playlist.createdBy);
//     deletedSong = await Song.deleteOne({ _id: req.params._id });
//     return res.send({ deletedSong });
//   }
//   return res.status(401);
// });

router.get("/", async (req, res) => {
  const userPlaylists = await Playlist.find({
    createdBy: req.user._id,
  }).populate("songs");
  res.send(userPlaylists);
});
router.delete("/", async (req, res) => {
  const userPlaylists = await Playlist.deleteMany({ name: "My Playlist" });
  console.log(userPlaylists);
  res.send(userPlaylists);
});

// router.get("/:_id", async (req, res) => {
//   console.log(req.params);
//   try {
//     const playlist = await Playlist.findOne({
//       _id: req.params._id,
//     }).populate("songs");
//     console.log(playlist);
//     res.send(playlist);
//   } catch (error) {
//     console.log("error");
//   }
// });

module.exports = router;
