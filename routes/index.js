var express = require('express');
var app = express.Router();
var generator = require('../utils/generator.js');

app.get("/", function (req, res) {
    res.render("landing.ejs");
});
//Returns a JSON object containing the title, img url, original comic URL, and name of the comic
app.post("/rand", function (req, res) {
    var options = req.body["checked[]"];
    generator.getComic(options, function (comic) {
        res.send(comic);
        res.end();
    });
});
module.exports = app;
