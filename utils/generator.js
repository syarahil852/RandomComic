var xkcd = require('xkcd');
var request = require('request');

module.exports.getComic = function() {
    let numComics = 2;
    let selectedComic = getRandomIntInclusive(0, numComics);
    console.log("Selected comic: " + selectedComic);
    switch (selectedComic) {
        case 1:
            return getXKCD();
        case 2:
            return getCyanideAndHappiness();
        default:
            return getXKCD();
    }
};

function getXKCD() {
    // Get a specific xkcd 
    xkcd(532, function(data) {
        return data;
    });
}

function getCyanideAndHappiness() {
    var url = 'http://explosm.net/comics/random';
    request({
        url: url,
        followRedirect: false
    }, function(err, res, body) {
        console.log(res.headers.location);
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}