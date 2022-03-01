const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  songs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "song", required: true }],
  img: { type: String, required: true },
});

module.exports = mongoose.model("playlist", playlistSchema);
