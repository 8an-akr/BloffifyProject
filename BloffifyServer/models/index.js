const mongoose = require("mongoose");
const { song } = require("./song");
const { user } = require("./user");
const { playlist } = require("./playlist");
const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const models = { song, user, playlist };
module.exports = { connectDB, models };
