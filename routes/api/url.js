const express = require("express");
const router = express.Router();
const mognoose = require("mongoose");
const validateURL = require("url-validate");
const shortid = require("short-id");

// bring in url model
const Url = require("../../models/Url");

router.get("/url/:link", (req, res) => {
  res.json({
    message: "Router works!"
  });
});

router.post("/url", (req, res) => {
  console.log("User had requested to shorten url");

  if (validateURL(req.body.initialUrl.trim())) {
    Url.findOne({
      initialUrl: req.body.initialUrl
    }).then(url => {
      if (url) {
        res.status(200).json(url);
      } else {
        const newUrl = new Url({
          initialUrl: req.body.initialUrl
        })
          .save()
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
});

module.exports = router;
