const express = require("express");
express()
  .use(express.static("dist"))
  .all("*", function(req, res) {
    res.redirect("https://ec-nordbund.de/");
  })
  .listen(1000);
