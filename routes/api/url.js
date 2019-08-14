const express = require("express");
const router = express.Router();
const mognoose = require("mongoose");
const validateURL = require("url-validate");
const shortid = require("short-id");

// bring in url model
const Url = require("../../models/Url");

// @route POST /api/url/url
// @description Create Shortened url
// @access Public
router.post("/url", (req, res) => {
  console.log("User had requested to shorten url");
  const generatedString = shortid.generate();
  const updatedAt = new Date();

  if (validateURL(req.body.baseUrl.trim())) {
    console.log("Base Url validated");
  } else {
    return res.status(400).json("Invalid Base url");
  }

  if (validateURL(req.body.initialUrl.trim())) {
    Url.findOne({
      initialUrl: req.body.initialUrl
    }).then(url => {
      if (url) {
        res.status(200).json(url);
      } else {
        const shortUrl = req.body.baseUrl + "/" + generatedString;
        const newUrl = new Url({
          initialUrl: req.body.initialUrl,
          shortUrl: shortUrl,
          baseUrl: req.body.baseUrl,
          updatedAt: updatedAt,
          newUrl: generatedString
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

// @route GET /api/url/url/:link
// @description Retrieve URL
// @access Public
router.get("/url/:link", (req, res) => {
  Url.findOne({
    newUrl: req.params.link
  }).then(data => {
    if (data) {
      res.json({
        data
      });
      res.redirect(data.initialUrl);
    } else {
      res.status(404).json("Page not found!");
    }
  });
});

module.exports = router;
