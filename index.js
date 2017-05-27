'use es6';

var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var generator = require('./utils/generator.js');
var app = express();
var api_wrapper = require('./utils/http_modifier.js');

app.enable('trust proxy');

api_wrapper(app);


app.use('/RandomComic/', express.static(path.join(__dirname, 'public')));

app.get("/RandomComic/", function(req, res) {
    res.render("landing.ejs");
});

app.get("/RandomComic/rand", function(req, res) {
    var comic = generator.getComic(function(comic) {
        console.log(comic);
        res.send(comic);
        res.end();
    });
});