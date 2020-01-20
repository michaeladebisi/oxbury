"use strict";

const express = require("express");
const app = express();
const routes = require("./routes/router.js");
const jsonParser = require("body-parser").json;
const port = process.env.PORT || 8000;

// fix cors issue here
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(jsonParser());
app.use(routes);

app.listen(port, () => console.log("Server is listenting on port", port));

module.exports = app;
