const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song", required: true }],
  img: { type: String, required: true },
});

module.exports = mongoose.model("Playlist", playlistSchema);
