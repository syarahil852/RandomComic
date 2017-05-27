'use es6';

var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var generator = require('./utils/generator.js');
var app = express();
var api_wrapper = require('./utils/api.js');

api_wrapper(app);

app.enable('trust proxy');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.use('/RandomComic/', express.static(path.join(__dirname, 'public')));

app.get("/RandomComic/", function(req, res) {
    var comic = generator.getComic();
    res.render("landing.ejs", {
        comic: comic
    });
});

