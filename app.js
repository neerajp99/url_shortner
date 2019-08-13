const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// initializes app as express
const app = express();

// body-parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// database configuration
const db = require("./config/keys").mongoURI;

// establish database connection
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(error => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortner"
  });
});
// Initializing the port
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
