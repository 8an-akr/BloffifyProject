const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  id: { type: Number, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Song", songSchema);
