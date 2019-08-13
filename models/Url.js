const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  initialUrl: {
    type: String
  },
  shortUrl: {
    type: String
  },
  baseUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Url = mongoose.model("UrlSchema", UrlSchema);
