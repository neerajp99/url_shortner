const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  initialUrl: {
    type: String
  },
  urlCode: {
    type: String
  },
  shortenUrl: {
    type: String
  },
  createdAt: {
    type: String,
    default: Date.now
  },
  updatedAt: {
    type: String,
    default: Date.now
  }
});

module.exports = Url = mongoose.model("UrlSchema", UrlSchema);
